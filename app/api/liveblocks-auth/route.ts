import {auth, currentUser} from "@clerk/nextjs";
import {Liveblocks} from "@liveblocks/node";
import {ConvexHttpClient} from "convex/browser";

import {api} from "@/convex/_generated/api";
import {StorageDocument} from "@/app/api/chat/route";
import {NextRequest} from "next/server";

export const convex = new ConvexHttpClient(
    process.env.NEXT_PUBLIC_CONVEX_URL!
);

export const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

// export async function getBoardId(request: NextRequest): Promise<string | null> {
//     // ...your existing logic to determine boardId...
//     const { room } = await request.json();
//     const board = await convex.query(api.board.get, { id: room });
//     if (!board) {
//         console.log("Board not found");
//         return null;
//     }
//     return board._id as string;
// }


export async function POST(request: NextRequest) {
    const authorization = await auth();
    const user = await currentUser();

    if (!authorization || !user) {
        return new Response("Unauthorized", {status: 403});
    }

    const {room} = await request.json();
    const board = await convex.query(api.board.get, {id: room});

    if (board?.orgId !== authorization.orgId) {
        return new Response("Unauthorized", {status: 403});
    }

    const userInfo = {
        name: user.firstName || "Team mate",
        picture: user.imageUrl,
    };

    const session = liveblocks.prepareSession(
        user.id,
        {userInfo}
    );

    if (room) {
        session.allow(room, session.FULL_ACCESS);
    }

    const {status, body} = await session.authorize();
    return new Response(body, {status});
};
