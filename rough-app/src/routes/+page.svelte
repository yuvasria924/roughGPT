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
				<span class="badge-emoji">✨</span>
				<span class="badge-text">Anime-Powered Vector DB</span>
			</div>
			<h1 class="hero-title">{data.title}</h1>
			<p class="hero-description">
				Connect to your Pinecone database and start managing your vector data with elegant, anime-inspired design.
			</p>
		</div>
	</div>

	<Card size="lg" variant="elevated" customClass="connection-card">
		<div class="card-header">
			<h2 class="card-title">🚀 Database Connection</h2>
			<p class="card-subtitle">Enter your Pinecone credentials to unlock the power</p>
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
					<svg class="error-icon" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zM9.25 14a.75.75 0 011.5 0v.01a.75.75 0 01-1.5 0V14z" clip-rule="evenodd" />
					</svg>
					{error}
				</div>
			{/if}

			<Button
				type="submit"
				variant="primary"
				size="lg"
				loading={isConnecting}
				fullWidth
			>
				{#if isConnecting}
					<span class="loading-content">
						<span class="spinner"></span>
						Connecting to the matrix...
					</span>
				{:else}
					<span class="connect-content">
						<span class="connect-emoji">⚡</span>
						Connect to Pinecone
					</span>
				{/if}
			</Button>
		</form>
	</Card>

	<div class="features-grid">
		<Card size="md" hoverable customClass="feature-card vector-search">
			<div class="feature-icon">
				<span class="feature-emoji">🔍</span>
			</div>
			<h3 class="feature-title">Vector Search</h3>
			<p class="feature-description">Perform semantic searches across your vector data with lightning speed and precision.</p>
			<div class="feature-glow"></div>
		</Card>

		<Card size="md" hoverable customClass="feature-card note-management">
			<div class="feature-icon">
				<span class="feature-emoji">📚</span>
			</div>
			<h3 class="feature-title">Note Management</h3>
			<p class="feature-description">Create, edit, and organize your notes with powerful AI-driven indexing capabilities.</p>
			<div class="feature-glow"></div>
		</Card>

		<Card size="md" hoverable customClass="feature-card real-time">
			<div class="feature-icon">
				<span class="feature-emoji">⚡</span>
			</div>
			<h3 class="feature-title">Real-time Sync</h3>
			<p class="feature-description">Keep your data synchronized across all devices with instant updates and notifications.</p>
			<div class="feature-glow"></div>
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
		gap: var(--space-12);
		max-width: 1200px;
		margin: 0 auto;
	}

	.hero-section {
		text-align: center;
		max-width: 700px;
		margin-top: var(--space-8);
	}

	.hero-content {
		animation: slideUp var(--transition-slow) ease-out;
	}

	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		background: rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: var(--radius-full);
		padding: var(--space-2) var(--space-4);
		margin-bottom: var(--space-6);
		animation: scaleIn var(--transition-base) ease-out 0.3s both;
	}

	[data-theme="dark"] .hero-badge {
		background: rgba(15, 23, 42, 0.4);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.badge-emoji {
		font-size: var(--font-size-lg);
	}

	.badge-text {
		color: var(--text-primary);
		font-weight: 500;
		font-size: var(--font-size-sm);
	}

	.hero-title {
		font-size: clamp(2.5rem, 8vw, 4.5rem);
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-4);
		line-height: 1.1;
		background: linear-gradient(135deg, var(--color-primary), var(--color-accent), #9333ea);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		animation: fadeIn var(--transition-slow) ease-out 0.5s both;
	}

	.hero-description {
		font-size: var(--font-size-lg);
		color: var(--text-secondary);
		line-height: var(--line-height-relaxed);
		margin-bottom: var(--space-8);
		animation: fadeIn var(--transition-slow) ease-out 0.7s both;
	}

	.connection-card {
		width: 100%;
		max-width: 500px;
		animation: scaleIn var(--transition-slow) ease-out 0.9s both;
		position: relative;
		overflow: hidden;
	}

	.card-header {
		text-align: center;
		margin-bottom: var(--space-6);
	}

	.card-title {
		font-size: var(--font-size-2xl);
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.card-subtitle {
		color: var(--text-secondary);
		font-size: var(--font-size-base);
	}

	.connection-form {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-4);
	}

	.error-message {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-4);
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.3);
		border-radius: var(--radius-md);
		color: var(--color-error);
		font-size: var(--font-size-sm);
		animation: slideUp var(--transition-base) ease-out;
	}

	.error-icon {
		width: 1.25rem;
		height: 1.25rem;
		flex-shrink: 0;
	}

	.loading-content {
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.spinner {
		width: 16px;
		height: 16px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top: 2px solid currentColor;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	.connect-content {
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.connect-emoji {
		font-size: var(--font-size-lg);
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--space-6);
		width: 100%;
		max-width: 900px;
		animation: fadeIn var(--transition-slow) ease-out 1.1s both;
	}

	.feature-card {
		text-align: center;
		position: relative;
		overflow: hidden;
		transition: all var(--transition-base);
	}

	.feature-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
		transform: translateX(-100%);
		transition: transform 0.6s ease;
	}

	.feature-card:hover::before {
		transform: translateX(100%);
	}

	.feature-icon {
		margin-bottom: var(--space-4);
		display: flex;
		justify-content: center;
		align-items: center;
		width: 4rem;
		height: 4rem;
		background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
		border-radius: var(--radius-2xl);
		margin: 0 auto var(--space-4) auto;
		position: relative;
		transition: all var(--transition-base);
	}

	.feature-card:hover .feature-icon {
		transform: scale(1.1) rotate(5deg);
		box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
	}

	.feature-emoji {
		font-size: 1.75rem;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
	}

	.feature-title {
		font-size: var(--font-size-xl);
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-3);
		transition: color var(--transition-base);
	}

	.feature-card:hover .feature-title {
		color: var(--color-primary);
	}

	.feature-description {
		color: var(--text-secondary);
		font-size: var(--font-size-base);
		line-height: var(--line-height-relaxed);
	}

	.feature-glow {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 200px;
		height: 200px;
		background: radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%);
		transform: translate(-50%, -50%);
		opacity: 0;
		transition: opacity var(--transition-base);
		pointer-events: none;
	}

	.feature-card:hover .feature-glow {
		opacity: 1;
	}

	/* Specific card color themes */
	.vector-search:hover .feature-icon {
		background: linear-gradient(135deg, #3b82f6, #8b5cf6);
	}

	.note-management:hover .feature-icon {
		background: linear-gradient(135deg, #10b981, #06b6d4);
	}

	.real-time:hover .feature-icon {
		background: linear-gradient(135deg, #f59e0b, #ef4444);
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.main-container {
			padding: var(--space-4) var(--space-2);
			gap: var(--space-8);
		}

		.hero-section {
			margin-top: var(--space-4);
		}

		.form-row {
			grid-template-columns: 1fr;
		}

		.features-grid {
			grid-template-columns: 1fr;
			gap: var(--space-4);
		}
	}

	@media (max-width: 480px) {
		.hero-title {
			font-size: 2.25rem;
		}

		.hero-description {
			font-size: var(--font-size-base);
		}
	}
</style>
