import {Pinecone} from "@pinecone-database/pinecone";

const apiKey = process.env.PINECONE_API_KEY || process.env.NEXT_PUBLIC_PINECONE_API_KEY;

if (!apiKey) {
    throw Error("PINECONE_API_KEY is not set");
}

const pinecone = new Pinecone({
    environment: "gcp-starter",
    apiKey
});

export const dasIndex = pinecone.Index("das-for-miro");
