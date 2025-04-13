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
</script>

<div class="plates">
	{#each items as item} 
		<div class="note">{item}</div>
	{/each}
</div>

<style>
	.plates {
		width: 200px;
		height: 200px;
		background-color: red;
		overflow: auto;
	}

	.note {
		background-color: white;
		color: black;
		margin: 5px;
		padding: 10px;
		border-radius: 5px;
	}
</style>
