// import { onMount } from 'svelte';
import { Pinecone } from '@pinecone-database/pinecone'
// Function to create the Pinecone index
const pc = new Pinecone({
  apiKey: 'pcsk_2BGqCM_7p8nZzGsw3R7M1pcALXSgorKrTg2HrPrQF4Fc5y8Ld2hFLWNLMaCrLhf5V2C1LM',
});
async function createIndex() {
  try {
    const indexName = "rough-app"; // Get index name from env
    const existingIndexes = await pc.listIndexes();
    const indexList = existingIndexes?.indexes ?? [];
    const indexExists = indexList.some(index => index.name === indexName);

    
    if (indexExists) {
      console.log(`Index "${indexName}" already exists.`);
    } else {
      console.log(`Creating index "${indexName}"...`);

      // Create the index with the required configuration
      await pc.createIndex(
        {
          name: indexName,
          dimension: 1024,  // Dimension size for text-embedding-multilingual-e5-large (A Microsft Model)
          metric: 'cosine', // Similarity metric, can be cosine, euclidean, or dot_product
          spec: {
            serverless: {
              cloud: 'aws',  // Cloud provider (AWS in this case)
              region: 'us-east-1'  // Region (optional)
            }
          }
        });

      console.log(`Index "${indexName}" created successfully!`);
    }
  } catch (error) {
    console.error('Error creating index:', error);
  }
}
createIndex();
// Call createIndex when the component is mounted
// onMount(() => {
//   createIndex();
// });