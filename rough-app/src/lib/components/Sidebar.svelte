<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let { isOpen = false } = $props();

	const navigation = [
		{ 
			name: 'Dashboard', 
			href: '/', 
			icon: '🏠', 
			animeIcon: '🏡',
			gradient: 'linear-gradient(135deg, #FF69B4, #FF1493)',
			description: 'Your central hub'
		},
		{ 
			name: 'Notes', 
			href: '/new', 
			icon: '📝', 
			animeIcon: '📚',
			gradient: 'linear-gradient(135deg, #9932CC, #8A2BE2)',
			description: 'Create & manage'
		},
		{ 
			name: 'Favorites', 
			href: '/favorites', 
			icon: '⭐', 
			animeIcon: '💖',
			gradient: 'linear-gradient(135deg, #4169E1, #1E90FF)',
			description: 'Starred content'
		},
		{ 
			name: 'Settings', 
			href: '/settings', 
			icon: '⚙️', 
			animeIcon: '🔮',
			gradient: 'linear-gradient(135deg, #FF6347, #FF4500)',
			description: 'Preferences'
		}
	];

	function navigateTo(href) {
		goto(href);
	}
</script>

<aside class="sidebar" class:sidebar-open={isOpen}>
	<div class="sidebar-content">
		<!-- Elegant header -->
		<div class="sidebar-header">
			<div class="header-decoration">
				<div class="sparkle-float sparkle-1">✨</div>
				<div class="sparkle-float sparkle-2">🌟</div>
				<div class="sparkle-float sparkle-3">💫</div>
			</div>
			<div class="profile-section">
				<div class="avatar">
					<span class="avatar-icon">🌸</span>
					<div class="avatar-ring"></div>
				</div>
				<h2 class="sidebar-title">Navigation</h2>
				<p class="sidebar-subtitle">Elegant Dashboard</p>
			</div>
		</div>
		
		<nav class="sidebar-nav">
			{#each navigation as item}
				<button 
					class="nav-item" 
					class:nav-item-active={$page.url.pathname === item.href}
					onclick={() => navigateTo(item.href)}
					style="--item-gradient: {item.gradient}"
				>
					<div class="nav-icon-container">
						<span class="nav-icon default-icon">{item.icon}</span>
						<span class="nav-icon anime-icon">{item.animeIcon}</span>
						<div class="icon-glow"></div>
					</div>
					<div class="nav-content">
						<span class="nav-label">{item.name}</span>
						<span class="nav-description">{item.description}</span>
					</div>
					<div class="nav-sparkle">✨</div>
				</button>
			{/each}
		</nav>

		<!-- Elegant footer -->
		<div class="sidebar-footer">
			<div class="footer-decoration">
				<div class="float-heart heart-1">💕</div>
				<div class="float-heart heart-2">💖</div>
			</div>
			<div class="footer-text">
				<span class="footer-icon">🌈</span>
				<span>Crafted with care</span>
			</div>
		</div>
	</div>

	<!-- Professional border effect -->
	<div class="elegant-border"></div>
</aside>

<style>
	.sidebar {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 300px;
		transform: translateX(-100%);
		transition: transform var(--transition-base);
		z-index: 40;
		backdrop-filter: blur(25px);
		-webkit-backdrop-filter: blur(25px);
		background: linear-gradient(180deg,
			rgba(255, 255, 255, 0.15) 0%,
			rgba(255, 228, 225, 0.12) 25%,
			rgba(230, 230, 250, 0.12) 50%,
			rgba(240, 248, 255, 0.12) 75%,
			rgba(255, 255, 255, 0.15) 100%
		);
		border-right: 2px solid rgba(255, 255, 255, 0.3);
		box-shadow: 
			0 0 40px rgba(255, 105, 180, 0.15),
			inset 0 1px 0 rgba(255, 255, 255, 0.4);
		overflow: hidden;
	}

	[data-theme="dark"] .sidebar {
		background: linear-gradient(180deg,
			rgba(45, 27, 105, 0.25) 0%,
			rgba(30, 58, 138, 0.2) 25%,
			rgba(91, 33, 182, 0.2) 50%,
			rgba(15, 23, 42, 0.25) 75%,
			rgba(30, 41, 59, 0.3) 100%
		);
		border-right: 2px solid rgba(255, 255, 255, 0.15);
		box-shadow: 
			0 0 50px rgba(139, 92, 246, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
	}

	.sidebar-open {
		transform: translateX(0);
	}

	.elegant-border {
		position: absolute;
		top: 0;
		right: -2px;
		width: 2px;
		height: 100%;
		background: linear-gradient(180deg, 
			#FF69B4 0%, #9932CC 25%, #4169E1 50%, #FF6347 75%, #FF69B4 100%
		);
		animation: borderFlow 4s ease-in-out infinite;
	}

	@keyframes borderFlow {
		0%, 100% { opacity: 0.6; }
		50% { opacity: 1; filter: brightness(1.2); }
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
		top: -15px;
		left: 0;
		width: 100%;
		height: 30px;
	}

	.sparkle-float {
		position: absolute;
		font-size: 1rem;
		animation: headerSparkle 5s infinite ease-in-out;
	}

	.sparkle-1 {
		top: 0;
		left: 25%;
		color: #FF69B4;
		animation-delay: 0s;
	}

	.sparkle-2 {
		top: 8px;
		right: 30%;
		color: #9932CC;
		animation-delay: 1.6s;
	}

	.sparkle-3 {
		top: 4px;
		left: 65%;
		color: #4169E1;
		animation-delay: 3.2s;
	}

	@keyframes headerSparkle {
		0%, 100% {
			opacity: 0.4;
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
		width: 64px;
		height: 64px;
		margin: 0 auto var(--space-3);
		border-radius: 50%;
		background: linear-gradient(135deg, 
			rgba(255, 105, 180, 0.2),
			rgba(153, 50, 204, 0.15),
			rgba(65, 105, 225, 0.2)
		);
		display: flex;
		align-items: center;
		justify-content: center;
		border: 3px solid rgba(255, 255, 255, 0.4);
		box-shadow: 0 8px 25px rgba(255, 105, 180, 0.2);
		backdrop-filter: blur(10px);
	}

	.avatar-icon {
		font-size: 1.8rem;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
	}

	.avatar-ring {
		position: absolute;
		top: -3px;
		left: -3px;
		right: -3px;
		bottom: -3px;
		border-radius: 50%;
		background: conic-gradient(from 0deg, #FF69B4, #9932CC, #4169E1, #FF6347, #FF69B4);
		animation: avatarRotate 4s linear infinite;
		z-index: -1;
		opacity: 0.6;
	}

	@keyframes avatarRotate {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	.sidebar-title {
		font-size: var(--font-size-xl);
		font-weight: 700;
		background: linear-gradient(135deg, #FF69B4, #9932CC, #4169E1);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: var(--space-1);
	}

	.sidebar-subtitle {
		color: var(--text-secondary);
		font-size: var(--font-size-sm);
		font-style: italic;
		opacity: 0.8;
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
		background: rgba(255, 255, 255, 0.08);
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
		background: rgba(255, 255, 255, 0.15);
		color: var(--text-primary);
		transform: translateX(6px) scale(1.02);
		border-color: rgba(255, 105, 180, 0.4);
		box-shadow: 
			0 8px 25px rgba(255, 105, 180, 0.15),
			0 0 20px rgba(255, 105, 180, 0.1);
	}

	[data-theme="dark"] .nav-item {
		background: rgba(15, 23, 42, 0.2);
	}

	[data-theme="dark"] .nav-item:hover {
		background: rgba(15, 23, 42, 0.4);
		box-shadow: 
			0 8px 25px rgba(139, 92, 246, 0.2),
			0 0 20px rgba(139, 92, 246, 0.15);
	}

	.nav-item-active {
		background: var(--item-gradient);
		color: white;
		border-color: rgba(255, 255, 255, 0.3);
		box-shadow: 0 8px 25px rgba(255, 105, 180, 0.3);
	}

	.nav-icon-container {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 46px;
		height: 46px;
		border-radius: var(--radius-lg);
		background: linear-gradient(135deg, 
			rgba(255, 255, 255, 0.2),
			rgba(255, 255, 255, 0.1)
		);
		transition: all var(--transition-base);
		overflow: hidden;
	}

	.nav-item:hover .nav-icon-container {
		background: var(--item-gradient);
		transform: scale(1.1) rotate(5deg);
		box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3);
	}

	.nav-icon {
		font-size: 1.2rem;
		transition: all var(--transition-base);
		position: absolute;
	}

	.anime-icon {
		opacity: 0;
		transform: scale(0.5) rotate(-90deg);
	}

	.nav-item:hover .default-icon {
		opacity: 0;
		transform: scale(0.5) rotate(90deg);
	}

	.nav-item:hover .anime-icon {
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
		background: var(--item-gradient);
		opacity: 0;
		transition: opacity var(--transition-base);
		z-index: -1;
		filter: blur(8px);
	}

	.nav-item:hover .icon-glow {
		opacity: 0.4;
	}

	.nav-content {
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

	.nav-description {
		font-size: var(--font-size-xs);
		color: var(--text-tertiary);
		font-style: italic;
		transition: color var(--transition-base);
		opacity: 0.8;
	}

	.nav-item:hover .nav-description {
		color: var(--text-secondary);
	}

	.nav-sparkle {
		font-size: 0.9rem;
		opacity: 0;
		transition: all var(--transition-base);
		animation: navSparkle 2s infinite ease-in-out;
	}

	.nav-item:hover .nav-sparkle {
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
		top: -8px;
		left: 0;
		width: 100%;
		height: 16px;
	}

	.float-heart {
		position: absolute;
		font-size: 0.8rem;
		animation: floatHeart 4s infinite ease-in-out;
	}

	.heart-1 {
		left: 30%;
		color: #FF69B4;
		animation-delay: 0s;
	}

	.heart-2 {
		right: 30%;
		color: #FF1493;
		animation-delay: 2s;
	}

	@keyframes floatHeart {
		0%, 100% {
			opacity: 0.4;
			transform: translateY(0) scale(0.8);
		}
		50% {
			opacity: 1;
			transform: translateY(-8px) scale(1.1);
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
		opacity: 0.8;
	}

	.footer-icon {
		animation: rainbowSpin 6s infinite linear;
	}

	@keyframes rainbowSpin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
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
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.sparkle-float,
		.avatar-ring,
		.nav-sparkle,
		.float-heart,
		.footer-icon,
		.elegant-border {
			animation: none;
		}
	}
</style>
