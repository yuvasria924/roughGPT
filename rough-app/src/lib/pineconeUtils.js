// Import Pinecone Client
import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from 'dotenv';
dotenv.config(); // Load .env variables

// Initialize Pinecone Client
const pc = new Pinecone({
  apiKey: "pcsk_2BGqCM_7p8nZzGsw3R7M1pcALXSgorKrTg2HrPrQF4Fc5y8Ld2hFLWNLMaCrLhf5V2C1LM"
});

// Type annotation for the insertRecord and fetchRecord functions
/** 
 * @param {string} text - The text to insert.
 * @param {string} id - The unique ID for the record.
 * @returns {Promise<void>} - A promise indicating whether the insertion was successful.
 */

async function embedData(text, id = 'vec1') {
  try {
    // Validate text input
    if (!text || typeof text !== 'string') {
      throw new Error("Invalid text input. Must be a non-empty string.");
    }

    const data = [{ id: id, text: text }];
    
    const embeddings = await pc.inference.embed(
      'multilingual-e5-large',
      data.map(d => d.text),
      { inputType: 'passage', truncate: 'END' }
    );

    if (!embeddings || embeddings.length === 0) {
      throw new Error("Failed to generate embeddings.");
    }

    return { id: id, values: embeddings[0].values }; // Returning both ID and embedding values
  } catch (error) {
    console.error("Error in embedData:", error);
    throw error;
  }
}



export async function insertRecord(text, id) {
  try {
    const indexName = process.env.VITE_PINECONE_INDEX_NAME; // Use process.env instead of import.meta.env
    if (!indexName) throw new Error("VITE_PINECONE_INDEX_NAME is not defined.");
    const index = pc.Index(indexName);

    // Dummy vector (replace with actual dimensions of your index)
    const vectorDimension = 1024; // Example: Change this to match your Pinecone index dimensions
    const { id: embeddingId, values: vector } = await embedData(text, id); // Pass both text and ID
    if (!vector) throw new Error("Failed to generate embedding.");

    await index.upsert([
      {
        id: id,
        values: vector, // Just a placeholder, not used for querying
        metadata: { text }, // Store actual text in metadata
      },
    ]);

    console.log(`Inserted record with ID: ${id}`);
  } catch (error) {
    console.error("Error inserting record:", error);
  }
}
// insertRecord("Hello World","vec1");

/**
 * @param {string} id - The unique ID of the record to fetch.
 * @returns {Promise<Object|null>} - The record object if found, or null if not.
 */
export async function fetchRecord(id) {
  try {
    const indexName = process.env.VITE_PINECONE_INDEX_NAME;
    const index = pc.Index(indexName);
    const response = await index.fetch([id]);

    // Access the records from the response
    const record = response?.records?.[id];  // Accessing the record by ID

    if (record) {
      console.log(`Record with ID ${id}:, record`);
      return record;
    } else {
      console.log(`No record found for ID: ${id}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching record:", error);
    return null; // Return null in case of an error
  }
}



// Function to chunk a long text into smaller parts
function chunkText(text, chunkSize = 10) {
  const words = text.split(" ");
  let chunks = [];
  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(" "));
  }
  return chunks;
}
const index = pc.index("rough-man"); // Connect to your Pinecone index
// Function to get text embeddings
async function getEmbedding(text) {
  
  const response = await index.embedData({ 
    model: "multilingual-e5-large", 
    texts: [text] 
  });
  return response.embeddings[0]; // Extracts the vector embedding
}

// Function to insert a note into Pinecone
async function insertNote(noteId, fullText) {
  const chunks = chunkText(fullText);
  let vectors = [];

  for (let i = 0; i < chunks.length; i++) {
    const embedding = await getEmbedding(chunks[i]);
    vectors.push({
      id: `${noteId}-${i}`,
      values: embedding,
      metadata: { full_text: fullText, chunk_index: i },
    });
  }

  await index.upsert(vectors);
  console.log("Note stored successfully!");
}

// Function to search for notes based on query
async function searchNotes(query) {
  const queryVector = await getEmbedding(query);
  const results = await index.query({
    vector: queryVector,
    topK: 5,
    includeMetadata: true,
  });

  let fullNotes = new Set();
  results.matches.forEach((match) => fullNotes.add(match.metadata.full_text));

  return Array.from(fullNotes);
}

// Example Usage
(async () => {
  const noteId = "note123";
  const fullNote = "This is a long note that needs to be chunked and stored in Pinecone for efficient retrieval.";
  await insertNote(noteId, fullNote);

  const query = "long note";
  const matchedNotes = await searchNotes(query);
  console.log(matchedNotes); // Outputs matching full notes
})();