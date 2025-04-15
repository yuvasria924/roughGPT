<script>
	import { onMount } from 'svelte';

	let items = [];
	let selectedNote = null;
	let editorVisible = false;

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
		return `background-color: rgba(255, 255, 255, ${bgOpacity});`;
	}

	function openEditor(note) {
		selectedNote = note;
		editorVisible = true;
		document.body.style.overflow = 'hidden'; // prevent scroll
	}

	function closeEditor() {
		editorVisible = false;
		selectedNote = null;
		document.body.style.overflow = 'auto'; // restore scroll
	}
</script>

<!-- Notes Display -->
<div class="plates">
	{#each items as item, index (index)}
		<div 
			class="note"
			style={getFadedBgStyle(index, items.length)}
			on:click={() => openEditor(item)}
			role="button"
			tabindex="0"
			on:keydown={(e) => e.key === 'Enter' && openEditor(item)}
		>
			{item}
		</div>
	{/each}
</div>

<!-- Editor Modal -->
{#if editorVisible}
	<div class="modal-wrapper">
		<div 
			class="modal-backdrop" 
			on:click|self={closeEditor} 
			role="button" 
			tabindex="0"
			on:keydown={(e) => e.key === 'Enter' && closeEditor()}
			aria-label="Close editor"
		></div>
		<div class="note-editor">
			<button class="close-btn" on:click={closeEditor}>✖</button>
			<textarea bind:value={selectedNote} class="editor-text"></textarea>
		</div>
	</div>
{/if}



<style>
@property --angle {
	syntax: '<angle>';
	initial-value: 0deg;
	inherits: false;
}

@keyframes gradientAnimation {
	0% { background-position: 0% 50%; }
	50% { background-position: 100% 50%; }
	100% { background-position: 0% 50%; }
}
@keyframes rotateGradient {
	from { --angle: 0deg; }
	to { --angle: 360deg; }
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

.note {
	background-color: white;
	margin: 1rem;
	padding: 1rem;
	border-radius: 1rem;
	min-width: 10rem;
	width: 10rem;
	height: 10rem;
	border: 2px solid rgb(0, 0, 0);
	overflow: auto;
	transition: opacity 0.3s ease, transform 0.3s ease;
}
.note:hover {
	transform: scale(1.05);
	cursor: pointer;
}
.note::-webkit-scrollbar {
	display: none;
}
:global(body.dark-mode) .note {
	background-color: #778fdd;
	color: #000000;
	border: 2px solid #778fdd;
	transition: background-color 0.3s, color 0.3s;
}

/* Modal Container */
.modal-wrapper {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 999;
}

/* Backdrop */
.modal-backdrop {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.6);
}

/* Modal Content */
.note-editor {
	display: flex;
	justify-content: center;
	position: relative;
	background: white;
	margin: 1rem;
	padding: 1.5rem;
	border-radius: 1rem;
	width: 90vw;
	max-width: 800px;
	max-height: 90vh;
	overflow-y: auto;
	overflow-x: hidden; /* Add this to enforce no horizontal scroll */
	box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
	z-index: 1000;
}

.editor-text {
	height: 700px;
	width: 96%;
	max-width: 96%;
	max-height: 60vh;
	min-height: 60vh;
	min-width: 96%;
	padding: 1rem;
	font-size: 0.9rem;
	line-height: 1.5;
	border-radius: 0.5rem;
	
	overflow-y: auto;
	overflow-x: hidden;

	/* Force text to wrap properly */
	white-space: pre-wrap;
	word-wrap: break-word;
	overflow-wrap: break-word;

	border: none;
  outline: none;
  resize: none;

}
.editor-text::-webkit-scrollbar {
	display: none; /* Chrome, Safari */
}


.close-btn {
	position: absolute;
	top: 9px;
	right: 9px;
	background: none;
	border: none;
	font-size: 1rem;
	cursor: pointer;
	color: #333;
}
</style>
