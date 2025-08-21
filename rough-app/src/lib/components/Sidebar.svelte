<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let { isOpen = false } = $props();

	const navigation = [
		{ name: 'Home', href: '/', icon: '🏠' },
		{ name: 'Notes', href: '/new', icon: '📝' },
		{ name: 'Favorites', href: '/favorites', icon: '⭐' },
		{ name: 'Settings', href: '/settings', icon: '⚙️' }
	];

	function navigateTo(href) {
		goto(href);
	}
</script>

<aside class="sidebar" class:sidebar-open={isOpen}>
	<div class="sidebar-content">
		<div class="sidebar-header">
			<h2 class="sidebar-title">Menu</h2>
		</div>
		
		<nav class="sidebar-nav">
			{#each navigation as item}
				<button 
					class="nav-item" 
					class:nav-item-active={$page.url.pathname === item.href}
					onclick={() => navigateTo(item.href)}
				>
					<span class="nav-icon">{item.icon}</span>
					<span class="nav-label">{item.name}</span>
				</button>
			{/each}
		</nav>
	</div>
</aside>

<style>
	.sidebar {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 280px;
		transform: translateX(-100%);
		transition: transform var(--transition-base);
		z-index: 40;
		backdrop-filter: blur(20px);
		background: rgba(255, 255, 255, 0.1);
		border-right: 1px solid rgba(255, 255, 255, 0.2);
		box-shadow: var(--shadow-xl);
	}

	[data-theme="dark"] .sidebar {
		background: rgba(15, 23, 42, 0.3);
		border-right: 1px solid rgba(255, 255, 255, 0.1);
	}

	.sidebar-open {
		transform: translateX(0);
	}

	.sidebar-content {
		padding: var(--space-6);
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.sidebar-header {
		margin-bottom: var(--space-8);
	}

	.sidebar-title {
		font-size: var(--font-size-xl);
		font-weight: 600;
		color: var(--text-primary);
		margin: 0;
	}

	.sidebar-nav {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-3) var(--space-4);
		border: none;
		background: transparent;
		border-radius: var(--radius-lg);
		color: var(--text-secondary);
		cursor: pointer;
		transition: all var(--transition-base);
		font-size: var(--font-size-base);
		font-family: inherit;
		width: 100%;
		text-align: left;
	}

	.nav-item:hover {
		background: rgba(255, 255, 255, 0.1);
		color: var(--text-primary);
		transform: translateX(4px);
	}

	[data-theme="dark"] .nav-item:hover {
		background: rgba(255, 255, 255, 0.05);
	}

	.nav-item-active {
		background: var(--color-primary);
		color: white;
	}

	.nav-item-active:hover {
		background: var(--color-primary-hover);
		transform: translateX(4px);
	}

	.nav-icon {
		font-size: var(--font-size-lg);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
	}

	.nav-label {
		font-weight: 500;
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.sidebar {
			width: 100%;
		}
	}
</style>
