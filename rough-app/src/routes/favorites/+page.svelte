<script>
	import Card from '$lib/components/Card.svelte';
</script>

<main class="favorites-container">
	<div class="page-header">
		<h1 class="page-title">⭐ Favorites</h1>
		<p class="page-description">Your starred and bookmarked content</p>
	</div>

	<div class="favorites-grid">
		<Card size="md" hoverable customClass="favorite-item">
			<div class="favorite-content">
				<div class="favorite-icon">🌸</div>
				<h3 class="favorite-title">Anime Art Collection</h3>
				<p class="favorite-description">Beautiful collection of pastel anime artwork and designs</p>
				<div class="favorite-meta">
					<span class="favorite-date">Added 2 days ago</span>
					<span class="favorite-type">Collection</span>
				</div>
			</div>
		</Card>

		<Card size="md" hoverable customClass="favorite-item">
			<div class="favorite-content">
				<div class="favorite-icon">🚀</div>
				<h3 class="favorite-title">Vector Database Setup</h3>
				<p class="favorite-description">Complete guide for setting up Pinecone vector database</p>
				<div class="favorite-meta">
					<span class="favorite-date">Added 1 week ago</span>
					<span class="favorite-type">Guide</span>
				</div>
			</div>
		</Card>

		<Card size="md" hoverable customClass="favorite-item">
			<div class="favorite-content">
				<div class="favorite-icon">✨</div>
				<h3 class="favorite-title">UI Design Inspiration</h3>
				<p class="favorite-description">Glassmorphism and anime-inspired design patterns</p>
				<div class="favorite-meta">
					<span class="favorite-date">Added 3 days ago</span>
					<span class="favorite-type">Inspiration</span>
				</div>
			</div>
		</Card>
	</div>
</main>

<style>
	.favorites-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: var(--space-8) var(--space-4);
	}

	.page-header {
		text-align: center;
		margin-bottom: var(--space-12);
		animation: slideUp var(--transition-slow) ease-out;
	}

	.page-title {
		font-size: var(--font-size-4xl);
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-3);
		background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.page-description {
		font-size: var(--font-size-lg);
		color: var(--text-secondary);
	}

	.favorites-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: var(--space-6);
		animation: fadeIn var(--transition-slow) ease-out 0.3s both;
	}

	.favorite-item {
		transition: all var(--transition-base);
	}

	.favorite-content {
		text-align: center;
	}

	.favorite-icon {
		font-size: 2.5rem;
		margin-bottom: var(--space-4);
		display: block;
	}

	.favorite-title {
		font-size: var(--font-size-xl);
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.favorite-description {
		color: var(--text-secondary);
		margin-bottom: var(--space-4);
		line-height: var(--line-height-relaxed);
	}

	.favorite-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: var(--font-size-sm);
		color: var(--text-tertiary);
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		padding-top: var(--space-3);
	}

	.favorite-type {
		background: var(--color-primary);
		color: white;
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-base);
		font-size: var(--font-size-xs);
		font-weight: 500;
	}

	@media (max-width: 768px) {
		.favorites-container {
			padding: var(--space-4) var(--space-2);
		}

		.favorites-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
