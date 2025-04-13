<script>
	import { onMount } from 'svelte';

	let items = [];

	function fetchNotes(query) {
		fetch('/search-note', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ apiKey: localStorage.getItem('apiKey'), text: query })
		})
			.then((response) => response.json())
			.then((result) => {
				items = result.data;
			});
	}

	onMount(() => {
		let query = sessionStorage.getItem('query');
		if (query) fetchNotes(query);

		const handleQueryChange = () => {
			let updatedQuery = sessionStorage.getItem('query');
			fetchNotes(updatedQuery);
		};

		window.addEventListener('query-changed', handleQueryChange);

		return () => {
			window.removeEventListener('query-changed', handleQueryChange);
		};
	});

	function getFadedBgStyle(index, total) {
	const maxOpacity = 1;
	const minOpacity = 0.2;

	const bgOpacity = maxOpacity - ((maxOpacity - minOpacity) * (index / (total - 1 || 1)));

	// White background with variable alpha
	return `background-color: rgba(255, 255, 255, ${bgOpacity});`;
}
</script>

<div class="plates">
	{#each items as item, index (index)} 
		<div class="note" style={getFadedBgStyle(index, items.length)}>{item}</div>
	{/each}
</div>

<style>
@property --angle {
		syntax: '<angle>';
		initial-value: 0deg;
		inherits: false;
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
	@keyframes rotateGradient {
		from {
			--angle: 0deg;
		}
		to {
			--angle: 360deg;
		}
	}
	.plates {
		width: 90vw;
		height: 55vh;
		overflow: auto;
		display: flex;
        align-items: center;
		justify-content: flex-start;
		border-radius: 1rem;
		background: transparent;
	}
	:global(body.dark-mode) .note {
		background-color: #778fdd;
		color: #000000;
		transition: background-color 0.3s, color 0.3s;
			border: 2px solid #778fdd;
	}
	.note {
		background-color: white;
		margin: 1rem;
		padding: 1rem;
		border-radius: 1rem;
		overflow: auto;
      
		min-width: 10rem;
		width: 10rem;
		height: 10rem;

		border: 2px solid rgb(0, 0, 0);
		transition: opacity 0.3s ease, transform 0.3s ease;
	}
	.note::-webkit-scrollbar{
		display: none;
	}
.note:hover {
	transform: scale(1.05);
	cursor: pointer;
}
</style>
