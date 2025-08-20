<script>
	import { onMount } from 'svelte';
	import { setContext } from 'svelte';
	import { goto } from '$app/navigation';
	import { applyTheme } from '$lib/stores/theme.js';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import '$lib/styles/global.css';

	let { children } = $props();


	function logout() {
		goto('/');
		localStorage.removeItem('apiKey');
	}

	function connectAnimation() {
		// Animation logic can be added here if needed
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

<div class="theme-toggle-container">
	<ThemeToggle size="md" />
</div>


{@render children()}

<style>
	.theme-toggle-container {
		position: fixed;
		top: var(--space-4);
		right: var(--space-4);
		z-index: 50;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.theme-toggle-container {
			top: var(--space-2);
			right: var(--space-2);
		}
	}
</style>
