<script>
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import { onMount } from 'svelte';

	let noteText = $state('');
	let isSaving = $state(false);
	let saveStatus = $state('');
	let saveStatusType = $state(''); // 'success' | 'error' | ''
	let wordCount = $derived(noteText.trim().split(/\s+/).filter(word => word.length > 0).length);
	let charCount = $derived(noteText.length);

	/**
	 * @type {HTMLTextAreaElement}
	 */
	let textareaRef;

	function autoResize() {
		if (textareaRef) {
			textareaRef.style.height = 'auto';
			textareaRef.style.height = textareaRef.scrollHeight + 'px';
		}
	}

	async function handleSave() {
		if (!noteText.trim()) {
			saveStatus = 'Please write something before saving';
			saveStatusType = 'error';
			return;
		}

		isSaving = true;
		saveStatus = 'Saving...';
		saveStatusType = '';

		try {
			const response = await fetch('/insert-note', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ 
					apiKey: localStorage.getItem('apiKey'), 
					fullText: noteText 
				})
			});

			const result = await response.json();
			
			if (result.error) {
				saveStatus = result.error;
				saveStatusType = 'error';
			} else {
				saveStatus = 'Note saved successfully!';
				saveStatusType = 'success';
				noteText = '';
				autoResize();
			}
		} catch (error) {
			saveStatus = 'Failed to save note. Please try again.';
			saveStatusType = 'error';
		} finally {
			isSaving = false;
			// Clear status after 3 seconds
			setTimeout(() => {
				saveStatus = '';
				saveStatusType = '';
			}, 3000);
		}
	}

	function handleKeyDown(event) {
		// Save with Ctrl/Cmd + S
		if ((event.ctrlKey || event.metaKey) && event.key === 's') {
			event.preventDefault();
			handleSave();
		}
	}

	onMount(() => {
		// Focus the textarea on load
		if (textareaRef) {
			textareaRef.focus();
		}
	});
</script>

<main class="note-editor-container">
	<div class="header">
		<h1 class="page-title">Create Note</h1>
		<p class="page-subtitle">Write your thoughts and save them to your vector database</p>
	</div>

	<Card size="lg" variant="elevated" customClass="editor-card">
		<div class="editor-header">
			<div class="editor-meta">
				<span class="word-count">{wordCount} words</span>
				<span class="char-count">{charCount} characters</span>
			</div>
			
			{#if saveStatus}
				<div class="save-status save-status-{saveStatusType}">
					{saveStatus}
				</div>
			{/if}
		</div>

		<div class="editor-wrapper">
			<textarea
				bind:this={textareaRef}
				bind:value={noteText}
				class="note-textarea"
				placeholder="Start writing your note..."
				oninput={autoResize}
				onkeydown={handleKeyDown}
				disabled={isSaving}
				rows="10"
			></textarea>
		</div>

		<div class="editor-actions">
			<div class="keyboard-shortcut">
				<kbd>Ctrl</kbd> + <kbd>S</kbd> to save
			</div>
			
			<Button
				variant="primary"
				size="lg"
				loading={isSaving}
				onclick={handleSave}
				disabled={!noteText.trim()}
			>
				{#if isSaving}
					Saving...
				{:else}
					Save Note
				{/if}
			</Button>
		</div>
	</Card>

	<div class="tips-section">
		<Card size="sm" customClass="tip-card">
			<h3 class="tip-title">💡 Tips</h3>
			<ul class="tip-list">
				<li>Your notes are automatically indexed for semantic search</li>
				<li>Use descriptive content for better search results</li>
				<li>Save frequently with <kbd>Ctrl+S</kbd></li>
			</ul>
		</Card>
	</div>
</main>

<style>
	.note-editor-container {
		max-width: 900px;
		margin: 0 auto;
		padding: var(--space-8) var(--space-4);
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
	}

	.header {
		text-align: center;
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

	.editor-card {
		width: 100%;
		animation: scaleIn var(--transition-slow) ease-out 0.2s both;
	}

	.editor-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-4);
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.editor-meta {
		display: flex;
		gap: var(--space-4);
		font-size: var(--font-size-sm);
		color: var(--text-tertiary);
	}

	.word-count, .char-count {
		font-weight: 500;
	}

	.save-status {
		padding: var(--space-2) var(--space-3);
		border-radius: var(--radius-md);
		font-size: var(--font-size-sm);
		font-weight: 500;
		animation: slideUp var(--transition-base) ease-out;
	}

	.save-status-success {
		background-color: #d1fae5;
		color: #065f46;
		border: 1px solid #a7f3d0;
	}

	.save-status-error {
		background-color: #fee2e2;
		color: #991b1b;
		border: 1px solid #fecaca;
	}

	[data-theme="dark"] .save-status-success {
		background-color: rgba(16, 185, 129, 0.2);
		color: #6ee7b7;
		border-color: rgba(16, 185, 129, 0.3);
	}

	[data-theme="dark"] .save-status-error {
		background-color: rgba(239, 68, 68, 0.2);
		color: #fca5a5;
		border-color: rgba(239, 68, 68, 0.3);
	}

	.editor-wrapper {
		position: relative;
		margin-bottom: var(--space-6);
	}

	.note-textarea {
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

	.note-textarea:focus {
		border-color: var(--border-focus);
		box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
	}

	.note-textarea::placeholder {
		color: var(--text-tertiary);
	}

	.note-textarea:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		background-color: var(--bg-secondary);
	}

	.editor-actions {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--space-4);
	}

	.keyboard-shortcut {
		font-size: var(--font-size-sm);
		color: var(--text-tertiary);
		display: flex;
		align-items: center;
		gap: var(--space-1);
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

	.tips-section {
		animation: fadeIn var(--transition-slow) ease-out 0.4s both;
	}

	.tip-card {
		max-width: 400px;
		margin: 0 auto;
	}

	.tip-title {
		font-size: var(--font-size-lg);
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-3);
	}

	.tip-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.tip-list li {
		font-size: var(--font-size-sm);
		color: var(--text-secondary);
		line-height: var(--line-height-relaxed);
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.tip-list li::before {
		content: '✓';
		color: var(--color-success);
		font-weight: bold;
		flex-shrink: 0;
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.note-editor-container {
			padding: var(--space-4) var(--space-2);
		}

		.editor-header {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--space-2);
		}

		.editor-actions {
			flex-direction: column;
			align-items: stretch;
		}

		.keyboard-shortcut {
			justify-content: center;
		}

		.note-textarea {
			min-height: 300px;
		}
	}
</style>
