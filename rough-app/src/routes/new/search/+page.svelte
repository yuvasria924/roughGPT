<script>
	import { onMount } from 'svelte';
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';

	let loading = $state(false);
	let items = $state([]);
	let selectedNote = $state(null);
	let editorVisible = $state(false);
	let deleting = $state(false);

	function fetchNotes(query) {
		if (!query?.trim()) return;
		
		loading = true;
		
		fetch('/search-note', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ apiKey: localStorage.getItem('apiKey'), text: query })
		})
			.then((response) => response.json())
			.then((result) => {
				items = result.data || [];
			})
			.catch((error) => {
				console.error('Search failed:', error);
				items = [];
			})
			.finally(() => {
				loading = false;
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

	function openEditor(note) {
		selectedNote = note;
		editorVisible = true;
		document.body.style.overflow = 'hidden';
	}

	function closeEditor() {
		editorVisible = false;
		selectedNote = null;
		document.body.style.overflow = 'auto';
	}

	async function deleteNote() {
		if (!selectedNote) return;
		
		deleting = true;
		
		try {
			const response = await fetch('/delete-note', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					apiKey: localStorage.getItem('apiKey'),
					fullText: selectedNote
				})
			});

			const result = await response.json();

			if (result.success) {
				items = items.filter(item => item !== selectedNote);
				closeEditor();
			} else {
				alert('Failed to delete note: ' + (result.error || 'Unknown error'));
			}
		} catch (error) {
			console.error('Error deleting note:', error);
			alert('Failed to delete note. Please try again.');
		} finally {
			deleting = false;
		}
	}

	function handleKeydown(event, note) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			openEditor(note);
		}
	}

	function handleModalKeydown(event) {
		if (event.key === 'Escape') {
			closeEditor();
		}
	}

	function truncateText(text, maxLength = 150) {
		if (text.length <= maxLength) return text;
		return text.slice(0, maxLength) + '...';
	}
</script>

<svelte:window onkeydown={editorVisible ? handleModalKeydown : undefined} />

