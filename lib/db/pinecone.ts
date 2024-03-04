import {Pinecone} from "@pinecone-database/pinecone";

const apiKey = "e779592d-64e3-40ba-a4a5-1133d26a0132";

if (!apiKey) {
    throw Error("PINECONE_API_KEY is not set");
}

const pinecone = new Pinecone({
    environment: "gcp-starter",
    apiKey:"e779592d-64e3-40ba-a4a5-1133d26a0132"
});

export const dasIndex = pinecone.Index("das-for-miro");
