import {v} from "convex/values";
import {internalMutation, query} from "./_generated/server";
import {mutation} from "./_generated/server";
import {api} from "./_generated/api";
import {Doc, Id} from "./_generated/dataModel";
import {internal} from "./_generated/api";


// export const send = mutation({
//     args: {body: v.string(), author: v.string()},
//     handler: async (ctx, args) => {
//         const {body, author} = args;
//         // Send a new message.
//         await ctx.db.insert("messages", {body, author});
//
//         if (body.startsWith("@das") && author !== "DAS") {
//             // Schedule the chat action to run immediately
//             await ctx.scheduler.runAfter(0, api.openai.chat, {
//                 messageBody: body,
//             });
//         }
//     },
// });

export const send = mutation({
    args: {body: v.string(), author: v.string()},
    handler: async (ctx, {body, author}) => {
        // Send our message.
        await ctx.db.insert("messages", {body, author});

        if (body.indexOf("@das") !== -1) {
            // Fetch the latest n messages to send as context.
            // The default order is by creation time.
            const messages = await ctx.db.query("messages").order("desc").take(10);
            // Reverse the list so that it's in chronological order.
            messages.reverse();
            // Insert a message with a placeholder body.
            const messageId = await ctx.db.insert("messages", {
                author: "DAS",
                body: "...",
            });
            // Schedule an action that calls ChatGPT and updates the message.
            ctx.scheduler.runAfter(0, internal.openai.chat, {messages, messageId});
        }
    },
});

export const list = query({
    handler: async (ctx): Promise<Doc<"messages">[]> => {
        // Grab the most recent messages.
        const messages = await ctx.db.query("messages").order("desc").take(100);
        // Reverse the list so that it's in chronological order.
        return messages.reverse();
    },
});

export const update = internalMutation({
    args: {messageId: v.id("messages"), body: v.string()},
    handler: async (ctx, {messageId, body}) => {
        await ctx.db.patch(messageId, {body});
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
