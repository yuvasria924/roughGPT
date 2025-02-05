<script>
	import { onMount } from 'svelte';

	let { children } = $props();
	function toggle() {
		window.document.body.classList.toggle('dark-mode');
	}
    let darkModeToggleSrc="sun.svg";
	onMount(function () {
        document.getElementById('dark-mode-toggle')?.addEventListener('click', toggle);
	});
</script>

<img id="dark-mode-toggle" class="dark-mode-toggle" src={darkModeToggleSrc} alt="" />

<img class="plug" src="plug.svg" alt="" />
<img class="socket" src="socket.svg" alt="" />

{@render children()}

<style>
	:global(body) .plug {
		width: 52vw;
		height: auto;
		position: fixed;
		left: -8%;
		bottom: 2.95vw;
		filter: none;
		transition: filter 0.3s;
	}

	:global(body.dark-mode) .plug {
		filter: invert(1);
		transition: filter 0.3s;
	}

	:global(body) .socket {
		width: 50vw;
		height: auto;
		bottom: 2.15vw;
		position: fixed;
		right: -10%;
		filter: none;
		transition: filter 0.3s;
	}

	:global(body.dark-mode) .socket {
		filter: invert(1);
		transition: filter 0.3s;
	}

	.dark-mode-toggle {
		position: fixed;
		right: 4%;
		top: 4%;
	}
</style>
