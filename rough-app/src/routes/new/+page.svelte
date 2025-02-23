<script>
	import { goto } from '$app/navigation';

	function redirectToNotes() {
		goto('/search');
	}

	/**
	 * @param {{ target: any; }} event
	 */
	function resizeTextarea(event) {
		const textarea = event.target;
		textarea.style.height = 'auto'; // Reset height
		textarea.style.height = textarea.scrollHeight + 'px'; // Adjust height based on content
	}
</script>

<main class="container">
	<button class="search-btn" on:click={redirectToNotes}> Search My Notes! </button>
	<textarea cols="30" rows="30" placeholder="Write a Note Here!" on:input={resizeTextarea}></textarea>
	<button class="save-btn">Save Note</button>
</main>

<style>
	:global(body) {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@keyframes gradientAnimation {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	:global(body.dark-mode) .container {
		background: linear-gradient(135deg, #ffffff, #778fdd, #ffffff, #778fdd);
		animation: gradientAnimation 4s ease infinite;
		background-size: 300% 300%;
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2rem;
		margin-top: 2rem;
    margin-bottom: auto;
		width: 70vw;
		max-width: 80vw;
		height: 70vh;
		margin-left: auto;
		margin-right: auto;
		background: linear-gradient(135deg, #d3b251, #887022, #d3b251, #887022);
		background-size: 300% 300%;
		animation: gradientAnimation 4s ease infinite;
		border-radius: 1.4rem;
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
	}

	.search-btn,
	.save-btn {
		margin: 1rem 0;
		padding: 1rem;
		border-radius: 3rem;
		border: none;
		font-size: 20px;
		font-weight: bold;
		cursor: pointer;
		transition: all 0.3s ease-in-out;
		width: 72%;
	}

	.search-btn {
    background: white;
		color: black;
	}

	:global(body.dark-mode) .search-btn {
		background: black;
		color: white;
	}

	.save-btn {
    background: white;
		color: black;
	}

	:global(body.dark-mode) .save-btn {
		background: #000000;
		color: white;
	}

	.search-btn:hover {
		transform: scale(1.05);
	}

	.save-btn:hover {
		transform: scale(1.05);
	}

	textarea {
		width: 100%;
		max-width: 80%;
		min-height: 60%;
		border-radius: 1rem;
    text-align: center;
    align-content: center;
		padding: 1rem;
		font-size: 16px;
		transition: border 0.1s ease-in-out;
		resize: none;
		overflow-y: hidden; /* Hides scrollbar while auto-expanding */
	}

	textarea:focus {
		border: 3px solid #1b1b1b;
		outline: none;
	}

  :global(body.dark-mode) textarea {
    background-color: black;
    color: white;
  }

	@media (max-width: 600px) {
		.container {
			padding: 1.5rem;
		}

		.search-btn,
		.save-btn {
			font-size: 18px;
			padding: 0.8rem;
		}

		textarea {
			font-size: 14px;
		}
	}
</style>
