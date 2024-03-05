import {getEmbedding} from "@/lib/openai";
import {dasIndex} from "@/lib/db/pinecone";


export async function POST(request: Request) {
    try {
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

        return new Response(body, {status: 200});
    } catch (error) {
        console.error(error);
        return Response.json({error: "Internal server error"}, {status: 500});
    }
}