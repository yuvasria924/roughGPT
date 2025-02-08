<script>
	/** @type {import('./$types').PageProps} */
	let { data } = $props();
	let apiKey = $state("");
		
	async function createIndex() {
        const response = await fetch("/create-index", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ apiKey }),
        });

        const result= await response.json();
		if(result.error)
		{
          alert(result.error);
		}
		
    }
</script>

<div class="div1">
	<h1>{data.title}</h1>
	<input
		id="pcKey"
		type="text"
		placeholder="Enter Pinecone API Key"
		maxlength="200"
		bind:value={apiKey}
	/>
	<button class="connect-button" onclick={createIndex}>Connect</button>
</div>

<style>
	/* Parent container */
	.div1 {
		width: 80vw;
		max-width: 600px; /* Prevent excessive stretching on wide screens */
		padding: 5%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
	}

	/* Title */
	:global(body) h1 {
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		margin-bottom: 5%;
		font-size: clamp(2rem, 5vw, 8rem); /* Responsive text size */
		color: #000;
		text-align: center;
		transition: color 0.3s;
	}

	:global(body.dark-mode) h1 {
		color: #fff;
	}

	/* Input field */
	:global(body) input {
		padding: 1rem;
		width: 80%;
		font-size: 1.5rem;
		border: 2px solid black;
		border-radius: 8px;
		text-align: center;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		margin-bottom: 5%;
	}

	/* Button */
	:global(body) .connect-button {
		background-color: black;
		color: #b79f5c;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		padding: 1rem 2rem;
		border-radius: 8px;
		font-size: 1.5rem;
		border: 2px solid white;
		cursor: pointer;
		transition:
			background-color 0.3s,
			color 0.3s;
	}

	:global(body.dark-mode) .connect-button {
		background-color: #b79f5c;
		color: black;
	}

	/* Centering body */
	:global(body) {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		margin: 0;
		background-color: #b79f5c;
		transition: background-color 0.3s;
	}

	:global(body.dark-mode) {
		background-color: black;
	}

	/* Responsive design for smaller screens */
	@media (max-width: 768px) {
		.div1 {
			width: 90vw;
			max-width: none;
			padding: 10%;
		}

		:global(body) h1 {
			font-size: clamp(1.5rem, 8vw, 3rem);
		}

		:global(body) input {
			font-size: 1.2rem;
			padding: 0.8rem;
		}

		:global(body) .connect-button {
			font-size: 1.2rem;
			padding: 0.8rem 1.5rem;
		}
	}
</style>
