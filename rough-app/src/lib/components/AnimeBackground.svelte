<script>
	let { opacity = 0.4 } = $props();
</script>

<div class="anime-background" style="--bg-opacity: {opacity}">
	<div class="gradient-background"></div>
	<div class="aurora-overlay"></div>
	
	<!-- Professional floating elements -->
	<div class="floating-elements">
		<div class="floating-shape crystal crystal-1">💎</div>
		<div class="floating-shape star star-1">✨</div>
		<div class="floating-shape bloom bloom-1">🌟</div>
		<div class="floating-shape crystal crystal-2">💫</div>
		<div class="floating-shape star star-2">⭐</div>
		<div class="floating-shape bloom bloom-2">✨</div>
		<div class="floating-shape crystal crystal-3">💎</div>
		<div class="floating-shape star star-3">🌟</div>
	</div>
	
	<!-- Gradient orbs for depth -->
	<div class="gradient-orbs">
		<div class="orb orb-1"></div>
		<div class="orb orb-2"></div>
		<div class="orb orb-3"></div>
		<div class="orb orb-4"></div>
		<div class="orb orb-5"></div>
		<div class="orb orb-6"></div>
	</div>

	<!-- Professional particle system -->
	<div class="particle-system">
		{#each Array(20) as _, i}
			<div class="particle particle-{i}" style="--delay: {i * 0.2}s; --duration: {3 + (i % 3)}s"></div>
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
			#FFE4E1 0%,    /* Soft pink */
			#E6E6FA 12%,   /* Lavender */
			#F0F8FF 24%,   /* Alice blue */
			#F5FFFA 36%,   /* Mint cream */
			#FFF8DC 48%,   /* Cornsilk */
			#FFEBCD 60%,   /* Blanched almond */
			#E0E6FF 72%,   /* Light periwinkle */
			#FFE4E6 84%,   /* Soft rose */
			#F0F4FF 100%   /* Ghost white */
		);
		animation: gradientFlow 15s ease-in-out infinite;
	}

	@keyframes gradientFlow {
		0%, 100% {
			background: linear-gradient(
				135deg,
				#FFE4E1 0%, #E6E6FA 12%, #F0F8FF 24%, #F5FFFA 36%, #FFF8DC 48%,
				#FFEBCD 60%, #E0E6FF 72%, #FFE4E6 84%, #F0F4FF 100%
			);
		}
		33% {
			background: linear-gradient(
				225deg,
				#F0F4FF 0%, #FFE4E6 12%, #E0E6FF 24%, #FFEBCD 36%, #FFF8DC 48%,
				#F5FFFA 60%, #F0F8FF 72%, #E6E6FA 84%, #FFE4E1 100%
			);
		}
		66% {
			background: linear-gradient(
				315deg,
				#E6E6FA 0%, #F0F8FF 12%, #F5FFFA 24%, #FFF8DC 36%, #FFEBCD 48%,
				#E0E6FF 60%, #FFE4E6 72%, #F0F4FF 84%, #FFE4E1 100%
			);
		}
	}

	.aurora-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			45deg,
			rgba(255, 105, 180, 0.1) 0%,
			rgba(138, 43, 226, 0.08) 25%,
			rgba(30, 144, 255, 0.06) 50%,
			rgba(255, 20, 147, 0.08) 75%,
			rgba(186, 85, 211, 0.1) 100%
		);
		animation: auroraShift 12s ease-in-out infinite;
		mix-blend-mode: soft-light;
	}

	@keyframes auroraShift {
		0%, 100% { opacity: 0.3; transform: translateX(0) scale(1); }
		50% { opacity: 0.6; transform: translateX(20px) scale(1.05); }
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
		font-size: 1.2rem;
		animation: elegantFloat 12s infinite ease-in-out;
		opacity: 0.7;
		filter: drop-shadow(0 0 8px rgba(255, 105, 180, 0.3));
	}

	/* Positioning for professional floating shapes */
	.crystal-1 { top: 15%; left: 20%; animation-delay: 0s; color: #FF69B4; }
	.star-1 { top: 25%; right: 25%; animation-delay: -2s; color: #9932CC; }
	.bloom-1 { top: 8%; left: 65%; animation-delay: -4s; color: #4169E1; }
	.crystal-2 { bottom: 30%; right: 20%; animation-delay: -6s; color: #FF1493; }
	.star-2 { bottom: 15%; left: 30%; animation-delay: -8s; color: #8A2BE2; }
	.bloom-2 { top: 45%; right: 15%; animation-delay: -10s; color: #00BFFF; }
	.crystal-3 { bottom: 40%; left: 75%; animation-delay: -12s; color: #DA70D6; }
	.star-3 { top: 60%; left: 10%; animation-delay: -14s; color: #FF6347; }

	@keyframes elegantFloat {
		0% {
			transform: translateY(0px) rotate(0deg) scale(1);
			opacity: 0.7;
		}
		25% {
			transform: translateY(-15px) rotate(90deg) scale(1.1);
			opacity: 0.9;
		}
		50% {
			transform: translateY(0px) rotate(180deg) scale(1);
			opacity: 0.6;
		}
		75% {
			transform: translateY(-10px) rotate(270deg) scale(0.9);
			opacity: 0.8;
		}
		100% {
			transform: translateY(0px) rotate(360deg) scale(1);
			opacity: 0.7;
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
		filter: blur(60px);
		opacity: 0.4;
		animation: orbDance 20s infinite ease-in-out;
	}

	.orb-1 {
		width: 180px;
		height: 180px;
		background: radial-gradient(circle, #FF69B4, #FF1493);
		top: 12%;
		left: 25%;
		animation-delay: 0s;
	}

	.orb-2 {
		width: 240px;
		height: 240px;
		background: radial-gradient(circle, #9932CC, #8A2BE2);
		top: 55%;
		right: 15%;
		animation-delay: -6s;
	}

	.orb-3 {
		width: 120px;
		height: 120px;
		background: radial-gradient(circle, #00BFFF, #1E90FF);
		bottom: 25%;
		left: 15%;
		animation-delay: -12s;
	}

	.orb-4 {
		width: 200px;
		height: 200px;
		background: radial-gradient(circle, #FF1493, #FF69B4);
		top: 35%;
		right: 35%;
		animation-delay: -18s;
	}

	.orb-5 {
		width: 160px;
		height: 160px;
		background: radial-gradient(circle, #DA70D6, #DDA0DD);
		bottom: 35%;
		left: 55%;
		animation-delay: -24s;
	}

	.orb-6 {
		width: 140px;
		height: 140px;
		background: radial-gradient(circle, #4169E1, #6495ED);
		top: 70%;
		right: 60%;
		animation-delay: -30s;
	}

	@keyframes orbDance {
		0%, 100% {
			transform: translate(0, 0) scale(1);
		}
		25% {
			transform: translate(25px, -40px) scale(1.1);
		}
		50% {
			transform: translate(-15px, -25px) scale(0.9);
		}
		75% {
			transform: translate(35px, 15px) scale(1.05);
		}
	}

	.particle-system {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.particle {
		position: absolute;
		width: 3px;
		height: 3px;
		background: linear-gradient(45deg, #FFD700, #FFF);
		border-radius: 50%;
		animation: sparkleParticle var(--duration) infinite ease-in-out;
		animation-delay: var(--delay);
		box-shadow: 0 0 6px currentColor;
	}

	.particle:nth-child(3n) {
		background: linear-gradient(45deg, #FF69B4, #FFF);
	}

	.particle:nth-child(3n+1) {
		background: linear-gradient(45deg, #9932CC, #FFF);
	}

	.particle:nth-child(3n+2) {
		background: linear-gradient(45deg, #4169E1, #FFF);
	}

	/* Random positioning for particles */
	.particle-0 { top: 20%; left: 30%; }
	.particle-1 { top: 75%; left: 65%; }
	.particle-2 { top: 35%; left: 85%; }
	.particle-3 { top: 55%; left: 10%; }
	.particle-4 { top: 12%; left: 55%; }
	.particle-5 { top: 40%; left: 90%; }
	.particle-6 { top: 65%; left: 45%; }
	.particle-7 { top: 30%; left: 5%; }
	.particle-8 { top: 85%; left: 25%; }
	.particle-9 { top: 8%; left: 70%; }
	.particle-10 { top: 50%; left: 70%; }
	.particle-11 { top: 80%; left: 80%; }
	.particle-12 { top: 25%; left: 15%; }
	.particle-13 { top: 60%; left: 95%; }
	.particle-14 { top: 90%; left: 50%; }
	.particle-15 { top: 18%; left: 40%; }
	.particle-16 { top: 72%; left: 20%; }
	.particle-17 { top: 42%; left: 60%; }
	.particle-18 { top: 88%; left: 35%; }
	.particle-19 { top: 15%; left: 80%; }

	@keyframes sparkleParticle {
		0%, 100% {
			opacity: 0;
			transform: scale(0) rotate(0deg);
		}
		50% {
			opacity: 1;
			transform: scale(1.2) rotate(180deg);
		}
	}

	/* Dark mode adjustments */
	[data-theme="dark"] .gradient-background {
		background: linear-gradient(
			135deg,
			#2D1B69 0%, #1E3A8A 15%, #065F46 30%, #7C2D12 45%,
			#BE185D 60%, #581C87 75%, #1E40AF 90%, #0F172A 100%
		);
		opacity: 0.8;
	}

	[data-theme="dark"] .aurora-overlay {
		opacity: 0.4;
	}

	[data-theme="dark"] .floating-shape {
		filter: drop-shadow(0 0 12px rgba(255, 105, 180, 0.6));
	}

	[data-theme="dark"] .orb {
		opacity: 0.3;
	}

	/* Reduce motion for accessibility */
	@media (prefers-reduced-motion: reduce) {
		.floating-shape,
		.orb,
		.particle,
		.gradient-background,
		.aurora-overlay {
			animation-duration: 60s;
		}
	}

	/* Mobile optimizations */
	@media (max-width: 768px) {
		.floating-shape {
			font-size: 1rem;
		}
		
		.orb {
			width: 60% !important;
			height: 60% !important;
			filter: blur(30px);
		}
		
		.particle {
			width: 2px;
			height: 2px;
		}
	}
</style>
