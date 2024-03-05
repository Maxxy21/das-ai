import {dasIndex} from "@/lib/db/pinecone";

export async function DELETE(request: Request) {
    const body = await request.json();
    const {id} = body;

    await dasIndex.deleteOne(id);

    return {
        status: 200,
    };
}