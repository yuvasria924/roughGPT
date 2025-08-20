<script>
	import { onMount } from 'svelte';
	import { setContext } from 'svelte';
	import { goto } from '$app/navigation';
	import { applyTheme } from '$lib/stores/theme.js';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import '$lib/styles/global.css';

	let { children } = $props();

	/**
	 * @type {HTMLImageElement}
	 */
	let plug;
	/**
	 * @type {HTMLImageElement}
	 */
	let socket;

	function logout() {
		goto('/');
		if (plug && socket) {
			plug.classList.remove('connected');
			socket.classList.remove('connected');
		}
		localStorage.removeItem('apiKey');
	}

	function connectAnimation() {
		if (plug && socket) {
			plug.classList.add('connected');
			socket.classList.add('connected');
		}
	}

	setContext('animations', { connectAnimation });

	onMount(() => {
		// Initialize theme
		applyTheme('system');

		// Setup logout handlers
		if (plug) plug.addEventListener('click', logout);
		if (socket) socket.addEventListener('click', logout);

		// Auto-connect if API key exists
		if (localStorage.getItem('apiKey')) {
			connectAnimation();
		}
	});
</script>

<div class="theme-toggle-container">
	<ThemeToggle size="md" />
</div>

<div class="connection-indicators">
	<img bind:this={plug} class="plug" src="/plug.svg" alt="Disconnect" />
	<img bind:this={socket} class="socket" src="/socket.svg" alt="Disconnect" />
</div>

{@render children()}

<style>
	.theme-toggle-container {
		position: fixed;
		top: var(--space-4);
		right: var(--space-4);
		z-index: 50;
	}

	.connection-indicators {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 10;
		pointer-events: none;
	}

	.plug {
		width: 52vw;
		height: auto;
		position: absolute;
		left: -8%;
		bottom: 2.95vw;
		filter: none;
		cursor: pointer;
		pointer-events: auto;
		transition: all var(--transition-slow);
		opacity: 0.7;
	}

	.plug:hover {
		opacity: 1;
		transform: scale(1.02);
	}

	[data-theme="dark"] .plug {
		filter: invert(1);
	}

	.plug.connected {
		left: 0%;
		opacity: 1;
	}

	.socket {
		width: 50vw;
		height: auto;
		bottom: 2.15vw;
		position: absolute;
		right: -10%;
		filter: none;
		cursor: pointer;
		pointer-events: auto;
		transition: all var(--transition-slow);
		opacity: 0.7;
	}

	.socket:hover {
		opacity: 1;
		transform: scale(1.02);
	}

	[data-theme="dark"] .socket {
		filter: invert(1);
	}

	.socket.connected {
		right: 0%;
		opacity: 1;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.plug.connected {
			left: -0.1%;
		}

		.socket.connected {
			right: -0.1%;
		}

		.theme-toggle-container {
			top: var(--space-2);
			right: var(--space-2);
		}
	}
</style>
