<script>
	import { createEventDispatcher } from 'svelte';

	let { placeholder = "Search notes...", value = "" } = $props();
	let inputRef;
	let isFocused = $state(false);
	
	const dispatch = createEventDispatcher();

	function handleInput(event) {
		value = event.target.value;
		dispatch('search', { query: value });
	}

	function handleFocus() {
		isFocused = true;
	}

	function handleBlur() {
		isFocused = false;
	}

	function handleKeydown(event) {
		if (event.key === 'Escape') {
			inputRef.blur();
		}
	}
</script>

<div class="search-container" class:search-focused={isFocused}>
	<div class="search-wrapper">
		<div class="search-icon">
			<svg viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
			</svg>
		</div>
		
		<input
			bind:this={inputRef}
			type="text"
			class="search-input"
			{placeholder}
			{value}
			oninput={handleInput}
			onfocus={handleFocus}
			onblur={handleBlur}
			onkeydown={handleKeydown}
		/>
		
		{#if value}
			<button 
				class="clear-button"
				onclick={() => { value = ''; dispatch('search', { query: '' }); }}
			>
				<svg viewBox="0 0 20 20" fill="currentColor">
					<path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
				</svg>
			</button>
		{/if}
	</div>
</div>

<style>
	.search-container {
		position: fixed;
		top: var(--space-6);
		left: 50%;
		transform: translateX(-50%);
		z-index: 50;
		width: 100%;
		max-width: 500px;
		padding: 0 var(--space-4);
	}

	.search-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		background: rgba(255, 255, 255, 0.15);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: var(--radius-2xl);
		padding: var(--space-3) var(--space-4);
		transition: all var(--transition-base);
		box-shadow: var(--shadow-lg);
	}

	[data-theme="dark"] .search-wrapper {
		background: rgba(15, 23, 42, 0.4);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.search-focused .search-wrapper {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1), var(--shadow-lg);
		background: rgba(255, 255, 255, 0.25);
	}

	[data-theme="dark"] .search-focused .search-wrapper {
		background: rgba(15, 23, 42, 0.6);
		box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2), var(--shadow-lg);
	}

	.search-icon {
		color: var(--text-secondary);
		width: 20px;
		height: 20px;
		margin-right: var(--space-3);
		flex-shrink: 0;
	}

	.search-focused .search-icon {
		color: var(--color-primary);
	}

	.search-input {
		flex: 1;
		border: none;
		background: transparent;
		color: var(--text-primary);
		font-size: var(--font-size-base);
		font-family: inherit;
		outline: none;
		padding: 0;
	}

	.search-input::placeholder {
		color: var(--text-tertiary);
	}

	.clear-button {
		background: none;
		border: none;
		color: var(--text-secondary);
		cursor: pointer;
		padding: var(--space-1);
		border-radius: var(--radius-base);
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: var(--space-2);
		transition: all var(--transition-fast);
	}

	.clear-button:hover {
		color: var(--text-primary);
		background: rgba(0, 0, 0, 0.1);
	}

	[data-theme="dark"] .clear-button:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	/* Glowing animation */
	@keyframes glow {
		0%, 100% {
			box-shadow: 0 0 5px rgba(37, 99, 235, 0.3), var(--shadow-lg);
		}
		50% {
			box-shadow: 0 0 20px rgba(37, 99, 235, 0.5), var(--shadow-lg);
		}
	}

	.search-focused .search-wrapper {
		animation: glow 2s ease-in-out infinite;
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.search-container {
			top: var(--space-4);
			padding: 0 var(--space-2);
		}
	}
</style>
