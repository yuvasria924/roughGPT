<script>
	import { createEventDispatcher } from 'svelte';

	let { placeholder = "Search notes...", value = "" } = $props();
	let inputRef;
	let isFocused = $state(false);
	
	const dispatch = createEventDispatcher();

	function handleInput(event) {
		value = event.target.value;
		dispatch('search', { query: value });
	}

	function handleFocus() {
		isFocused = true;
	}

	function handleBlur() {
		isFocused = false;
	}

	function handleKeydown(event) {
		if (event.key === 'Escape') {
			inputRef.blur();
		}
	}
</script>

<div class="search-container" class:search-focused={isFocused}>
	<div class="search-wrapper">
		<!-- Magic sparkles around the search bar -->
		<div class="magic-sparkles">
			<div class="sparkle sparkle-1">✨</div>
			<div class="sparkle sparkle-2">🌟</div>
			<div class="sparkle sparkle-3">💫</div>
			<div class="sparkle sparkle-4">⭐</div>
			<div class="sparkle sparkle-5">✨</div>
			<div class="sparkle sparkle-6">🌟</div>
		</div>
		
		<!-- Gradient border animation -->
		<div class="gradient-border"></div>
		
		<div class="search-icon">
			<svg viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
			</svg>
		</div>
		
		<input
			bind:this={inputRef}
			type="text"
			class="search-input"
			placeholder={placeholder}
			{value}
			oninput={handleInput}
			onfocus={handleFocus}
			onblur={handleBlur}
			onkeydown={handleKeydown}
		/>
		
		{#if value}
			<button 
				class="clear-button"
				onclick={() => { value = ''; dispatch('search', { query: '' }); }}
			>
				<svg viewBox="0 0 20 20" fill="currentColor">
					<path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
				</svg>
			</button>
		{/if}
		
		<!-- Rainbow shimmer effect -->
		<div class="rainbow-shimmer"></div>
	</div>
</div>

<style>
	.search-container {
		position: fixed;
		top: var(--space-6);
		left: 50%;
		transform: translateX(-50%);
		z-index: 50;
		width: 100%;
		max-width: 600px;
		padding: 0 var(--space-4);
	}

	.search-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		background: linear-gradient(135deg, 
			rgba(255, 255, 255, 0.25) 0%,
			rgba(255, 182, 193, 0.15) 25%,
			rgba(221, 160, 221, 0.15) 50%,
			rgba(173, 216, 230, 0.15) 75%,
			rgba(255, 255, 255, 0.25) 100%
		);
		backdrop-filter: blur(25px);
		-webkit-backdrop-filter: blur(25px);
		border: 2px solid transparent;
		border-radius: var(--radius-2xl);
		padding: var(--space-4) var(--space-6);
		transition: all var(--transition-base);
		box-shadow: 
			0 8px 32px rgba(255, 182, 193, 0.2),
			0 4px 16px rgba(221, 160, 221, 0.1),
			inset 0 1px 0 rgba(255, 255, 255, 0.3);
		overflow: hidden;
	}

	[data-theme="dark"] .search-wrapper {
		background: linear-gradient(135deg, 
			rgba(15, 23, 42, 0.4) 0%,
			rgba(88, 28, 135, 0.2) 25%,
			rgba(30, 58, 138, 0.2) 50%,
			rgba(91, 33, 182, 0.2) 75%,
			rgba(15, 23, 42, 0.4) 100%
		);
		box-shadow: 
			0 8px 32px rgba(139, 92, 246, 0.3),
			0 4px 16px rgba(168, 85, 247, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
	}

	.gradient-border {
		position: absolute;
		top: -2px;
		left: -2px;
		right: -2px;
		bottom: -2px;
		background: linear-gradient(45deg, 
			#FF69B4, #9932CC, #4169E1, #FF69B4
		);
		border-radius: var(--radius-2xl);
		z-index: -1;
		opacity: 0;
		transition: opacity var(--transition-base);
		animation: gradientRotate 3s linear infinite;
	}

	.search-focused .gradient-border {
		opacity: 1;
	}

	@keyframes gradientRotate {
		0% {
			background: linear-gradient(45deg, #FF69B4, #9932CC, #4169E1, #FF69B4);
		}
		25% {
			background: linear-gradient(135deg, #9932CC, #4169E1, #FF69B4, #9932CC);
		}
		50% {
			background: linear-gradient(225deg, #4169E1, #FF69B4, #9932CC, #4169E1);
		}
		75% {
			background: linear-gradient(315deg, #FF69B4, #9932CC, #4169E1, #FF69B4);
		}
		100% {
			background: linear-gradient(45deg, #FF69B4, #9932CC, #4169E1, #FF69B4);
		}
	}

	.magic-sparkles {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		overflow: visible;
	}

	.sparkle {
		position: absolute;
		font-size: 1.2rem;
		animation: magicSparkle 4s infinite ease-in-out;
		opacity: 0;
		filter: drop-shadow(0 0 8px currentColor);
	}

	.sparkle-1 {
		top: -15px;
		left: 10%;
		animation-delay: 0s;
		color: #FF69B4;
	}

	.sparkle-2 {
		top: -20px;
		right: 15%;
		animation-delay: 0.8s;
		color: #9932CC;
	}

	.sparkle-3 {
		bottom: -15px;
		left: 20%;
		animation-delay: 1.6s;
		color: #4169E1;
	}

	.sparkle-4 {
		bottom: -20px;
		right: 25%;
		animation-delay: 2.4s;
		color: #FFB6C1;
	}

	.sparkle-5 {
		top: 50%;
		left: -25px;
		animation-delay: 3.2s;
		color: #DDA0DD;
	}

	.sparkle-6 {
		top: 50%;
		right: -25px;
		animation-delay: 1.2s;
		color: #87CEEB;
	}

	.search-focused .sparkle {
		animation-duration: 2s;
	}

	@keyframes magicSparkle {
		0%, 100% {
			opacity: 0;
			transform: translateY(0) scale(0.5) rotate(0deg);
		}
		50% {
			opacity: 1;
			transform: translateY(-10px) scale(1.2) rotate(180deg);
		}
	}

	.rainbow-shimmer {
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			90deg,
			transparent,
			rgba(255, 255, 255, 0.3),
			transparent
		);
		transition: left 0.8s ease;
	}

	.search-focused .rainbow-shimmer {
		left: 100%;
	}

	.search-icon {
		color: var(--text-secondary);
		width: 24px;
		height: 24px;
		margin-right: var(--space-3);
		flex-shrink: 0;
		transition: all var(--transition-base);
	}

	.search-focused .search-icon {
		color: #FF69B4;
		transform: scale(1.1);
		filter: drop-shadow(0 0 8px #FF69B4);
	}

	.search-input {
		flex: 1;
		border: none;
		background: transparent;
		color: var(--text-primary);
		font-size: var(--font-size-lg);
		font-family: inherit;
		font-weight: 500;
		outline: none;
		padding: 0;
	}

	.search-input::placeholder {
		color: var(--text-tertiary);
		font-weight: 400;
	}

	.search-focused .search-input::placeholder {
		color: rgba(255, 105, 180, 0.7);
	}

	.clear-button {
		background: none;
		border: none;
		color: var(--text-secondary);
		cursor: pointer;
		padding: var(--space-2);
		border-radius: var(--radius-full);
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: var(--space-2);
		transition: all var(--transition-base);
	}

	.clear-button:hover {
		color: #FF69B4;
		background: rgba(255, 105, 180, 0.1);
		transform: scale(1.1);
	}

	/* Magic glow effect when focused */
	.search-focused .search-wrapper {
		box-shadow: 
			0 0 30px rgba(255, 105, 180, 0.4),
			0 0 60px rgba(153, 50, 204, 0.3),
			0 8px 32px rgba(255, 182, 193, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.4);
		animation: kawaiPulse 2s ease-in-out infinite;
	}

	[data-theme="dark"] .search-focused .search-wrapper {
		box-shadow: 
			0 0 40px rgba(139, 92, 246, 0.5),
			0 0 80px rgba(168, 85, 247, 0.4),
			0 8px 32px rgba(139, 92, 246, 0.4),
			inset 0 1px 0 rgba(255, 255, 255, 0.2);
	}

	@keyframes kawaiPulse {
		0%, 100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.02);
		}
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.search-container {
			top: var(--space-4);
			padding: 0 var(--space-2);
			max-width: 500px;
		}

		.search-wrapper {
			padding: var(--space-3) var(--space-4);
		}

		.search-input {
			font-size: var(--font-size-base);
		}

		.sparkle {
			font-size: 1rem;
		}

		.magic-sparkles {
			overflow: hidden;
		}
	}

	/* Reduced motion accessibility */
	@media (prefers-reduced-motion: reduce) {
		.sparkle,
		.gradient-border,
		.rainbow-shimmer {
			animation: none;
		}

		.search-focused .search-wrapper {
			animation: none;
		}
	}
</style>
