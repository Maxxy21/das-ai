import {getEmbedding} from "@/lib/openai";
import {dasIndex} from "@/lib/db/pinecone";


export async function POST(request: Request) {
    const body = await request.json();
    const {boardId, id, value} = body;

    const embedding = await getEmbedding(value);

    await dasIndex.upsert([
        {
            id: id,
            values: embedding,
            metadata: {boardId},
        },
    ]);

    return {
        status: 200,
    };
}