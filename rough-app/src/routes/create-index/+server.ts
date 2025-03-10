import { Pinecone } from "@pinecone-database/pinecone";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
    try {
        const { apiKey, cloud, region } = await request.json();

        if (!apiKey || !cloud || !region) {
            return json({ error: "Missing required parameters" }, { status: 400 });
        }

        const pc = new Pinecone({ apiKey });
        const existingIndexes = await pc.listIndexes();
        const indexList = existingIndexes?.indexes ?? [];
        const indexExists = indexList.some(index => index.name === "rough-man");

        if (indexExists) {
            return json({ message: `Index "rough-man" already exists.` });
        }

        console.log(`Creating index "rough-man"...`);

        await pc.createIndex({
            name: "rough-man",
            dimension: 1024, // Ensure it's a number
            metric: "cosine", // Similarity metric: cosine, euclidean, dot_product
            spec: {
                serverless: {
                    cloud: cloud,
                    region: region
                }
            }
        });

        return json({ message: `Index "rough-man" created successfully!` });
    } catch (error) {
        console.error("Error creating index:", error);
        if (error instanceof Error)
            return json({ error: error.message }, { status: 500 });
        else
            return json({ error: "Unknown Error!" });
    }
}
