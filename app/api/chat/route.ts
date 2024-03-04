import openai, {getEmbedding} from "@/lib/openai";
import {dasIndex} from "@/lib/db/pinecone";
import {OpenAIStream, StreamingTextResponse} from "ai";
import {ChatCompletionMessage} from "openai/resources/index.mjs";
import {liveblocks} from "@/app/api/liveblocks-auth/route";
import {Layer, LayerType} from "@/types/canvas"; // Removed unused Layers import
import {NextRequest} from "next/server";

export interface StorageDocument {
    layerIds: string[];
    layers: Record<string, Layer>; // Using Layer type from your definitions
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        // Extract messages and boardId from the request body
        const {messages, boardId} = body;

        if (!boardId) {
            return new Response(JSON.stringify({error: "Board ID not found"}), {status: 404});
        }

        const messagesTruncated: ChatCompletionMessage[] = messages.slice(-6);
        const embedding = await getEmbedding(
            messagesTruncated.map((message) => message.content).join("\n"),
        );

        const storage = await liveblocks.getStorageDocument(boardId, "json") as unknown as StorageDocument;
        console.log(storage)

        const vectorQueryResponse = await dasIndex.query({
            vector: embedding,
            topK: 4,
            filter: {boardId},
        });

        const vectorQueryIDs: string[] = vectorQueryResponse.matches.map(match => match.id);

        const relevantLayers = Object.keys(storage.layers)
            .filter(key => vectorQueryIDs.includes(key))
            .map(key => {
                const layer = storage.layers[key];
                return {
                    id: key,
                    ...layer,
                };
            })
            .filter(layer => layer.type === LayerType.Text || layer.type === LayerType.Note);

        // Construct ChatCompletionMessage content
        const relevantNotesContent = relevantLayers
            .map(layer => `Type: ${LayerType[layer.type]}\nValue: ${layer.value}\nPosition: (${layer.x}, ${layer.y})`)
            .join("\n\n");


        const systemMessage: ChatCompletionMessage = {
            role: "system",
            content: "You are an intelligent start-up collaboration app. Here are the relevant notes based on your query:\n" + relevantNotesContent,
        };



        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            stream: true,
            messages: [systemMessage, ...messagesTruncated],
        });

        // Assuming OpenAIStream and StreamingTextResponse are correctly implemented
        const stream = OpenAIStream(response);
        return new StreamingTextResponse(stream);
    } catch
        (error) {
        console.error(error);
        return new Response(JSON.stringify({error: "Internal server error"}), {status: 500});
    }
}
