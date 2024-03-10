"use node";

import OpenAI from "openai";
import {action, internalAction} from "./_generated/server";
import {api} from "./_generated/api";
import {v} from "convex/values";
import {Doc, Id} from "./_generated/dataModel";
import { internal } from "./_generated/api";

type ChatParams = {
    messages: Doc<"messages">[];
    messageId: Id<"messages">;
};

// Initialize the OpenAI client with the given API key
const apiKey = process.env.OPENAI_API_KEY!;
const openai = new OpenAI({apiKey});

// export const chat = action({
//     args: {
//         messageBody: v.string(),
//     },
//     handler: async (ctx, args) => {
//         const response = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo", // "gpt-4" also works, but is so slow!
//             messages: [
//                 {
//                     // Provide a 'system' message to give GPT context about how to respond
//                     role: "system",
//                     content:
//                         "You are a terse bot in a group chat responding to questions with 1-sentence answers.",
//                 },
//                 {
//                     // Pass on the chat user's message to GPT
//                     role: "user",
//                     content: args.messageBody,
//                 },
//             ],
//         });
//
//         // Pull the message content out of the response
//         const messageContent = response.choices[0].message?.content;
//
//         // Send GPT's response as a new message
//         await ctx.runMutation(api.messages.send, {
//             author: "DAS",
//             body: messageContent || "Sorry, I don't have an answer for that.",
//         });
//     },
// });


export const chat = internalAction({
    handler: async (ctx, { messages, messageId }: ChatParams) => {
        const apiKey = process.env.OPENAI_API_KEY!;
        const openai = new OpenAI({ apiKey });

        try {
            const stream = await openai.chat.completions.create({
                model: "gpt-3.5-turbo", // "gpt-4" also works, but is so slow!
                stream: true,
                messages: [
                    {
                        role: "system",
                        content: "You are a terse bot in a group chat responding to q's.",
                    },
                    ...messages.map(({ body, author }) => ({
                        role:
                            author === "DAS" ? ("assistant" as const) : ("user" as const),
                        content: body,
                    })),
                ],
            });
            let body = "";
            for await (const part of stream) {
                if (part.choices[0].delta?.content) {
                    body += part.choices[0].delta.content;
                    // Alternatively we could wait for complete words / sentences.
                    // Here we send an update on every stream message.
                    await ctx.runMutation(internal.messages.update, {
                        messageId,
                        body,
                    });
                }
            }
        } catch (e) {
            if (e instanceof OpenAI.APIError) {
                console.error(e.status);
                console.error(e.message);
                await ctx.runMutation(internal.messages.update, {
                    messageId,
                    body: "OpenAI call failed: " + e.message,
                });
                console.error(e);
            } else {
                throw e;
            }
        }
    },
});