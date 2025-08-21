<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let { isOpen = false } = $props();

	const navigation = [
		{ name: 'Home', href: '/', icon: '🏠', kawaii: '🏡', color: '#FF69B4', desc: 'Your cozy space' },
		{ name: 'Notes', href: '/new', icon: '📝', kawaii: '📚', color: '#9932CC', desc: 'Magical notebooks' },
		{ name: 'Favorites', href: '/favorites', icon: '⭐', kawaii: '💖', color: '#4169E1', desc: 'Treasured items' },
		{ name: 'Settings', href: '/settings', icon: '⚙️', kawaii: '🔮', color: '#FFB6C1', desc: 'Customize magic' }
	];

	function navigateTo(href) {
		goto(href);
	}
</script>

<aside class="sidebar" class:sidebar-open={isOpen}>
	<div class="sidebar-content">
		<!-- Kawaii header with sparkles -->
		<div class="sidebar-header">
			<div class="header-decoration">
				<div class="sparkle-decoration sparkle-1">✨</div>
				<div class="sparkle-decoration sparkle-2">🌟</div>
				<div class="sparkle-decoration sparkle-3">💫</div>
			</div>
			<div class="profile-section">
				<div class="avatar">
					<span class="avatar-emoji">🌸</span>
					<div class="avatar-glow"></div>
				</div>
				<h2 class="sidebar-title">Kawaii Menu</h2>
				<p class="sidebar-subtitle">✨ Choose your adventure ✨</p>
			</div>
		</div>
		
		<nav class="sidebar-nav">
			{#each navigation as item}
				<button 
					class="nav-item" 
					class:nav-item-active={$page.url.pathname === item.href}
					onclick={() => navigateTo(item.href)}
					style="--item-color: {item.color}"
				>
					<div class="nav-icon-container">
						<span class="nav-icon">{item.icon}</span>
						<span class="nav-kawaii">{item.kawaii}</span>
						<div class="icon-glow"></div>
					</div>
					<div class="nav-text">
						<span class="nav-label">{item.name}</span>
						<span class="nav-desc">{item.desc}</span>
					</div>
					<div class="nav-sparkles">
						<div class="nav-sparkle">✨</div>
					</div>
				</button>
			{/each}
		</nav>

		<!-- Cute footer with floating hearts -->
		<div class="sidebar-footer">
			<div class="footer-decoration">
				<div class="floating-heart heart-1">💕</div>
				<div class="floating-heart heart-2">💖</div>
				<div class="floating-heart heart-3">💗</div>
			</div>
			<div class="footer-text">
				<span class="footer-emoji">🌈</span>
				<span>Made with love</span>
			</div>
		</div>
	</div>

	<!-- Magic border -->
	<div class="magic-border"></div>
</aside>

<style>
	.sidebar {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 320px;
		transform: translateX(-100%);
		transition: transform var(--transition-base);
		z-index: 40;
		backdrop-filter: blur(25px);
		-webkit-backdrop-filter: blur(25px);
		background: linear-gradient(180deg,
			rgba(255, 182, 193, 0.2) 0%,
			rgba(221, 160, 221, 0.15) 25%,
			rgba(173, 216, 230, 0.15) 50%,
			rgba(255, 218, 185, 0.15) 75%,
			rgba(255, 240, 245, 0.2) 100%
		);
		border-right: 2px solid rgba(255, 255, 255, 0.3);
		box-shadow: 
			0 0 40px rgba(255, 105, 180, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.4);
		overflow: hidden;
	}

	[data-theme="dark"] .sidebar {
		background: linear-gradient(180deg,
			rgba(88, 28, 135, 0.3) 0%,
			rgba(30, 58, 138, 0.25) 25%,
			rgba(91, 33, 182, 0.25) 50%,
			rgba(15, 23, 42, 0.3) 75%,
			rgba(30, 41, 59, 0.35) 100%
		);
		border-right: 2px solid rgba(255, 255, 255, 0.15);
		box-shadow: 
			0 0 50px rgba(139, 92, 246, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
	}

	.sidebar-open {
		transform: translateX(0);
	}

	.magic-border {
		position: absolute;
		top: 0;
		right: -2px;
		width: 2px;
		height: 100%;
		background: linear-gradient(180deg, 
			#FF69B4, #9932CC, #4169E1, #FFB6C1
		);
		animation: borderShimmer 3s ease-in-out infinite;
	}

	@keyframes borderShimmer {
		0%, 100% {
			opacity: 0.6;
		}
		50% {
			opacity: 1;
			filter: brightness(1.3);
		}
	}

	.sidebar-content {
		padding: var(--space-6);
		height: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.sidebar-header {
		margin-bottom: var(--space-8);
		position: relative;
	}

	.header-decoration {
		position: absolute;
		top: -20px;
		left: 0;
		width: 100%;
		height: 40px;
	}

	.sparkle-decoration {
		position: absolute;
		font-size: 1.2rem;
		animation: headerSparkle 4s infinite ease-in-out;
	}

	.sparkle-1 {
		top: 0;
		left: 20%;
		color: #FF69B4;
		animation-delay: 0s;
	}

	.sparkle-2 {
		top: 10px;
		right: 30%;
		color: #9932CC;
		animation-delay: 1.3s;
	}

	.sparkle-3 {
		top: 5px;
		left: 60%;
		color: #4169E1;
		animation-delay: 2.6s;
	}

	@keyframes headerSparkle {
		0%, 100% {
			opacity: 0.3;
			transform: scale(0.8) rotate(0deg);
		}
		50% {
			opacity: 1;
			transform: scale(1.2) rotate(180deg);
		}
	}

	.profile-section {
		text-align: center;
		margin-top: var(--space-4);
	}

	.avatar {
		position: relative;
		width: 60px;
		height: 60px;
		margin: 0 auto var(--space-3);
		border-radius: 50%;
		background: linear-gradient(135deg, #FFB6C1, #DDA0DD);
		display: flex;
		align-items: center;
		justify-content: center;
		border: 3px solid rgba(255, 255, 255, 0.5);
		box-shadow: 0 8px 25px rgba(255, 105, 180, 0.3);
	}

	.avatar-emoji {
		font-size: 1.8rem;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
	}

	.avatar-glow {
		position: absolute;
		top: -3px;
		left: -3px;
		right: -3px;
		bottom: -3px;
		border-radius: 50%;
		background: linear-gradient(45deg, #FF69B4, #9932CC, #4169E1, #FF69B4);
		animation: avatarGlow 3s linear infinite;
		z-index: -1;
		opacity: 0.7;
	}

	@keyframes avatarGlow {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.sidebar-title {
		font-size: var(--font-size-xl);
		font-weight: 700;
		background: linear-gradient(135deg, #FF69B4, #9932CC);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: var(--space-1);
	}

	.sidebar-subtitle {
		color: var(--text-secondary);
		font-size: var(--font-size-sm);
		font-style: italic;
	}

	.sidebar-nav {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		flex: 1;
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		padding: var(--space-4) var(--space-4);
		border: none;
		background: rgba(255, 255, 255, 0.1);
		border-radius: var(--radius-xl);
		color: var(--text-secondary);
		cursor: pointer;
		transition: all var(--transition-base);
		font-family: inherit;
		width: 100%;
		text-align: left;
		position: relative;
		overflow: hidden;
		border: 2px solid transparent;
	}

	.nav-item:hover {
		background: rgba(255, 255, 255, 0.2);
		color: var(--text-primary);
		transform: translateX(8px) scale(1.02);
		border-color: var(--item-color);
		box-shadow: 
			0 8px 25px rgba(255, 105, 180, 0.2),
			0 0 20px var(--item-color, #FF69B4);
	}

	[data-theme="dark"] .nav-item {
		background: rgba(15, 23, 42, 0.2);
	}

	[data-theme="dark"] .nav-item:hover {
		background: rgba(15, 23, 42, 0.4);
		box-shadow: 
			0 8px 25px rgba(139, 92, 246, 0.3),
			0 0 20px var(--item-color, #8B5CF6);
	}

	.nav-item-active {
		background: linear-gradient(135deg, 
			rgba(255, 105, 180, 0.2),
			rgba(153, 50, 204, 0.15),
			rgba(65, 105, 225, 0.1)
		);
		color: var(--text-primary);
		border-color: var(--item-color);
		box-shadow: 0 8px 25px var(--item-color, rgba(255, 105, 180, 0.3));
	}

	.nav-icon-container {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		border-radius: var(--radius-lg);
		background: linear-gradient(135deg, 
			rgba(255, 255, 255, 0.2),
			rgba(255, 255, 255, 0.1)
		);
		transition: all var(--transition-base);
	}

	.nav-item:hover .nav-icon-container {
		background: var(--item-color);
		transform: scale(1.1) rotate(5deg);
	}

	.nav-icon {
		font-size: 1.3rem;
		transition: all var(--transition-base);
		position: absolute;
	}

	.nav-kawaii {
		font-size: 1.3rem;
		opacity: 0;
		transition: all var(--transition-base);
		position: absolute;
	}

	.nav-item:hover .nav-icon {
		opacity: 0;
		transform: scale(0.5) rotate(-90deg);
	}

	.nav-item:hover .nav-kawaii {
		opacity: 1;
		transform: scale(1.1) rotate(10deg);
	}

	.icon-glow {
		position: absolute;
		top: -2px;
		left: -2px;
		right: -2px;
		bottom: -2px;
		border-radius: var(--radius-lg);
		background: var(--item-color);
		opacity: 0;
		transition: opacity var(--transition-base);
		z-index: -1;
		filter: blur(8px);
	}

	.nav-item:hover .icon-glow {
		opacity: 0.3;
	}

	.nav-text {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.nav-label {
		font-weight: 600;
		font-size: var(--font-size-base);
		transition: color var(--transition-base);
	}

	.nav-desc {
		font-size: var(--font-size-xs);
		color: var(--text-tertiary);
		font-style: italic;
		transition: color var(--transition-base);
	}

	.nav-item:hover .nav-desc {
		color: var(--text-secondary);
	}

	.nav-sparkles {
		position: absolute;
		top: 50%;
		right: var(--space-3);
		transform: translateY(-50%);
		opacity: 0;
		transition: all var(--transition-base);
	}

	.nav-sparkle {
		font-size: 1rem;
		color: var(--item-color);
		animation: navSparkle 2s infinite ease-in-out;
	}

	.nav-item:hover .nav-sparkles {
		opacity: 1;
	}

	@keyframes navSparkle {
		0%, 100% {
			transform: scale(0.8) rotate(0deg);
		}
		50% {
			transform: scale(1.2) rotate(180deg);
		}
	}

	.sidebar-footer {
		margin-top: auto;
		padding-top: var(--space-4);
		text-align: center;
		position: relative;
	}

	.footer-decoration {
		position: absolute;
		top: -10px;
		left: 0;
		width: 100%;
		height: 20px;
	}

	.floating-heart {
		position: absolute;
		font-size: 0.9rem;
		animation: floatingHeart 6s infinite ease-in-out;
	}

	.heart-1 {
		left: 20%;
		color: #FF69B4;
		animation-delay: 0s;
	}

	.heart-2 {
		left: 50%;
		color: #FFB6C1;
		animation-delay: 2s;
	}

	.heart-3 {
		right: 20%;
		color: #DDA0DD;
		animation-delay: 4s;
	}

	@keyframes floatingHeart {
		0%, 100% {
			opacity: 0.3;
			transform: translateY(0) scale(0.8);
		}
		50% {
			opacity: 1;
			transform: translateY(-10px) scale(1.1);
		}
	}

	.footer-text {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		font-size: var(--font-size-sm);
		color: var(--text-tertiary);
		margin-top: var(--space-2);
	}

	.footer-emoji {
		animation: rainbowRotate 4s infinite linear;
	}

	@keyframes rainbowRotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.sidebar {
			width: 100%;
		}
		
		.nav-item {
			padding: var(--space-3);
		}
		
		.nav-icon-container {
			width: 40px;
			height: 40px;
		}
		
		.nav-icon,
		.nav-kawaii {
			font-size: 1.1rem;
		}
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.sparkle-decoration,
		.avatar-glow,
		.nav-sparkle,
		.floating-heart,
		.footer-emoji,
		.magic-border {
			animation: none;
		}
	}
</style>
