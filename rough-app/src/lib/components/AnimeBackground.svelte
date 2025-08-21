<script>
	let { opacity = 0.4 } = $props();
</script>

<div class="anime-background" style="--bg-opacity: {opacity}">
	<div class="gradient-background"></div>
	<div class="floating-elements">
		<!-- Kawaii floating shapes -->
		<div class="floating-shape heart heart-1">💖</div>
		<div class="floating-shape star star-1">✨</div>
		<div class="floating-shape cloud cloud-1">☁️</div>
		<div class="floating-shape sparkle sparkle-1">🌟</div>
		<div class="floating-shape heart heart-2">💕</div>
		<div class="floating-shape star star-2">⭐</div>
		<div class="floating-shape rainbow rainbow-1">🌈</div>
		<div class="floating-shape flower flower-1">🌸</div>
		<div class="floating-shape star star-3">✨</div>
		<div class="floating-shape cloud cloud-2">☁️</div>
		<div class="floating-shape sparkle sparkle-2">💫</div>
		<div class="floating-shape flower flower-2">🌺</div>
	</div>
	
	<div class="gradient-orbs">
		<div class="orb orb-1"></div>
		<div class="orb orb-2"></div>
		<div class="orb orb-3"></div>
		<div class="orb orb-4"></div>
		<div class="orb orb-5"></div>
	</div>

	<div class="sparkle-particles">
		{#each Array(15) as _, i}
			<div class="particle particle-{i}" style="--delay: {i * 0.3}s"></div>
		{/each}
	</div>
</div>

<style>
	.anime-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		overflow: hidden;
	}

	.gradient-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			135deg,
			#FFE4E6 0%,   /* Soft pink */
			#E0E7FF 15%,  /* Light lavender */
			#F0F9FF 30%,  /* Sky blue */
			#ECFDF5 45%,  /* Mint green */
			#FEF3C7 60%,  /* Soft yellow */
			#FCE7F3 75%,  /* Pink */
			#EDE9FE 90%,  /* Purple */
			#DBEAFE 100%  /* Blue */
		);
		animation: gradientShift 20s ease-in-out infinite;
	}

	@keyframes gradientShift {
		0%, 100% {
			background: linear-gradient(
				135deg,
				#FFE4E6 0%,
				#E0E7FF 15%,
				#F0F9FF 30%,
				#ECFDF5 45%,
				#FEF3C7 60%,
				#FCE7F3 75%,
				#EDE9FE 90%,
				#DBEAFE 100%
			);
		}
		50% {
			background: linear-gradient(
				225deg,
				#DBEAFE 0%,
				#EDE9FE 15%,
				#FCE7F3 30%,
				#FEF3C7 45%,
				#ECFDF5 60%,
				#F0F9FF 75%,
				#E0E7FF 90%,
				#FFE4E6 100%
			);
		}
	}

	.floating-elements {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.floating-shape {
		position: absolute;
		font-size: 1.5rem;
		animation: kawaiFloat 15s infinite linear;
		opacity: 0.8;
		filter: drop-shadow(0 0 10px rgba(255, 192, 203, 0.5));
	}

	/* Positioning for floating shapes */
	.heart-1 { top: 10%; left: 15%; animation-delay: 0s; }
	.star-1 { top: 20%; right: 20%; animation-delay: -2s; }
	.cloud-1 { top: 5%; left: 60%; animation-delay: -4s; }
	.sparkle-1 { top: 30%; left: 10%; animation-delay: -6s; }
	.heart-2 { bottom: 25%; right: 15%; animation-delay: -8s; }
	.star-2 { bottom: 10%; left: 25%; animation-delay: -10s; }
	.rainbow-1 { top: 15%; left: 80%; animation-delay: -12s; }
	.flower-1 { bottom: 30%; left: 70%; animation-delay: -14s; }
	.star-3 { top: 60%; right: 10%; animation-delay: -16s; }
	.cloud-2 { bottom: 15%; right: 60%; animation-delay: -18s; }
	.sparkle-2 { top: 45%; left: 30%; animation-delay: -20s; }
	.flower-2 { top: 70%; right: 40%; animation-delay: -22s; }

	@keyframes kawaiFloat {
		0% {
			transform: translateY(0px) rotate(0deg) scale(1);
		}
		25% {
			transform: translateY(-20px) rotate(90deg) scale(1.1);
		}
		50% {
			transform: translateY(0px) rotate(180deg) scale(1);
		}
		75% {
			transform: translateY(-15px) rotate(270deg) scale(0.9);
		}
		100% {
			transform: translateY(0px) rotate(360deg) scale(1);
		}
	}

	.gradient-orbs {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.6;
		animation: orbFloat 25s infinite ease-in-out;
	}

	.orb-1 {
		width: 200px;
		height: 200px;
		background: linear-gradient(45deg, #FF69B4, #FF1493);
		top: 10%;
		left: 20%;
		animation-delay: 0s;
	}

	.orb-2 {
		width: 300px;
		height: 300px;
		background: linear-gradient(45deg, #9932CC, #8A2BE2);
		top: 60%;
		right: 10%;
		animation-delay: -8s;
	}

	.orb-3 {
		width: 150px;
		height: 150px;
		background: linear-gradient(45deg, #00BFFF, #1E90FF);
		bottom: 20%;
		left: 10%;
		animation-delay: -16s;
	}

	.orb-4 {
		width: 250px;
		height: 250px;
		background: linear-gradient(45deg, #FFB6C1, #FFC0CB);
		top: 30%;
		right: 30%;
		animation-delay: -24s;
	}

	.orb-5 {
		width: 180px;
		height: 180px;
		background: linear-gradient(45deg, #DDA0DD, #DA70D6);
		bottom: 40%;
		left: 60%;
		animation-delay: -32s;
	}

	@keyframes orbFloat {
		0%, 100% {
			transform: translate(0, 0) scale(1);
		}
		25% {
			transform: translate(30px, -50px) scale(1.2);
		}
		50% {
			transform: translate(-20px, -30px) scale(0.8);
		}
		75% {
			transform: translate(40px, 20px) scale(1.1);
		}
	}

	.sparkle-particles {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.particle {
		position: absolute;
		width: 4px;
		height: 4px;
		background: linear-gradient(45deg, #FFD700, #FFF);
		border-radius: 50%;
		animation: sparkle 3s infinite ease-in-out;
		animation-delay: var(--delay);
	}

	.particle:nth-child(odd) {
		background: linear-gradient(45deg, #FF69B4, #FFF);
	}

	.particle:nth-child(3n) {
		background: linear-gradient(45deg, #9932CC, #FFF);
	}

	/* Random positioning for particles */
	.particle-0 { top: 15%; left: 25%; }
	.particle-1 { top: 80%; left: 70%; }
	.particle-2 { top: 30%; left: 80%; }
	.particle-3 { top: 60%; left: 15%; }
	.particle-4 { top: 10%; left: 50%; }
	.particle-5 { top: 45%; left: 90%; }
	.particle-6 { top: 70%; left: 40%; }
	.particle-7 { top: 25%; left: 10%; }
	.particle-8 { top: 90%; left: 30%; }
	.particle-9 { top: 5%; left: 75%; }
	.particle-10 { top: 55%; left: 60%; }
	.particle-11 { top: 85%; left: 85%; }
	.particle-12 { top: 35%; left: 5%; }
	.particle-13 { top: 65%; left: 95%; }
	.particle-14 { top: 95%; left: 55%; }

	@keyframes sparkle {
		0%, 100% {
			opacity: 0;
			transform: scale(0);
		}
		50% {
			opacity: 1;
			transform: scale(1);
		}
	}

	/* Dark mode adjustments */
	[data-theme="dark"] .gradient-background {
		opacity: 0.7;
		background: linear-gradient(
			135deg,
			#2D1B69 0%,   /* Deep purple */
			#1E3A8A 15%,  /* Dark blue */
			#065F46 30%,  /* Dark green */
			#7C2D12 45%,  /* Dark orange */
			#BE185D 60%,  /* Dark pink */
			#581C87 75%,  /* Dark purple */
			#1E40AF 90%,  /* Dark blue */
			#0F172A 100% /* Dark slate */
		);
	}

	[data-theme="dark"] .floating-shape {
		filter: drop-shadow(0 0 15px rgba(255, 192, 203, 0.8));
	}

	[data-theme="dark"] .orb {
		opacity: 0.4;
	}

	/* Reduce motion for accessibility */
	@media (prefers-reduced-motion: reduce) {
		.floating-shape,
		.orb,
		.particle {
			animation-duration: 60s;
		}
		
		.gradient-background {
			animation: none;
		}
	}

	/* Mobile optimizations */
	@media (max-width: 768px) {
		.floating-shape {
			font-size: 1rem;
		}
		
		.orb {
			width: 50% !important;
			height: 50% !important;
			filter: blur(40px);
		}
		
		.particle {
			width: 2px;
			height: 2px;
		}
	}
</style>
