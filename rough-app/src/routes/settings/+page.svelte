<script>
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
</script>

<main class="settings-container">
	<div class="page-header">
		<h1 class="page-title">⚙️ Settings</h1>
		<p class="page-description">Customize your anime-powered workspace</p>
	</div>

	<div class="settings-grid">
		<Card size="lg" variant="elevated" customClass="settings-section">
			<h2 class="section-title">🎨 Appearance</h2>
			<div class="setting-item">
				<div class="setting-info">
					<h3 class="setting-name">Theme Mode</h3>
					<p class="setting-description">Choose between light and dark themes</p>
				</div>
				<ThemeToggle size="lg" />
			</div>

			<div class="setting-item">
				<div class="setting-info">
					<h3 class="setting-name">Background Opacity</h3>
					<p class="setting-description">Adjust anime background transparency</p>
				</div>
				<input type="range" min="0.1" max="0.5" step="0.1" value="0.2" class="range-slider" />
			</div>

			<div class="setting-item">
				<div class="setting-info">
					<h3 class="setting-name">Glassmorphism Intensity</h3>
					<p class="setting-description">Control the blur effect strength</p>
				</div>
				<select class="select-input">
					<option value="subtle">Subtle</option>
					<option value="medium" selected>Medium</option>
					<option value="strong">Strong</option>
				</select>
			</div>
		</Card>

		<Card size="lg" variant="elevated" customClass="settings-section">
			<h2 class="section-title">🔌 Database</h2>
			<div class="setting-item">
				<div class="setting-info">
					<h3 class="setting-name">Pinecone Connection</h3>
					<p class="setting-description">Manage your vector database connection</p>
				</div>
				<div class="setting-actions">
					<Button variant="outline" size="sm">Disconnect</Button>
					<Button variant="primary" size="sm">Reconnect</Button>
				</div>
			</div>

			<div class="setting-item">
				<div class="setting-info">
					<h3 class="setting-name">Auto-sync</h3>
					<p class="setting-description">Automatically sync data changes</p>
				</div>
				<label class="toggle-switch">
					<input type="checkbox" checked />
					<span class="slider"></span>
				</label>
			</div>
		</Card>

		<Card size="lg" variant="elevated" customClass="settings-section">
			<h2 class="section-title">🚀 Performance</h2>
			<div class="setting-item">
				<div class="setting-info">
					<h3 class="setting-name">Animation Quality</h3>
					<p class="setting-description">Adjust interface animations</p>
				</div>
				<select class="select-input">
					<option value="reduced">Reduced Motion</option>
					<option value="normal" selected>Normal</option>
					<option value="enhanced">Enhanced</option>
				</select>
			</div>

			<div class="setting-item">
				<div class="setting-info">
					<h3 class="setting-name">Search Suggestions</h3>
					<p class="setting-description">Enable real-time search suggestions</p>
				</div>
				<label class="toggle-switch">
					<input type="checkbox" checked />
					<span class="slider"></span>
				</label>
			</div>
		</Card>
	</div>
</main>

<style>
	.settings-container {
		max-width: 1000px;
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

	.settings-grid {
		display: grid;
		gap: var(--space-6);
		animation: fadeIn var(--transition-slow) ease-out 0.3s both;
	}

	.settings-section {
		animation: slideUp var(--transition-slow) ease-out var(--animation-delay, 0.1s) both;
	}

	.section-title {
		font-size: var(--font-size-2xl);
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-6);
		padding-bottom: var(--space-3);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.setting-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--space-4) 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
	}

	.setting-item:last-child {
		border-bottom: none;
	}

	.setting-info {
		flex: 1;
		margin-right: var(--space-4);
	}

	.setting-name {
		font-size: var(--font-size-lg);
		font-weight: 500;
		color: var(--text-primary);
		margin-bottom: var(--space-1);
	}

	.setting-description {
		font-size: var(--font-size-sm);
		color: var(--text-secondary);
		line-height: var(--line-height-relaxed);
	}

	.setting-actions {
		display: flex;
		gap: var(--space-2);
	}

	.range-slider {
		width: 120px;
		height: 6px;
		border-radius: var(--radius-full);
		background: rgba(255, 255, 255, 0.2);
		outline: none;
		transition: all var(--transition-base);
	}

	.range-slider::-webkit-slider-thumb {
		appearance: none;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: var(--color-primary);
		cursor: pointer;
		box-shadow: var(--shadow-md);
	}

	.select-input {
		padding: var(--space-2) var(--space-3);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: var(--radius-md);
		background: rgba(255, 255, 255, 0.1);
		color: var(--text-primary);
		font-family: inherit;
		backdrop-filter: blur(10px);
		transition: all var(--transition-base);
	}

	.select-input:focus {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
	}

	.toggle-switch {
		position: relative;
		display: inline-block;
		width: 60px;
		height: 34px;
	}

	.toggle-switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(255, 255, 255, 0.2);
		transition: var(--transition-base);
		border-radius: 34px;
		backdrop-filter: blur(10px);
	}

	.slider:before {
		position: absolute;
		content: "";
		height: 26px;
		width: 26px;
		left: 4px;
		bottom: 4px;
		background-color: white;
		transition: var(--transition-base);
		border-radius: 50%;
		box-shadow: var(--shadow-sm);
	}

	input:checked + .slider {
		background-color: var(--color-primary);
	}

	input:checked + .slider:before {
		transform: translateX(26px);
	}

	@media (max-width: 768px) {
		.settings-container {
			padding: var(--space-4) var(--space-2);
		}

		.setting-item {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--space-3);
		}

		.setting-info {
			margin-right: 0;
		}
	}
</style>
