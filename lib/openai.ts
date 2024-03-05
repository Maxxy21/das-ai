import OpenAI from "openai";
import 'dotenv/config'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})
export default openai;

export async function getEmbedding(text: string) {
    const response = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: text,
    });

    const embedding = response.data[0].embedding;

    if (!embedding) throw Error("Error generating embedding.");

    console.log(embedding);

    return embedding;
}
