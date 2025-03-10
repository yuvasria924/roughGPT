<script>
	import { onMount } from 'svelte';
	import { setContext } from 'svelte';
	import { goto } from '$app/navigation';

	let { children } = $props();

	let darkModeToggleSrc = $state('/sun.svg'); // Default icon
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
		plug.classList.remove('connected');
		socket.classList.remove('connected');
		localStorage.removeItem('apiKey');
	}

	function toggle() {
		const body = window.document.body;
		body.classList.toggle('dark-mode');

		// Change icon when toggled
		darkModeToggleSrc = body.classList.contains('dark-mode') ? '/moon.svg' : '/sun.svg';
	}

	function connectAnimation() {
		// Ensure plug exists before modifying it
		if (plug) {
			plug.classList.add('connected');
			socket.classList.add('connected');
		}
	}

	setContext('animations', { connectAnimation });
	onMount(() => {
		toggle();
		toggle();
		document.getElementById('dark-mode-toggle')?.addEventListener('click', toggle);
		plug.addEventListener('click', logout);
		socket.addEventListener('click', logout);
		if (localStorage.getItem('apiKey')) {
			connectAnimation();
		}
	});
</script>

<img
	id="dark-mode-toggle"
	class="dark-mode-toggle"
	src={darkModeToggleSrc}
	alt="Toggle Dark Mode"
/>

<img bind:this={plug} class="plug" src="/plug.svg" alt="plug" />
<img bind:this={socket} class="socket" src="/socket.svg" alt="socket" />

{@render children()}

<style>
	:global(body) .plug {
		width: 52vw;
		height: auto;
		position: fixed;
		left: -8%;
		bottom: 2.95vw;
		filter: none;
		cursor:pointer;
		transition:
			filter 0.3s,
			left 0.33s;
	}

	:global(body.dark-mode) .plug {
		filter: invert(1);
		transition:
			filter 0.3s,
			left 0.33s;
	}

	:global(body) :global(.plug.connected) {
		left: 0%;
		transition: left 0.33s;
	}

	:global(body) {
		background-color: #d3b251;
		transition: background-color 0.3s;
	}

	:global(body.dark-mode) {
		background-color: black;
		transition: background-color 0.3s;
	}

	:global(body) .socket {
		width: 50vw;
		height: auto;
		bottom: 2.15vw;
		position: fixed;
		right: -10%;
		filter: none;
		cursor:pointer;
		transition:
			filter 0.3s,
			right 0.33s;
	}

	:global(body.dark-mode) .socket {
		filter: invert(1);
		transition:
			filter 0.3s,
			right 0.33s;
	}

	:global(body) :global(.socket.connected) {
		right: 0%;
		transition: right 0.33s;
	}

	.dark-mode-toggle {
		position: fixed;
		right: 4%;
		top: 4.5%;
		cursor: pointer;
		width: 4vw;
		height: auto;
	}
	/*  Highlight effect on hover */
	.dark-mode-toggle:hover {
		filter: brightness(1.2); /* Slight highlight effect */
		transform: scale(1.1); /* Slight zoom effect */
		transition: 0.2s ease-in-out; /* Smooth animation */
	}

	/*  Make the moon icon white when dark mode is active */
	:global(body.dark-mode) .dark-mode-toggle {
		filter: invert(1) brightness(2);
	}

	/* Responsive design for smaller screens */
	@media (max-width: 768px) {
		:global(body) :global(.plug.connected) {
			left: -0.1%;
			transition: left 0.33s;
		}

		:global(body) :global(.socket.connected) {
			right: -0.1%;
			transition: right 0.33s;
		}
	}
</style>
