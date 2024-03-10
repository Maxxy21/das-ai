import {v} from "convex/values";
import {query} from "./_generated/server";
import {mutation} from "./_generated/server";
import {api} from "./_generated/api";


export const send = mutation({
    args: {body: v.string(), author: v.string()},
    handler: async (ctx, args) => {
        const {body, author} = args;
        // Send a new message.
        await ctx.db.insert("messages", {body, author});

        if (body.startsWith("@das") && author !== "DAS") {
            // Schedule the chat action to run immediately
            await ctx.scheduler.runAfter(0, api.openai.chat, {
                messageBody: body,
            });
        }
    },
});

export const list = query({
    args: {},
    handler: async (ctx) => {
        const messages = await ctx.db.query("messages").order("desc").take(100);
        const messagesWithAuthor = await Promise.all(
            messages.map(async (message) => {
                // For each message in this channel, fetch the `User` who wrote it and
                // insert their name into the `author` field.
                return {
                    ...message,
                };
            }),
        );
        return messagesWithAuthor.reverse();
    },
});


// export const clear = mutation({
//     args: {
//         sessionId: v.string(),
//     },
//     handler: async (ctx, args) => {
//         const messages = await ctx.db
//             .query("messages")
//             .withIndex("bySessionId", (q) => q.eq("sessionId", args.sessionId))
//             .collect();
//         await Promise.all(messages.map((message) => ctx.db.delete(message._id)));
//     },
// });
