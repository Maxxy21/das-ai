"use node";

import OpenAI from "openai";
import {internalAction} from "./_generated/server";
import {Doc, Id} from "./_generated/dataModel";
import {internal} from "./_generated/api";
import openai from "../lib/openai";


type ChatParams = {
    messages: Doc<"messages">[];
    messageId: Id<"messages">;
    content: string;
};


export const chat = internalAction({
    handler: async (ctx, {messages, messageId, content}: ChatParams) => {
        try {
            const stream = await openai.chat.completions.create({
                model: "gpt-3.5-turbo", // "gpt-4" also works, but is so slow!
                stream: true,
                messages: [
                    {
                        role: "system",
                        content: "You are an intelligent start-up collaboration app. Here are the relevant notes based on your query:\n" + content,
                    },
                    ...messages.map(({body, author}) => ({
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
                    // Alternatively you could wait for complete words / sentences.
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