import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: "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", dangerouslyAllowBrowser: true
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

