import {liveblocks} from "@/lib/liveblock";
import {getEmbedding} from "@/lib/openai";
import {Doc} from "@/convex/_generated/dataModel";
import {dasIndex} from "@/lib/db/pinecone";
import {Layer, LayerType} from "@/types/canvas";


export interface StorageDocument {
    layerIds: string[];
    layers: Record<string, Layer>; // Using Layer type from your definitions
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {boardId, messages} = body;


        const embedding = await getEmbedding(
            messages.map((message: Doc<"messages">) => message.body).join("\n"),
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

        return new Response(JSON.stringify({content: relevantNotesContent}), {status: 200});
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({error: "Internal server error"}), {status: 500});
    }
}