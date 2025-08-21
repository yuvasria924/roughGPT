<svelte:head>
	<title>Rough-Man - Vector Database Management</title>
	<meta name="description" content="Connect to your Pinecone database and manage vector data with ease. Modern, fast, and intuitive interface for vector search and note management." />
	<meta name="keywords" content="pinecone, vector database, AI, machine learning, semantic search, notes" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta property="og:title" content="Rough-Man - Vector Database Management" />
	<meta property="og:description" content="Modern interface for Pinecone vector database management" />
	<meta property="og:type" content="website" />
</svelte:head>

<script>
	import { onMount } from 'svelte';
	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';

	/** @type {import('./$types').PageProps} */
	let { data } = $props();
	let apiKey = $state('');
	let cloud = $state('aws');
	let region = $state('us-east-1');
	let isConnecting = $state(false);
	let error = $state('');
	const animations = getContext('animations');

	async function handleConnect(event) {
		event.preventDefault();
		if (!apiKey.trim()) {
			error = 'Please enter your Pinecone API key';
			return;
		}

		isConnecting = true;
		error = '';

		try {
			const response = await fetch('/create-index', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ apiKey, cloud, region })
			});

			const result = await response.json();
			if (result.error) {
				error = result.error;
			} else {
				localStorage.setItem('apiKey', apiKey);
				animations.connectAnimation();
				await new Promise(resolve => setTimeout(resolve, 500));
				goto('/new');
			}
		} catch (err) {
			error = 'Failed to connect. Please check your credentials and try again.';
		} finally {
			isConnecting = false;
		}
	}

	function handleKeyPress(event) {
		if (event.key === 'Enter' && !isConnecting) {
			handleConnect();
		}
	}

	onMount(() => {
		if (localStorage.getItem('apiKey')) {
			goto('/new');
		}
	});
</script>

