<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Card from '$lib/components/Card.svelte';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';

	let { children } = $props();
	let searchQuery = $state('');
	let isSearching = $state(false);

	function handleSearchInput() {
		if (searchQuery.trim() === '') {
			goto('/new');
		}
	}

	async function handleSearch() {
		if (!searchQuery.trim()) return;
		
		isSearching = true;
		sessionStorage.setItem('query', searchQuery);
		window.dispatchEvent(new Event('query-changed'));
		
		// Small delay for better UX
		await new Promise(resolve => setTimeout(resolve, 100));
		goto('/new/search');
		isSearching = false;
	}

	function handleKeyPress(event) {
		if (event.key === 'Enter') {
			event.preventDefault();
			handleSearch();
		}
	}

	function handleNewNote() {
		goto('/new');
	}

	onMount(() => {
		// Redirect if not authenticated
		if (!localStorage.getItem('apiKey')) {
			goto('/');
		}

		// Set initial search query if coming from search page
		const savedQuery = sessionStorage.getItem('query');
		if (savedQuery && window.location.pathname.includes('/search')) {
			searchQuery = savedQuery;
		}
	});
</script>

<div class="layout-container">
	<nav class="navigation-bar">
		<Card size="sm" variant="elevated" customClass="nav-card">
			<div class="nav-content">
				<div class="nav-left">
					<Button 
						variant="ghost" 
						size="sm" 
						onclick={handleNewNote}
						customClass="new-note-btn"
					>
						<svg class="icon" viewBox="0 0 20 20" fill="currentColor">
							<path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
						</svg>
						New Note
					</Button>
				</div>

				<div class="search-container">
					<div class="search-wrapper">
						<Input
							type="search"
							placeholder="Search your notes..."
							bind:value={searchQuery}
							oninput={handleSearchInput}
							onkeypress={handleKeyPress}
							leftIcon="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
							size="sm"
							customClass="search-input"
						/>
						
						{#if searchQuery.trim()}
							<Button
								variant="primary"
								size="sm"
								loading={isSearching}
								onclick={handleSearch}
								customClass="search-btn"
							>
								{isSearching ? 'Searching...' : 'Search'}
							</Button>
						{/if}
					</div>
				</div>

				<div class="nav-right">
					<div class="nav-status">
						<div class="status-indicator"></div>
						<span class="status-text">Connected</span>
					</div>
				</div>
			</div>
		</Card>
	</nav>

	<main class="main-content">
		{@render children()}
	</main>
</div>

<style>
	.layout-container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: var(--bg-primary);
	}

	.navigation-bar {
		position: sticky;
		top: 0;
		z-index: 40;
		padding: var(--space-4);
		background-color: var(--bg-primary);
		border-bottom: 1px solid var(--border-primary);
		backdrop-filter: blur(8px);
		background-color: rgba(255, 255, 255, 0.8);
	}

	[data-theme="dark"] .navigation-bar {
		background-color: rgba(15, 23, 42, 0.8);
		border-bottom-color: var(--border-primary);
	}

	.nav-card {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
	}

	.nav-content {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		justify-content: space-between;
	}

	.nav-left {
		flex-shrink: 0;
	}

	.new-note-btn {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-weight: 500;
	}

	.icon {
		width: 1rem;
		height: 1rem;
	}

	.search-container {
		flex: 1;
		max-width: 500px;
		margin: 0 var(--space-4);
	}

	.search-wrapper {
		display: flex;
		gap: var(--space-2);
		align-items: center;
	}

	.search-input {
		flex: 1;
	}

	.search-btn {
		flex-shrink: 0;
	}

	.nav-right {
		flex-shrink: 0;
	}

	.nav-status {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-3);
		background-color: var(--bg-secondary);
		border-radius: var(--radius-full);
		border: 1px solid var(--border-primary);
	}

	.status-indicator {
		width: 0.5rem;
		height: 0.5rem;
		background-color: var(--color-success);
		border-radius: 50%;
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0%, 100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	.status-text {
		font-size: var(--font-size-xs);
		color: var(--text-secondary);
		font-weight: 500;
	}

	.main-content {
		flex: 1;
		width: 100%;
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.navigation-bar {
			padding: var(--space-2);
		}

		.nav-content {
			flex-direction: column;
			gap: var(--space-3);
			align-items: stretch;
		}

		.search-container {
			margin: 0;
			max-width: none;
		}

		.search-wrapper {
			flex-direction: column;
			gap: var(--space-2);
		}

		.nav-left,
		.nav-right {
			align-self: center;
		}
	}

	@media (max-width: 480px) {
		.search-wrapper {
			align-items: stretch;
		}
	}
</style>
