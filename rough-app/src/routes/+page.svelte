<script>
	import { onMount } from 'svelte';
	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';

	/** @type {import('./$types').PageProps} */
	let { data } = $props();
	let apiKey = $state('');
	let landingPage = $state(true);
	const animations = getContext('animations');
	/**
	 * @type {(HTMLSpanElement | undefined)[]}
	 */
	var ripples = [];

	async function createIndex() {
		const response = await fetch('/create-index', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ apiKey })
		});

		const result = await response.json();
		if (result.error) {
			alert(result.error);
		} else {
			animations.connectAnimation();
			goto('/new');
			landingPage = false;
			for (let index = 0; index < ripples.length; index++) {
				ripples[index]?.remove();
			}
		}
	}

	/**
	 * @param {number} [x]
	 * @param {number} [y]
	 */
	function createRipple(x, y) {
		if (landingPage) {
			const ripple = document.createElement('span');
			ripple.classList.add('ripple');

			ripple.style.width = `${x==0?855:186}px`
			ripple.style.height = `${x==0?855:186}px`;

			ripple.style.left = `${x}%`;
			ripple.style.top = `${y}%`;

			document.body.appendChild(ripple);
			return ripple;
		}
	}

	onMount(() => {
		document.getElementById('pcKey')?.addEventListener('keypress', async (ev) => {
			if (ev.code == 'Enter') await createIndex();
		});

		ripples.push(createRipple(0, 0));
		new Promise((r) => setTimeout(r, 1500)).then(() => {
			ripples.push(createRipple(7.5, 7.5));
		});
	});
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
		transition: color 0.3s;
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
		transition:
			background-color 0.3s,
			color 0.3s;
	}

	/* Centering body */
	:global(body) {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		margin: 0;
	}
	@keyframes ripple-effect {
		to {
			transform: scale(0.33);
		}
	}

	@keyframes rotate-forever {
		from {
			transform: rotate(0deg) scale(0.33);
		}
		to {
			transform: rotate(360deg) scale(0.33);
		}
	}

	:global(.ripple) {
		position: fixed;
		width: 20px;
		height: 20px;
		z-index: -1;
		background: rgba(26, 24, 24, 0);
		border: 1.5vw dashed #887022;
		border-radius: 50%;
		transform: scale(0);
		animation:
			ripple-effect 1.5s linear forwards,
			rotate-forever 5s linear infinite 1.5s;
	}

	:global(body.dark-mode) :global(.ripple) {
		border: 1.5vw dashed #778fdd;
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