<main class="search-container">
	<div class="search-header">
		<h1 class="page-title">Search Results</h1>
		<p class="page-subtitle">
			{#if loading}
				Searching...
			{:else if items.length === 0}
				No notes found
			{:else}
				Found {items.length} note{items.length === 1 ? '' : 's'}
			{/if}
		</p>
	</div>

	{#if loading}
		<div class="loading-container">
			<div class="loading-spinner"></div>
			<p class="loading-text">Searching your notes...</p>
		</div>
	{:else if items.length === 0}
		<Card size="lg" customClass="empty-state">
			<div class="empty-state-content">
				<div class="empty-state-icon">🔍</div>
				<h3 class="empty-state-title">No notes found</h3>
				<p class="empty-state-description">
					Try adjusting your search terms or create a new note to get started.
				</p>
			</div>
		</Card>
	{:else}
		<div class="notes-grid">
			{#each items as item, index (item)}
				<Card
					size="md"
					hoverable
					clickable
					customClass="note-card fade-in"
					onclick={() => openEditor(item)}
					style="animation-delay: {index * 0.1}s"
					role="button"
					tabindex="0"
					onkeydown={(e) => handleKeydown(e, item)}
					aria-label="Open note: {truncateText(item, 50)}"
				>
					<div class="note-content">
						<p class="note-text">{truncateText(item)}</p>
					</div>
					<div class="note-footer">
						<span class="note-length">{item.length} characters</span>
					</div>
				</Card>
			{/each}
		</div>
	{/if}
</main>

<!-- Note Editor Modal -->
{#if editorVisible}
	<div class="modal-overlay" transition:fade={{ duration: 200 }}>
		<div class="modal-backdrop" onclick={closeEditor}></div>
		<Card size="lg" variant="elevated" customClass="note-editor-modal scale-in">
			<div class="modal-header">
				<h2 class="modal-title">Edit Note</h2>
				<div class="modal-actions">
					<Button 
						variant="danger" 
						size="sm" 
						loading={deleting}
						onclick={deleteNote}
						disabled={deleting}
					>
						{deleting ? 'Deleting...' : 'Delete'}
					</Button>
					<Button variant="ghost" size="sm" onclick={closeEditor}>
						Close
					</Button>
				</div>
			</div>

			<div class="editor-wrapper">
				<textarea
					bind:value={selectedNote}
					class="note-editor-textarea"
					placeholder="Edit your note..."
					rows="15"
				></textarea>
			</div>

			<div class="modal-footer">
				<p class="editor-hint">
					<kbd>Esc</kbd> to close • Changes are not saved automatically
				</p>
			</div>
		</Card>
	</div>
{/if}

<style>
	.search-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: var(--space-8) var(--space-4);
		min-height: 100vh;
	}

	.search-header {
		text-align: center;
		margin-bottom: var(--space-8);
		animation: slideUp var(--transition-slow) ease-out;
	}

	.page-title {
		font-size: var(--font-size-4xl);
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.page-subtitle {
		font-size: var(--font-size-lg);
		color: var(--text-secondary);
		line-height: var(--line-height-relaxed);
	}

	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--space-16);
		animation: fadeIn var(--transition-base) ease-out;
	}

	.loading-spinner {
		width: 3rem;
		height: 3rem;
		border: 3px solid var(--border-primary);
		border-top: 3px solid var(--color-primary);
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin-bottom: var(--space-4);
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.loading-text {
		color: var(--text-secondary);
		font-size: var(--font-size-lg);
	}

	.empty-state {
		width: 100%;
		max-width: 500px;
		margin: 0 auto;
		animation: scaleIn var(--transition-slow) ease-out;
	}

	.empty-state-content {
		text-align: center;
		padding: var(--space-8);
	}

	.empty-state-icon {
		font-size: 4rem;
		margin-bottom: var(--space-4);
		opacity: 0.7;
	}

	.empty-state-title {
		font-size: var(--font-size-2xl);
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-3);
	}

	.empty-state-description {
		font-size: var(--font-size-base);
		color: var(--text-secondary);
		line-height: var(--line-height-relaxed);
	}

	.notes-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: var(--space-6);
		animation: fadeIn var(--transition-slow) ease-out 0.2s both;
	}

	.note-card {
		min-height: 200px;
		display: flex;
		flex-direction: column;
		cursor: pointer;
		transition: all var(--transition-base);
	}

	.note-card:focus {
		outline: 2px solid var(--border-focus);
		outline-offset: 2px;
	}

	.note-content {
		flex: 1;
		margin-bottom: var(--space-4);
	}

	.note-text {
		color: var(--text-primary);
		line-height: var(--line-height-relaxed);
		font-size: var(--font-size-base);
		margin: 0;
		word-break: break-word;
	}

	.note-footer {
		border-top: 1px solid var(--border-primary);
		padding-top: var(--space-3);
		margin-top: auto;
	}

	.note-length {
		font-size: var(--font-size-xs);
		color: var(--text-tertiary);
		font-weight: 500;
	}

	/* Modal Styles */
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 50;
		padding: var(--space-4);
	}

	.modal-backdrop {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: var(--bg-overlay);
		backdrop-filter: blur(4px);
	}

	.note-editor-modal {
		position: relative;
		width: 100%;
		max-width: 800px;
		max-height: 90vh;
		overflow-y: auto;
		z-index: 51;
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-6);
		flex-wrap: wrap;
		gap: var(--space-4);
	}

	.modal-title {
		font-size: var(--font-size-2xl);
		font-weight: 600;
		color: var(--text-primary);
		margin: 0;
	}

	.modal-actions {
		display: flex;
		gap: var(--space-2);
	}

	.editor-wrapper {
		margin-bottom: var(--space-6);
	}

	.note-editor-textarea {
		width: 100%;
		min-height: 400px;
		padding: var(--space-4);
		border: 1px solid var(--border-primary);
		border-radius: var(--radius-lg);
		background-color: var(--bg-primary);
		color: var(--text-primary);
		font-size: var(--font-size-base);
		line-height: var(--line-height-relaxed);
		font-family: var(--font-family-sans);
		resize: vertical;
		transition: all var(--transition-base);
		outline: none;
	}

	.note-editor-textarea:focus {
		border-color: var(--border-focus);
		box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
	}

	.note-editor-textarea::placeholder {
		color: var(--text-tertiary);
	}

	.modal-footer {
		border-top: 1px solid var(--border-primary);
		padding-top: var(--space-4);
	}

	.editor-hint {
		font-size: var(--font-size-sm);
		color: var(--text-tertiary);
		margin: 0;
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	kbd {
		padding: var(--space-1) var(--space-2);
		background-color: var(--bg-secondary);
		border: 1px solid var(--border-primary);
		border-radius: var(--radius-sm);
		font-size: var(--font-size-xs);
		font-family: var(--font-family-mono);
		color: var(--text-secondary);
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.search-container {
			padding: var(--space-4) var(--space-2);
		}

		.notes-grid {
			grid-template-columns: 1fr;
			gap: var(--space-4);
		}

		.modal-header {
			flex-direction: column;
			align-items: flex-start;
		}

		.modal-actions {
			width: 100%;
			justify-content: flex-end;
		}

		.note-editor-textarea {
			min-height: 300px;
		}
	}

	@media (max-width: 480px) {
		.modal-actions {
			justify-content: stretch;
		}

		.modal-actions > :global(*) {
			flex: 1;
		}
	}
</style>