<main class="main-container">
	<div class="hero-section">
		<div class="hero-content">
			<div class="hero-badge">
				<span class="badge-icon">💎</span>
				<span class="badge-text">Professional Vector Database</span>
				<span class="badge-sparkle">✨</span>
			</div>
			<h1 class="hero-title">{data.title}</h1>
			<p class="hero-description">
				Connect to your Pinecone database and manage vector data with elegant, anime-inspired design that balances beauty with functionality.
			</p>
			<div class="hero-ornaments">
				<div class="floating-ornament ornament-1">🌟</div>
				<div class="floating-ornament ornament-2">💫</div>
				<div class="floating-ornament ornament-3">✨</div>
				<div class="floating-ornament ornament-4">💎</div>
			</div>
		</div>
	</div>

	<Card size="lg" variant="elevated" customClass="connection-card">
		<div class="card-header">
			<h2 class="card-title">✨ Database Connection Portal</h2>
			<p class="card-subtitle">Enter your credentials to access the elegant database interface</p>
		</div>

		<form class="connection-form" onsubmit={handleConnect}>
			<Input
				label="Pinecone API Key"
				type="password"
				placeholder="sk-..."
				bind:value={apiKey}
				error={error && !apiKey.trim() ? 'API key is required' : ''}
				required
				fullWidth
				onkeypress={handleKeyPress}
				disabled={isConnecting}
			/>

			<div class="form-row">
				<Input
					label="Cloud Provider"
					type="text"
					placeholder="aws"
					bind:value={cloud}
					disabled={isConnecting}
					hint="e.g., aws, gcp, azure"
				/>

				<Input
					label="Region"
					type="text"
					placeholder="us-east-1"
					bind:value={region}
					disabled={isConnecting}
					hint="e.g., us-east-1, eu-west-1"
				/>
			</div>

			{#if error}
				<div class="error-message" role="alert">
					<span class="error-icon">⚠️</span>
					<div class="error-content">
						<span class="error-text">{error}</span>
						<span class="error-note">Please check your credentials and try again</span>
					</div>
				</div>
			{/if}

			<Button
				type="submit"
				variant="anime-gradient"
				size="lg"
				loading={isConnecting}
				fullWidth
			>
				{#if isConnecting}
					<span class="loading-content">
						<span class="loading-icon">🌟</span>
						Establishing connection...
					</span>
				{:else}
					<span class="connect-content">
						<span class="connect-icon">⚡</span>
						Connect to Pinecone
						<span class="connect-sparkle">💫</span>
					</span>
				{/if}
			</Button>
		</form>
	</Card>

	<div class="features-grid">
		<Card size="md" hoverable customClass="feature-card vector-search">
			<div class="feature-header">
				<div class="feature-icon">
					<span class="feature-emoji">🔍</span>
					<div class="icon-decoration">
						<div class="decoration decoration-1">✨</div>
						<div class="decoration decoration-2">⭐</div>
					</div>
				</div>
			</div>
			<h3 class="feature-title">Vector Search</h3>
			<p class="feature-description">Perform sophisticated semantic searches across your vector data with professional precision and elegant interface design.</p>
			<div class="feature-metrics">
				<span class="metric">⚡ Ultra Fast</span>
				<span class="metric">🎯 Precise</span>
			</div>
		</Card>

		<Card size="md" hoverable customClass="feature-card note-management">
			<div class="feature-header">
				<div class="feature-icon">
					<span class="feature-emoji">📚</span>
					<div class="icon-decoration">
						<div class="decoration decoration-1">💖</div>
						<div class="decoration decoration-2">🌸</div>
					</div>
				</div>
			</div>
			<h3 class="feature-title">Note Management</h3>
			<p class="feature-description">Create, edit, and organize your notes with powerful AI-driven indexing and beautifully designed management tools.</p>
			<div class="feature-metrics">
				<span class="metric">🤖 AI Powered</span>
				<span class="metric">📝 Rich Editor</span>
			</div>
		</Card>

		<Card size="md" hoverable customClass="feature-card real-time">
			<div class="feature-header">
				<div class="feature-icon">
					<span class="feature-emoji">⚡</span>
					<div class="icon-decoration">
						<div class="decoration decoration-1">💫</div>
						<div class="decoration decoration-2">🌟</div>
					</div>
				</div>
			</div>
			<h3 class="feature-title">Real-time Sync</h3>
			<p class="feature-description">Keep your data synchronized across all devices with instant updates, elegant notifications, and professional reliability.</p>
			<div class="feature-metrics">
				<span class="metric">🔄 Auto Sync</span>
				<span class="metric">📱 Cross Device</span>
			</div>
		</Card>
	</div>

	<div class="call-to-action">
		<Card variant="elevated" size="lg" customClass="cta-card">
			<div class="cta-content">
				<h2 class="cta-title">Ready to elevate your workflow? ✨</h2>
				<p class="cta-description">Join developers who trust our elegant, professional platform</p>
				<div class="cta-buttons">
					<Button variant="anime-gradient" size="lg">
						🚀 Get Started Now
					</Button>
					<Button variant="elegant" size="lg">
						💡 Learn More
					</Button>
				</div>
			</div>
		</Card>
	</div>
</main>

<style>
	.main-container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: var(--space-8) var(--space-4);
		gap: var(--space-16);
		max-width: 1400px;
		margin: 0 auto;
		position: relative;
	}

	.hero-section {
		text-align: center;
		max-width: 800px;
		position: relative;
		z-index: 2;
	}

	.hero-content {
		animation: slideUp var(--transition-slow) ease-out;
	}

	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--space-3);
		background: linear-gradient(135deg, 
			rgba(255, 255, 255, 0.2),
			rgba(255, 228, 225, 0.15),
			rgba(230, 230, 250, 0.15),
			rgba(255, 255, 255, 0.2)
		);
		backdrop-filter: blur(15px);
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-radius: var(--radius-full);
		padding: var(--space-3) var(--space-6);
		margin-bottom: var(--space-8);
		animation: elegantFloat 6s ease-in-out infinite;
		box-shadow: 0 8px 25px rgba(255, 105, 180, 0.15);
	}

	[data-theme="dark"] .hero-badge {
		background: linear-gradient(135deg, 
			rgba(45, 27, 105, 0.3),
			rgba(139, 92, 246, 0.25),
			rgba(168, 85, 247, 0.25),
			rgba(45, 27, 105, 0.3)
		);
		border: 2px solid rgba(255, 255, 255, 0.2);
		box-shadow: 0 8px 25px rgba(139, 92, 246, 0.2);
	}

	@keyframes elegantFloat {
		0%, 100% {
			transform: translateY(0) rotate(0deg);
		}
		50% {
			transform: translateY(-8px) rotate(1deg);
		}
	}

	.badge-icon {
		font-size: var(--font-size-lg);
		animation: iconShimmer 4s linear infinite;
	}

	.badge-sparkle {
		animation: sparkleRotate 3s linear infinite;
	}

	@keyframes iconShimmer {
		0% { transform: rotate(0deg) scale(1); }
		25% { transform: rotate(90deg) scale(1.1); }
		50% { transform: rotate(180deg) scale(1); }
		75% { transform: rotate(270deg) scale(1.1); }
		100% { transform: rotate(360deg) scale(1); }
	}

	@keyframes sparkleRotate {
		0% { transform: rotate(0deg) scale(1); }
		50% { transform: rotate(180deg) scale(1.3); }
		100% { transform: rotate(360deg) scale(1); }
	}

	.badge-text {
		color: var(--text-primary);
		font-weight: 600;
		font-size: var(--font-size-base);
	}

	.hero-title {
		font-size: clamp(3rem, 10vw, 5.5rem);
		font-weight: 800;
		color: var(--text-primary);
		margin-bottom: var(--space-6);
		line-height: 1;
		background: linear-gradient(135deg, #FF69B4 0%, #9932CC 25%, #4169E1 50%, #FF6347 75%, #FF69B4 100%);
		background-size: 200% 200%;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		animation: titleGradient 4s ease-in-out infinite;
		filter: drop-shadow(0 4px 8px rgba(255, 105, 180, 0.2));
	}

	@keyframes titleGradient {
		0%, 100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}

	.hero-description {
		font-size: var(--font-size-xl);
		color: var(--text-secondary);
		line-height: var(--line-height-relaxed);
		margin-bottom: var(--space-8);
		animation: fadeIn var(--transition-slow) ease-out 0.5s both;
	}

	.hero-ornaments {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.floating-ornament {
		position: absolute;
		font-size: 1.5rem;
		animation: ornamentFloat 10s infinite ease-in-out;
		filter: drop-shadow(0 0 8px currentColor);
	}

	.ornament-1 {
		top: 15%;
		left: 15%;
		color: #FF69B4;
		animation-delay: 0s;
	}

	.ornament-2 {
		top: 25%;
		right: 20%;
		color: #9932CC;
		animation-delay: 2.5s;
	}

	.ornament-3 {
		bottom: 30%;
		left: 25%;
		color: #4169E1;
		animation-delay: 5s;
	}

	.ornament-4 {
		bottom: 35%;
		right: 30%;
		color: #FF6347;
		animation-delay: 7.5s;
	}

	@keyframes ornamentFloat {
		0%, 100% {
			transform: translate(0, 0) rotate(0deg) scale(1);
		}
		25% {
			transform: translate(15px, -15px) rotate(90deg) scale(1.1);
		}
		50% {
			transform: translate(-8px, -25px) rotate(180deg) scale(0.9);
		}
		75% {
			transform: translate(-20px, -8px) rotate(270deg) scale(1.05);
		}
	}

	.connection-card {
		width: 100%;
		max-width: 600px;
		animation: scaleIn var(--transition-slow) ease-out 0.7s both;
		position: relative;
		z-index: 2;
	}

	.card-header {
		text-align: center;
		margin-bottom: var(--space-8);
	}

	.card-title {
		font-size: var(--font-size-3xl);
		font-weight: 700;
		background: linear-gradient(135deg, #FF69B4, #9932CC, #4169E1);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: var(--space-3);
	}

	.card-subtitle {
		color: var(--text-secondary);
		font-size: var(--font-size-lg);
		font-style: italic;
	}

	.connection-form {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-4);
	}

	.error-message {
		display: flex;
		align-items: flex-start;
		gap: var(--space-3);
		padding: var(--space-4) var(--space-5);
		background: linear-gradient(135deg, 
			rgba(255, 182, 193, 0.15),
			rgba(255, 240, 245, 0.2)
		);
		border: 2px solid rgba(255, 105, 180, 0.2);
		border-radius: var(--radius-xl);
		animation: errorSlide 0.5s ease-out;
	}

	.error-icon {
		font-size: 1.2rem;
		margin-top: 2px;
	}

	.error-content {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.error-text {
		color: var(--color-error);
		font-weight: 500;
		font-size: var(--font-size-base);
	}

	.error-note {
		color: var(--text-secondary);
		font-size: var(--font-size-sm);
		font-style: italic;
	}

	@keyframes errorSlide {
		0% { 
			transform: translateX(-10px);
			opacity: 0;
		}
		100% { 
			transform: translateX(0);
			opacity: 1;
		}
	}

	.loading-content,
	.connect-content {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		font-size: var(--font-size-lg);
		font-weight: 600;
	}

	.loading-icon {
		animation: loadingSpin 1.5s linear infinite;
		font-size: 1.2rem;
	}

	@keyframes loadingSpin {
		0% { transform: rotate(0deg) scale(1); }
		50% { transform: rotate(180deg) scale(1.2); }
		100% { transform: rotate(360deg) scale(1); }
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: var(--space-8);
		width: 100%;
		max-width: 1200px;
		animation: fadeIn var(--transition-slow) ease-out 0.9s both;
	}

	.feature-card {
		text-align: center;
		position: relative;
		overflow: visible;
	}

	.feature-header {
		margin-bottom: var(--space-5);
		position: relative;
	}

	.feature-icon {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 80px;
		height: 80px;
		border-radius: var(--radius-2xl);
		background: linear-gradient(135deg, 
			rgba(255, 255, 255, 0.2),
			rgba(255, 228, 225, 0.15),
			rgba(255, 255, 255, 0.2)
		);
		margin: 0 auto var(--space-4) auto;
		transition: all var(--transition-base);
		border: 2px solid rgba(255, 255, 255, 0.3);
		box-shadow: 0 8px 25px rgba(255, 105, 180, 0.15);
		backdrop-filter: blur(10px);
	}

	.feature-emoji {
		font-size: 2.2rem;
		filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
	}

	.icon-decoration {
		position: absolute;
		top: -8px;
		right: -8px;
		width: 20px;
		height: 20px;
	}

	.decoration {
		position: absolute;
		font-size: 0.7rem;
		animation: decorationSparkle 3s infinite ease-in-out;
	}

	.decoration-1 {
		top: 0;
		left: 0;
		animation-delay: 0s;
	}

	.decoration-2 {
		bottom: 0;
		right: 0;
		animation-delay: 1.5s;
	}

	@keyframes decorationSparkle {
		0%, 100% {
			opacity: 0;
			transform: scale(0.5);
		}
		50% {
			opacity: 1;
			transform: scale(1.2);
		}
	}

	.feature-card:hover .feature-icon {
		transform: scale(1.1) rotate(8deg);
		box-shadow: 0 15px 35px rgba(255, 105, 180, 0.3);
		background: linear-gradient(135deg, 
			rgba(255, 105, 180, 0.2),
			rgba(153, 50, 204, 0.15),
			rgba(255, 105, 180, 0.2)
		);
	}

	.feature-title {
		font-size: var(--font-size-2xl);
		font-weight: 700;
		background: linear-gradient(135deg, #FF69B4, #9932CC, #4169E1);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: var(--space-4);
	}

	.feature-description {
		color: var(--text-secondary);
		font-size: var(--font-size-base);
		line-height: var(--line-height-relaxed);
		margin-bottom: var(--space-4);
	}

	.feature-metrics {
		display: flex;
		justify-content: center;
		gap: var(--space-4);
		flex-wrap: wrap;
	}

	.metric {
		background: linear-gradient(135deg, 
			rgba(255, 105, 180, 0.1),
			rgba(153, 50, 204, 0.1)
		);
		border: 1px solid rgba(255, 105, 180, 0.2);
		border-radius: var(--radius-full);
		padding: var(--space-2) var(--space-4);
		font-size: var(--font-size-sm);
		font-weight: 500;
		color: var(--text-primary);
		backdrop-filter: blur(5px);
	}

	.call-to-action {
		width: 100%;
		max-width: 800px;
		animation: fadeIn var(--transition-slow) ease-out 1.1s both;
	}

	.cta-card {
		text-align: center;
	}

	.cta-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-6);
	}

	.cta-title {
		font-size: var(--font-size-3xl);
		font-weight: 700;
		background: linear-gradient(135deg, #FF69B4, #9932CC, #4169E1, #FF6347);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.cta-description {
		font-size: var(--font-size-lg);
		color: var(--text-secondary);
	}

	.cta-buttons {
		display: flex;
		gap: var(--space-4);
		flex-wrap: wrap;
		justify-content: center;
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.main-container {
			padding: var(--space-4) var(--space-2);
			gap: var(--space-12);
		}

		.hero-title {
			font-size: 2.8rem;
		}

		.hero-description {
			font-size: var(--font-size-lg);
		}

		.form-row {
			grid-template-columns: 1fr;
		}

		.features-grid {
			grid-template-columns: 1fr;
			gap: var(--space-6);
		}

		.floating-ornament {
			font-size: 1.2rem;
		}

		.cta-buttons {
			flex-direction: column;
			width: 100%;
		}
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.hero-badge,
		.floating-ornament,
		.loading-icon,
		.decoration {
			animation: none;
		}
		
		.hero-title {
			animation: none;
			background: linear-gradient(135deg, #FF69B4, #9932CC, #4169E1);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;
		}
	}
</style>
