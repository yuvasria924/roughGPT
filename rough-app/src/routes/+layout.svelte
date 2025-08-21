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

<!-- Enhanced anime background with professional opacity -->
<AnimeBackground opacity={0.5} />

<div class="layout-container">
	<!-- Professional Anime Sidebar -->
	<Sidebar bind:isOpen={isSidebarOpen} />
	
	<!-- Elegant sidebar overlay for mobile -->
	{#if isSidebarOpen}
		<div class="sidebar-overlay" onclick={closeSidebar}></div>
	{/if}

	<!-- Elegant Menu Toggle Button -->
	<button class="menu-toggle" onclick={toggleSidebar}>
		<div class="menu-icon">
			{#if isSidebarOpen}
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
					<path d="M6 18L18 6M6 6l12 12"/>
				</svg>
			{:else}
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
					<path d="M3 12h18M3 6h18M3 18h18"/>
				</svg>
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
			<div class="theme-decoration">
				<div class="theme-sparkle">🌙</div>
				<div class="theme-sparkle">☀️</div>
			</div>
		</div>
	</div>

	<!-- Professional Floating Search Bar -->
	<FloatingSearchBar 
		placeholder="✨ Search your notes and content..." 
		value={searchQuery}
		on:search={handleSearch}
	/>

	<!-- Main Content with enhanced styling -->
	<main class="main-content">
		{@render children()}
	</main>

	<!-- Professional floating action button -->
	<button class="fab">
		<span class="fab-icon">💎</span>
		<div class="fab-glow"></div>
		<div class="fab-sparkles">
			<div class="fab-sparkle">✨</div>
			<div class="fab-sparkle">🌟</div>
			<div class="fab-sparkle">💫</div>
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
			rgba(255, 255, 255, 0.2),
			rgba(255, 228, 225, 0.15),
			rgba(230, 230, 250, 0.15),
			rgba(255, 255, 255, 0.2)
		);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border: 2px solid rgba(255, 255, 255, 0.3);
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
			0 8px 25px rgba(255, 105, 180, 0.15),
			inset 0 1px 0 rgba(255, 255, 255, 0.4);
		position: relative;
		overflow: hidden;
	}

	[data-theme="dark"] .menu-toggle {
		background: linear-gradient(135deg, 
			rgba(45, 27, 105, 0.3),
			rgba(139, 92, 246, 0.25),
			rgba(168, 85, 247, 0.25),
			rgba(45, 27, 105, 0.3)
		);
		border: 2px solid rgba(255, 255, 255, 0.2);
		box-shadow: 
			0 8px 25px rgba(139, 92, 246, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.2);
	}

	.menu-toggle:hover {
		transform: scale(1.05) rotate(5deg);
		border-color: #FF69B4;
		box-shadow: 
			0 12px 35px rgba(255, 105, 180, 0.3),
			0 0 20px rgba(255, 105, 180, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.5);
		background: linear-gradient(135deg, 
			rgba(255, 255, 255, 0.3),
			rgba(255, 228, 225, 0.2),
			rgba(230, 230, 250, 0.2),
			rgba(255, 255, 255, 0.3)
		);
	}

	.menu-icon {
		color: var(--text-primary);
		transition: all var(--transition-base);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.menu-icon svg {
		width: 22px;
		height: 22px;
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
		font-size: 0.7rem;
		animation: buttonSparkle 4s infinite ease-in-out;
		opacity: 0;
	}

	.sparkle-1 {
		top: 8px;
		right: 12px;
		color: #FF69B4;
		animation-delay: 0s;
	}

	.sparkle-2 {
		bottom: 12px;
		left: 8px;
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
			rgba(255, 255, 255, 0.15),
			rgba(255, 228, 225, 0.12),
			rgba(230, 230, 250, 0.12),
			rgba(255, 255, 255, 0.15)
		);
		backdrop-filter: blur(15px);
		border: 2px solid rgba(255, 255, 255, 0.25);
		border-radius: var(--radius-2xl);
		box-shadow: 0 8px 25px rgba(255, 105, 180, 0.1);
		transition: all var(--transition-base);
	}

	.theme-wrapper:hover {
		box-shadow: 0 12px 30px rgba(255, 105, 180, 0.2);
		transform: scale(1.05);
	}

	[data-theme="dark"] .theme-wrapper {
		background: linear-gradient(135deg, 
			rgba(45, 27, 105, 0.25),
			rgba(139, 92, 246, 0.2),
			rgba(168, 85, 247, 0.2),
			rgba(45, 27, 105, 0.25)
		);
		border: 2px solid rgba(255, 255, 255, 0.15);
		box-shadow: 0 8px 25px rgba(139, 92, 246, 0.15);
	}

	.theme-decoration {
		position: absolute;
		top: -6px;
		right: -6px;
		width: 20px;
		height: 20px;
	}

	.theme-sparkle {
		position: absolute;
		font-size: 0.6rem;
		animation: themeSparkle 6s infinite ease-in-out;
	}

	.theme-sparkle:first-child {
		top: 0;
		left: 0;
		animation-delay: 0s;
	}

	.theme-sparkle:last-child {
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
			rgba(255, 105, 180, 0.08),
			rgba(153, 50, 204, 0.08),
			rgba(65, 105, 225, 0.08)
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
		background: linear-gradient(135deg, #FF69B4 0%, #9932CC 50%, #4169E1 100%);
		color: white;
		cursor: pointer;
		box-shadow: 
			0 8px 25px rgba(255, 105, 180, 0.3),
			0 4px 15px rgba(153, 50, 204, 0.25);
		transition: all var(--transition-base);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.8rem;
		animation: fabFloat 4s ease-in-out infinite;
		position: relative;
		overflow: hidden;
	}

	.fab:hover {
		transform: scale(1.1) rotate(10deg);
		box-shadow: 
			0 15px 40px rgba(255, 105, 180, 0.4),
			0 8px 25px rgba(153, 50, 204, 0.35),
			0 0 30px rgba(65, 105, 225, 0.25);
		background: linear-gradient(135deg, #FF1493 0%, #8A2BE2 50%, #1E90FF 100%);
	}

	.fab-icon {
		position: relative;
		z-index: 2;
		animation: fabIconRotate 6s linear infinite;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
	}

	.fab-glow {
		position: absolute;
		top: -2px;
		left: -2px;
		right: -2px;
		bottom: -2px;
		border-radius: 50%;
		background: conic-gradient(from 0deg, #FF69B4, #9932CC, #4169E1, #FF6347, #FF69B4);
		animation: fabGlowRotate 3s linear infinite;
		z-index: -1;
		opacity: 0.6;
	}

	@keyframes fabFloat {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-8px);
		}
	}

	@keyframes fabIconRotate {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	@keyframes fabGlowRotate {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	.fab-sparkles {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.fab-sparkle {
		position: absolute;
		font-size: 0.8rem;
		animation: fabSparkle 3s infinite ease-in-out;
	}

	.fab-sparkle:nth-child(1) {
		top: 8px;
		left: 15px;
		color: #FFB6C1;
		animation-delay: 0s;
	}

	.fab-sparkle:nth-child(2) {
		top: 15px;
		right: 10px;
		color: #DDA0DD;
		animation-delay: 1s;
	}

	.fab-sparkle:nth-child(3) {
		bottom: 10px;
		left: 20px;
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
			transform: scale(1.2) translateY(-8px);
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
			width: 52px;
			height: 52px;
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

		.menu-icon svg {
			width: 18px;
			height: 18px;
		}
	}

	/* Reduced motion accessibility */
	@media (prefers-reduced-motion: reduce) {
		.menu-toggle:hover,
		.fab,
		.fab-icon,
		.fab-glow,
		.button-sparkles .sparkle,
		.theme-sparkle,
		.fab-sparkle {
			animation: none;
		}
	}

	/* Enhanced glow effects for dark mode */
	[data-theme="dark"] .menu-toggle:hover {
		box-shadow: 
			0 12px 35px rgba(139, 92, 246, 0.4),
			0 0 25px rgba(139, 92, 246, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.3);
	}

	[data-theme="dark"] .fab {
		box-shadow: 
			0 8px 25px rgba(139, 92, 246, 0.3),
			0 4px 15px rgba(168, 85, 247, 0.25);
	}

	[data-theme="dark"] .fab:hover {
		box-shadow: 
			0 15px 40px rgba(139, 92, 246, 0.5),
			0 8px 25px rgba(168, 85, 247, 0.4),
			0 0 35px rgba(139, 92, 246, 0.3);
	}
</style>
