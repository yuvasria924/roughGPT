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

	async function handleConnect() {
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
			<h1 class="hero-title">{data.title}</h1>
			<p class="hero-description">
				Connect to your Pinecone database and start managing your vector data with ease.
			</p>
		</div>
	</div>

	<Card size="lg" variant="elevated" customClass="connection-card">
		<div class="card-header">
			<h2 class="card-title">Database Connection</h2>
			<p class="card-subtitle">Enter your Pinecone credentials to get started</p>
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
					Connecting...
				{:else}
					Connect to Pinecone
				{/if}
			</Button>
		</form>
	</Card>

	<div class="features-grid">
		<Card size="md" hoverable customClass="feature-card">
			<div class="feature-icon">
				<svg viewBox="0 0 24 24" fill="currentColor" class="feature-svg">
					<path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" stroke="currentColor" stroke-width="2" fill="none" />
				</svg>
			</div>
			<h3 class="feature-title">Vector Search</h3>
			<p class="feature-description">Perform semantic searches across your vector data with ease.</p>
		</Card>

		<Card size="md" hoverable customClass="feature-card">
			<div class="feature-icon">
				<svg viewBox="0 0 24 24" fill="currentColor" class="feature-svg">
					<path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
				</svg>
			</div>
			<h3 class="feature-title">Note Management</h3>
			<p class="feature-description">Create, edit, and organize your notes with powerful indexing.</p>
		</Card>

		<Card size="md" hoverable customClass="feature-card">
			<div class="feature-icon">
				<svg viewBox="0 0 24 24" fill="currentColor" class="feature-svg">
					<path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
				</svg>
			</div>
			<h3 class="feature-title">Real-time Sync</h3>
			<p class="feature-description">Keep your data synchronized across all your devices.</p>
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
		max-width: 600px;
		margin-top: var(--space-16);
	}

	.hero-content {
		animation: slideUp var(--transition-slow) ease-out;
	}

	.hero-title {
		font-size: clamp(2.5rem, 8vw, 4rem);
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-4);
		line-height: 1.1;
		background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hero-description {
		font-size: var(--font-size-lg);
		color: var(--text-secondary);
		line-height: var(--line-height-relaxed);
		margin-bottom: var(--space-8);
	}

	.connection-card {
		width: 100%;
		max-width: 500px;
		animation: scaleIn var(--transition-slow) ease-out 0.2s both;
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
		background-color: #fef2f2;
		border: 1px solid #fecaca;
		border-radius: var(--radius-md);
		color: var(--color-error);
		font-size: var(--font-size-sm);
		animation: slideUp var(--transition-base) ease-out;
	}

	[data-theme="dark"] .error-message {
		background-color: rgba(239, 68, 68, 0.1);
		border-color: rgba(239, 68, 68, 0.3);
	}

	.error-icon {
		width: 1.25rem;
		height: 1.25rem;
		flex-shrink: 0;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: var(--space-6);
		width: 100%;
		max-width: 800px;
		animation: fadeIn var(--transition-slow) ease-out 0.4s both;
	}

	.feature-card {
		text-align: center;
		transition: transform var(--transition-base);
	}

	.feature-icon {
		font-size: 2.5rem;
		margin-bottom: var(--space-3);
		display: block;
	}

	.feature-title {
		font-size: var(--font-size-lg);
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.feature-description {
		color: var(--text-secondary);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-relaxed);
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.main-container {
			padding: var(--space-4) var(--space-2);
			gap: var(--space-8);
		}

		.hero-section {
			margin-top: var(--space-8);
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
			font-size: 2rem;
		}

		.hero-description {
			font-size: var(--font-size-base);
		}
	}
</style>
