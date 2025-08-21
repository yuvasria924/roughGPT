<script>
	let { opacity = 0.3 } = $props();
</script>

<div class="background" style="--bg-opacity: {opacity}">
	<div class="gradient-overlay"></div>
	<div class="floating-elements">
		<div class="floating-circle circle-1"></div>
		<div class="floating-circle circle-2"></div>
		<div class="floating-circle circle-3"></div>
		<div class="floating-circle circle-4"></div>
		<div class="floating-circle circle-5"></div>
	</div>
</div>

<style>
	.background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		overflow: hidden;
	}

	.gradient-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			135deg,
			rgba(255, 255, 255, 0.8) 0%,
			rgba(248, 250, 252, 0.6) 25%,
			rgba(241, 245, 249, 0.7) 50%,
			rgba(226, 232, 240, 0.6) 75%,
			rgba(255, 255, 255, 0.8) 100%
		);
		opacity: var(--bg-opacity);
	}

	[data-theme="dark"] .gradient-overlay {
		background: linear-gradient(
			135deg,
			rgba(15, 23, 42, 0.9) 0%,
			rgba(30, 41, 59, 0.8) 25%,
			rgba(51, 65, 85, 0.7) 50%,
			rgba(71, 85, 105, 0.8) 75%,
			rgba(15, 23, 42, 0.9) 100%
		);
	}

	.floating-elements {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.floating-circle {
		position: absolute;
		border-radius: 50%;
		background: linear-gradient(45deg, rgba(37, 99, 235, 0.1), rgba(245, 158, 11, 0.1));
		animation: float 20s infinite linear;
	}

	.circle-1 {
		width: 80px;
		height: 80px;
		top: 10%;
		left: 10%;
		animation-delay: 0s;
	}

	.circle-2 {
		width: 120px;
		height: 120px;
		top: 20%;
		right: 15%;
		animation-delay: -5s;
	}

	.circle-3 {
		width: 60px;
		height: 60px;
		bottom: 30%;
		left: 20%;
		animation-delay: -10s;
	}

	.circle-4 {
		width: 100px;
		height: 100px;
		bottom: 20%;
		right: 10%;
		animation-delay: -15s;
	}

	.circle-5 {
		width: 40px;
		height: 40px;
		top: 50%;
		left: 50%;
		animation-delay: -7s;
	}

	@keyframes float {
		0% {
			transform: translateY(0px) rotate(0deg);
			opacity: 0.7;
		}
		33% {
			transform: translateY(-30px) rotate(120deg);
			opacity: 0.4;
		}
		66% {
			transform: translateY(30px) rotate(240deg);
			opacity: 0.7;
		}
		100% {
			transform: translateY(0px) rotate(360deg);
			opacity: 0.7;
		}
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.floating-circle {
			opacity: 0.5;
		}
		
		.circle-1, .circle-2, .circle-3, .circle-4, .circle-5 {
			width: 30px;
			height: 30px;
		}
	}
</style>
