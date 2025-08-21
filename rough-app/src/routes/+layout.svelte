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

<!-- Enhanced anime background with more vibrant colors -->
<AnimeBackground opacity={0.6} />

<div class="layout-container">
	<!-- Kawaii Sidebar -->
	<Sidebar bind:isOpen={isSidebarOpen} />
	
	<!-- Sidebar overlay for mobile -->
	{#if isSidebarOpen}
		<div class="sidebar-overlay" onclick={closeSidebar}></div>
	{/if}

	<!-- Kawaii Menu Toggle Button -->
	<button class="menu-toggle" onclick={toggleSidebar}>
		<div class="menu-icon">
			{#if isSidebarOpen}
				<span class="close-emoji">🌸</span>
			{:else}
				<span class="menu-emoji">🍡</span>
			{/if}
		</div>
		<div class="button-sparkles">
			<div class="sparkle sparkle-1">✨</div>
			<div class="sparkle sparkle-2">💫</div>
		</div>
	</button>

	<!-- Enhanced Theme Toggle -->
	<div class="theme-toggle-container">
		<div class="theme-wrapper">
			<ThemeToggle size="md" />
			<div class="theme-sparkles">
				<div class="sparkle">🌙</div>
				<div class="sparkle">☀️</div>
			</div>
		</div>
	</div>

	<!-- Magical Floating Search Bar -->
	<FloatingSearchBar 
		placeholder="✨ Search for magical notes and content... 🔍" 
		value={searchQuery}
		on:search={handleSearch}
	/>

	<!-- Main Content with enhanced styling -->
	<main class="main-content">
		{@render children()}
	</main>

	<!-- Floating action button -->
	<button class="fab">
		<span class="fab-emoji">✨</span>
		<div class="fab-sparkles">
			<div class="sparkle">💖</div>
			<div class="sparkle">🌟</div>
			<div class="sparkle">💫</div>
		</div>
	</button>
</div>

<style>
	.layout-container {
		min-height: 100vh;
		position: relative;
		overflow-x: hidden;
	}

	.menu-toggle {
		position: fixed;
		top: var(--space-6);
		left: var(--space-6);
		z-index: 60;
		background: linear-gradient(135deg, 
			rgba(255, 182, 193, 0.3),
			rgba(221, 160, 221, 0.2),
			rgba(173, 216, 230, 0.3)
		);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border: 2px solid rgba(255, 255, 255, 0.4);
		border-radius: var(--radius-2xl);
		padding: var(--space-3);
		cursor: pointer;
		transition: all var(--transition-base);
		width: 60px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 
			0 8px 25px rgba(255, 105, 180, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.5);
		position: relative;
		overflow: hidden;
	}

	[data-theme="dark"] .menu-toggle {
		background: linear-gradient(135deg, 
			rgba(88, 28, 135, 0.4),
			rgba(139, 92, 246, 0.3),
			rgba(168, 85, 247, 0.3)
		);
		border: 2px solid rgba(255, 255, 255, 0.2);
		box-shadow: 
			0 8px 25px rgba(139, 92, 246, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.2);
	}

	.menu-toggle:hover {
		transform: scale(1.1) rotate(5deg);
		border-color: #FF69B4;
		box-shadow: 
			0 12px 35px rgba(255, 105, 180, 0.4),
			0 0 20px rgba(255, 105, 180, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.6);
	}

	.menu-icon {
		font-size: 1.8rem;
		transition: all var(--transition-base);
		animation: iconBob 3s ease-in-out infinite;
	}

	@keyframes iconBob {
		0%, 100% {
			transform: translateY(0) rotate(0deg);
		}
		50% {
			transform: translateY(-3px) rotate(10deg);
		}
	}

	.button-sparkles {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.button-sparkles .sparkle {
		position: absolute;
		font-size: 0.8rem;
		animation: buttonSparkle 4s infinite ease-in-out;
		opacity: 0;
	}

	.sparkle-1 {
		top: 10%;
		right: 15%;
		color: #FF69B4;
		animation-delay: 0s;
	}

	.sparkle-2 {
		bottom: 15%;
		left: 10%;
		color: #9932CC;
		animation-delay: 2s;
	}

	@keyframes buttonSparkle {
		0%, 100% {
			opacity: 0;
			transform: scale(0.5) rotate(0deg);
		}
		50% {
			opacity: 1;
			transform: scale(1.2) rotate(180deg);
		}
	}

	.theme-toggle-container {
		position: fixed;
		top: var(--space-6);
		right: var(--space-6);
		z-index: 50;
	}

	.theme-wrapper {
		position: relative;
		padding: var(--space-2);
		background: linear-gradient(135deg, 
			rgba(255, 182, 193, 0.2),
			rgba(221, 160, 221, 0.15),
			rgba(173, 216, 230, 0.2)
		);
		backdrop-filter: blur(15px);
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-radius: var(--radius-2xl);
		box-shadow: 0 8px 25px rgba(255, 105, 180, 0.15);
	}

	[data-theme="dark"] .theme-wrapper {
		background: linear-gradient(135deg, 
			rgba(88, 28, 135, 0.3),
			rgba(139, 92, 246, 0.2),
			rgba(168, 85, 247, 0.2)
		);
		border: 2px solid rgba(255, 255, 255, 0.15);
		box-shadow: 0 8px 25px rgba(139, 92, 246, 0.2);
	}

	.theme-sparkles {
		position: absolute;
		top: -5px;
		right: -5px;
		width: 20px;
		height: 20px;
	}

	.theme-sparkles .sparkle {
		position: absolute;
		font-size: 0.7rem;
		animation: themeSparkle 6s infinite ease-in-out;
	}

	.theme-sparkles .sparkle:first-child {
		top: 0;
		left: 0;
		animation-delay: 0s;
	}

	.theme-sparkles .sparkle:last-child {
		bottom: 0;
		right: 0;
		animation-delay: 3s;
	}

	@keyframes themeSparkle {
		0%, 100% {
			opacity: 0;
			transform: scale(0.3);
		}
		50% {
			opacity: 1;
			transform: scale(1);
		}
	}

	.sidebar-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(45deg, 
			rgba(255, 105, 180, 0.1),
			rgba(153, 50, 204, 0.1),
			rgba(65, 105, 225, 0.1)
		);
		backdrop-filter: blur(8px);
		z-index: 35;
		animation: fadeIn var(--transition-base) ease-out;
	}

	.main-content {
		padding-top: 140px; /* Space for floating search bar */
		min-height: 100vh;
		transition: all var(--transition-base);
		position: relative;
		z-index: 1;
	}

	.fab {
		position: fixed;
		bottom: var(--space-8);
		right: var(--space-8);
		z-index: 45;
		width: 70px;
		height: 70px;
		border-radius: 50%;
		border: none;
		background: linear-gradient(135deg, #FF69B4, #9932CC, #4169E1);
		color: white;
		cursor: pointer;
		box-shadow: 
			0 8px 25px rgba(255, 105, 180, 0.4),
			0 4px 15px rgba(153, 50, 204, 0.3);
		transition: all var(--transition-base);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.8rem;
		animation: fabPulse 4s ease-in-out infinite;
		position: relative;
		overflow: hidden;
	}

	.fab:hover {
		transform: scale(1.15) rotate(15deg);
		box-shadow: 
			0 15px 40px rgba(255, 105, 180, 0.5),
			0 8px 25px rgba(153, 50, 204, 0.4),
			0 0 30px rgba(65, 105, 225, 0.3);
	}

	.fab-emoji {
		animation: fabSpin 3s linear infinite;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
	}

	@keyframes fabPulse {
		0%, 100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.05);
		}
	}

	@keyframes fabSpin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.fab-sparkles {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.fab-sparkles .sparkle {
		position: absolute;
		font-size: 0.9rem;
		animation: fabSparkle 3s infinite ease-in-out;
	}

	.fab-sparkles .sparkle:nth-child(1) {
		top: 10%;
		left: 20%;
		color: #FFB6C1;
		animation-delay: 0s;
	}

	.fab-sparkles .sparkle:nth-child(2) {
		top: 20%;
		right: 15%;
		color: #DDA0DD;
		animation-delay: 1s;
	}

	.fab-sparkles .sparkle:nth-child(3) {
		bottom: 15%;
		left: 25%;
		color: #87CEEB;
		animation-delay: 2s;
	}

	@keyframes fabSparkle {
		0%, 100% {
			opacity: 0;
			transform: scale(0.5) translateY(0);
		}
		50% {
			opacity: 1;
			transform: scale(1.2) translateY(-10px);
		}
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.menu-toggle,
		.theme-toggle-container {
			top: var(--space-4);
		}

		.menu-toggle {
			left: var(--space-4);
			width: 50px;
			height: 50px;
		}

		.theme-toggle-container {
			right: var(--space-4);
		}

		.main-content {
			padding-top: 160px;
		}

		.fab {
			bottom: var(--space-6);
			right: var(--space-6);
			width: 60px;
			height: 60px;
			font-size: 1.5rem;
		}

		.menu-icon {
			font-size: 1.5rem;
		}
	}

	/* Reduced motion accessibility */
	@media (prefers-reduced-motion: reduce) {
		.menu-icon,
		.fab-emoji,
		.button-sparkles .sparkle,
		.theme-sparkles .sparkle,
		.fab-sparkles .sparkle,
		.fab {
			animation: none;
		}
	}

	/* Enhanced glow effects for dark mode */
	[data-theme="dark"] .menu-toggle:hover {
		box-shadow: 
			0 12px 35px rgba(139, 92, 246, 0.5),
			0 0 25px rgba(139, 92, 246, 0.4),
			inset 0 1px 0 rgba(255, 255, 255, 0.3);
	}

	[data-theme="dark"] .fab {
		box-shadow: 
			0 8px 25px rgba(139, 92, 246, 0.4),
			0 4px 15px rgba(168, 85, 247, 0.3);
	}

	[data-theme="dark"] .fab:hover {
		box-shadow: 
			0 15px 40px rgba(139, 92, 246, 0.6),
			0 8px 25px rgba(168, 85, 247, 0.5),
			0 0 35px rgba(139, 92, 246, 0.4);
	}
</style>
