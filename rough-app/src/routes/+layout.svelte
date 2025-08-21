<script>
	import { onMount } from 'svelte';
	import { setContext } from 'svelte';
	import { goto } from '$app/navigation';
	import { applyTheme } from '$lib/stores/theme.js';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import AnimeBackground from '$lib/components/AnimeBackground.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import FloatingSearchBar from '$lib/components/FloatingSearchBar.svelte';
	import '$lib/styles/global.css';

	let { children } = $props();
	let isSidebarOpen = $state(false);
	let searchQuery = $state('');

	function logout() {
		goto('/');
		localStorage.removeItem('apiKey');
	}

	function connectAnimation() {
		// Animation logic can be added here if needed
	}

	function toggleSidebar() {
		isSidebarOpen = !isSidebarOpen;
	}

	function handleSearch(event) {
		searchQuery = event.detail.query;
		// Handle search logic here
		console.log('Searching for:', searchQuery);
	}

	function closeSidebar() {
		isSidebarOpen = false;
	}

	setContext('animations', { connectAnimation });

	onMount(() => {
		// Initialize theme
		applyTheme('system');

		// Auto-connect if API key exists
		if (localStorage.getItem('apiKey')) {
			connectAnimation();
		}
	});
</script>

<AnimeBackground opacity={0.2} />

<div class="layout-container">
	<!-- Sidebar -->
	<Sidebar bind:isOpen={isSidebarOpen} />
	
	<!-- Sidebar overlay for mobile -->
	{#if isSidebarOpen}
		<div class="sidebar-overlay" onclick={closeSidebar}></div>
	{/if}

	<!-- Menu Toggle Button -->
	<button class="menu-toggle" onclick={toggleSidebar}>
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			{#if isSidebarOpen}
				<path d="M6 18L18 6M6 6l12 12"/>
			{:else}
				<path d="M3 12h18M3 6h18M3 18h18"/>
			{/if}
		</svg>
	</button>

	<!-- Theme Toggle -->
	<div class="theme-toggle-container">
		<ThemeToggle size="md" />
	</div>

	<!-- Floating Search Bar -->
	<FloatingSearchBar 
		placeholder="Search notes and content..." 
		value={searchQuery}
		on:search={handleSearch}
	/>

	<!-- Main Content -->
	<main class="main-content">
		{@render children()}
	</main>
</div>

<style>
	.layout-container {
		min-height: 100vh;
		position: relative;
	}

	.menu-toggle {
		position: fixed;
		top: var(--space-4);
		left: var(--space-4);
		z-index: 60;
		background: rgba(255, 255, 255, 0.15);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: var(--radius-lg);
		padding: var(--space-3);
		color: var(--text-primary);
		cursor: pointer;
		transition: all var(--transition-base);
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: var(--shadow-lg);
	}

	[data-theme="dark"] .menu-toggle {
		background: rgba(15, 23, 42, 0.4);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.menu-toggle:hover {
		background: rgba(255, 255, 255, 0.25);
		transform: scale(1.05);
		border-color: var(--color-primary);
	}

	[data-theme="dark"] .menu-toggle:hover {
		background: rgba(15, 23, 42, 0.6);
	}

	.menu-toggle svg {
		width: 20px;
		height: 20px;
		transition: transform var(--transition-base);
	}

	.theme-toggle-container {
		position: fixed;
		top: var(--space-4);
		right: var(--space-4);
		z-index: 50;
	}

	.sidebar-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(4px);
		z-index: 35;
		animation: fadeIn var(--transition-base) ease-out;
	}

	.main-content {
		padding-top: 100px; /* Space for floating search bar */
		min-height: 100vh;
		transition: transform var(--transition-base);
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.menu-toggle,
		.theme-toggle-container {
			top: var(--space-2);
		}

		.menu-toggle {
			left: var(--space-2);
		}

		.theme-toggle-container {
			right: var(--space-2);
		}

		.main-content {
			padding-top: 120px;
		}
	}

	@media (min-width: 1024px) {
		.main-content {
			margin-left: 0;
			transition: margin-left var(--transition-base);
		}
	}
</style>
