import {dasIndex} from "@/lib/db/pinecone";

export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const {id} = body;

        await dasIndex.deleteOne(id);

        return Response.json({message: "Layer deleted"}, {status: 200});
    } catch (error) {
        console.error(error);
        return Response.json({error: "Internal server error"}, {status: 500});
    }
}