<script>
  /**
   * @typedef {'sm' | 'md' | 'lg' | 'xl'} CardSize
   * @typedef {'default' | 'elevated' | 'outlined' | 'anime' | 'kawaii'} CardVariant
   */

  /**
   * @type {CardSize}
   */
  let size = 'md';
  
  /**
   * @type {CardVariant}
   */
  let variant = 'default';
  
  /**
   * @type {boolean}
   */
  let hoverable = false;
  
  /**
   * @type {string}
   */
  let customClass = '';

  let { children, onclick, ...props } = $props();

  // Derive clickable from the presence of onclick handler
  let clickable = $derived(!!onclick);
</script>

<div
  class="card card-{size} card-{variant} {hoverable ? 'card-hoverable' : ''} {clickable ? 'card-clickable' : ''} {customClass} fade-in"
  onclick={onclick}
  {...props}
  role={clickable ? 'button' : undefined}
  tabindex={clickable ? 0 : -1}
>
  <!-- Anime sparkles for special variants -->
  {#if variant === 'anime' || variant === 'kawaii'}
    <div class="card-sparkles">
      <div class="card-sparkle sparkle-1">✨</div>
      <div class="card-sparkle sparkle-2">🌟</div>
      <div class="card-sparkle sparkle-3">💫</div>
      <div class="card-sparkle sparkle-4">⭐</div>
    </div>
  {/if}

  <!-- Rainbow border for anime variant -->
  {#if variant === 'anime'}
    <div class="rainbow-border"></div>
  {/if}

  <!-- Content -->
  {@render children()}

  <!-- Shimmer effect -->
  <div class="card-shimmer"></div>
</div>

<style>
  .card {
    display: flex;
    flex-direction: column;
    padding: var(--space-4);
    border-radius: var(--radius-xl);
    border: 2px solid rgba(255, 255, 255, 0.3);
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.25) 0%,
      rgba(255, 182, 193, 0.1) 25%,
      rgba(221, 160, 221, 0.1) 50%,
      rgba(173, 216, 230, 0.1) 75%,
      rgba(255, 255, 255, 0.2) 100%
    );
    backdrop-filter: blur(25px);
    -webkit-backdrop-filter: blur(25px);
    box-shadow: 
      0 8px 32px rgba(255, 182, 193, 0.15),
      0 4px 16px rgba(221, 160, 221, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
    transition: all var(--transition-base);
    position: relative;
    overflow: hidden;
  }

  [data-theme="dark"] .card {
    background: linear-gradient(135deg, 
      rgba(15, 23, 42, 0.4) 0%,
      rgba(88, 28, 135, 0.15) 25%,
      rgba(30, 58, 138, 0.15) 50%,
      rgba(91, 33, 182, 0.15) 75%,
      rgba(15, 23, 42, 0.3) 100%
    );
    border: 2px solid rgba(255, 255, 255, 0.15);
    box-shadow: 
      0 8px 32px rgba(139, 92, 246, 0.2),
      0 4px 16px rgba(168, 85, 247, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  /* Sizes */
  .card-sm {
    padding: var(--space-3);
    border-radius: var(--radius-lg);
  }

  .card-md {
    padding: var(--space-4);
  }

  .card-lg {
    padding: var(--space-6);
  }

  .card-xl {
    padding: var(--space-8);
  }

  /* Enhanced Variants */
  .card-default {
    /* Uses the base glassmorphism styling above */
  }

  .card-elevated {
    box-shadow: 
      0 20px 40px rgba(255, 182, 193, 0.2),
      0 12px 24px rgba(221, 160, 221, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
    border: 2px solid rgba(255, 255, 255, 0.4);
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 182, 193, 0.15) 50%,
      rgba(255, 255, 255, 0.25) 100%
    );
  }

  [data-theme="dark"] .card-elevated {
    background: linear-gradient(135deg, 
      rgba(15, 23, 42, 0.5) 0%,
      rgba(88, 28, 135, 0.2) 50%,
      rgba(15, 23, 42, 0.4) 100%
    );
    border: 2px solid rgba(255, 255, 255, 0.2);
    box-shadow: 
      0 20px 40px rgba(139, 92, 246, 0.25),
      0 12px 24px rgba(168, 85, 247, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }

  .card-outlined {
    border: 3px solid transparent;
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 182, 193, 0.1) 50%,
      rgba(255, 255, 255, 0.15) 100%
    );
    position: relative;
  }

  .card-outlined::before {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    background: linear-gradient(45deg, #FF69B4, #9932CC, #4169E1, #FFB6C1);
    border-radius: var(--radius-xl);
    z-index: -1;
    animation: borderRotate 3s linear infinite;
  }

  @keyframes borderRotate {
    0% {
      background: linear-gradient(45deg, #FF69B4, #9932CC, #4169E1, #FFB6C1);
    }
    25% {
      background: linear-gradient(135deg, #9932CC, #4169E1, #FFB6C1, #FF69B4);
    }
    50% {
      background: linear-gradient(225deg, #4169E1, #FFB6C1, #FF69B4, #9932CC);
    }
    75% {
      background: linear-gradient(315deg, #FFB6C1, #FF69B4, #9932CC, #4169E1);
    }
    100% {
      background: linear-gradient(45deg, #FF69B4, #9932CC, #4169E1, #FFB6C1);
    }
  }

  /* NEW: Anime Variant */
  .card-anime {
    background: linear-gradient(135deg, 
      rgba(255, 105, 180, 0.2) 0%,
      rgba(153, 50, 204, 0.15) 25%,
      rgba(65, 105, 225, 0.15) 50%,
      rgba(255, 182, 193, 0.1) 75%,
      rgba(221, 160, 221, 0.15) 100%
    );
    border: 2px solid rgba(255, 105, 180, 0.4);
    box-shadow: 
      0 0 30px rgba(255, 105, 180, 0.3),
      0 8px 32px rgba(153, 50, 204, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
    position: relative;
  }

  [data-theme="dark"] .card-anime {
    background: linear-gradient(135deg, 
      rgba(88, 28, 135, 0.3) 0%,
      rgba(30, 58, 138, 0.25) 25%,
      rgba(91, 33, 182, 0.25) 50%,
      rgba(139, 92, 246, 0.2) 75%,
      rgba(168, 85, 247, 0.2) 100%
    );
    border: 2px solid rgba(139, 92, 246, 0.4);
    box-shadow: 
      0 0 40px rgba(139, 92, 246, 0.4),
      0 8px 32px rgba(168, 85, 247, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  .rainbow-border {
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, 
      #FF69B4, #9932CC, #4169E1, #00BFFF, #FF69B4
    );
    border-radius: var(--radius-xl);
    z-index: -1;
    animation: rainbowPulse 4s ease-in-out infinite;
  }

  @keyframes rainbowPulse {
    0%, 100% {
      opacity: 0.6;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.02);
    }
  }

  /* NEW: Kawaii Variant */
  .card-kawaii {
    background: linear-gradient(135deg, 
      rgba(255, 240, 245, 0.4) 0%,
      rgba(255, 218, 185, 0.3) 25%,
      rgba(221, 160, 221, 0.3) 50%,
      rgba(173, 216, 230, 0.3) 75%,
      rgba(255, 240, 245, 0.4) 100%
    );
    border: 2px solid rgba(255, 182, 193, 0.5);
    box-shadow: 
      0 8px 25px rgba(255, 182, 193, 0.3),
      0 4px 15px rgba(221, 160, 221, 0.2),
      inset 0 2px 0 rgba(255, 255, 255, 0.6);
    border-radius: var(--radius-2xl);
  }

  [data-theme="dark"] .card-kawaii {
    background: linear-gradient(135deg, 
      rgba(88, 28, 135, 0.2) 0%,
      rgba(147, 51, 234, 0.15) 25%,
      rgba(168, 85, 247, 0.15) 50%,
      rgba(196, 181, 253, 0.1) 75%,
      rgba(88, 28, 135, 0.2) 100%
    );
    border: 2px solid rgba(196, 181, 253, 0.4);
    box-shadow: 
      0 8px 25px rgba(139, 92, 246, 0.3),
      0 4px 15px rgba(168, 85, 247, 0.2),
      inset 0 2px 0 rgba(255, 255, 255, 0.15);
  }

  /* Sparkles */
  .card-sparkles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
  }

  .card-sparkle {
    position: absolute;
    font-size: 1rem;
    animation: cardSparkle 6s infinite ease-in-out;
    opacity: 0;
  }

  .sparkle-1 {
    top: 15%;
    left: 20%;
    color: #FF69B4;
    animation-delay: 0s;
  }

  .sparkle-2 {
    top: 25%;
    right: 15%;
    color: #9932CC;
    animation-delay: 1.5s;
  }

  .sparkle-3 {
    bottom: 20%;
    left: 25%;
    color: #4169E1;
    animation-delay: 3s;
  }

  .sparkle-4 {
    bottom: 30%;
    right: 20%;
    color: #FFB6C1;
    animation-delay: 4.5s;
  }

  @keyframes cardSparkle {
    0%, 100% {
      opacity: 0;
      transform: scale(0.5) rotate(0deg);
    }
    50% {
      opacity: 1;
      transform: scale(1.2) rotate(180deg);
    }
  }

  /* Interactive States */
  .card-hoverable:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow: 
      0 20px 40px rgba(255, 182, 193, 0.25),
      0 12px 24px rgba(221, 160, 221, 0.2),
      0 0 30px rgba(255, 105, 180, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.6);
    border-color: #FF69B4;
  }

  [data-theme="dark"] .card-hoverable:hover {
    box-shadow: 
      0 20px 40px rgba(139, 92, 246, 0.3),
      0 12px 24px rgba(168, 85, 247, 0.25),
      0 0 40px rgba(139, 92, 246, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    border-color: #8B5CF6;
  }

  .card-anime:hover .card-sparkle {
    animation-duration: 2s;
  }

  .card-kawaii:hover {
    transform: translateY(-6px) scale(1.02);
    animation: kawaiiBounce 0.6s ease-in-out;
  }

  @keyframes kawaiiBounce {
    0%, 100% {
      transform: translateY(-6px) scale(1.02);
    }
    50% {
      transform: translateY(-10px) scale(1.04);
    }
  }

  .card-clickable {
    cursor: pointer;
    user-select: none;
  }

  .card-clickable:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 
      0 15px 30px rgba(255, 182, 193, 0.2),
      0 8px 20px rgba(221, 160, 221, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
  }

  .card-clickable:active {
    transform: translateY(-2px) scale(1.01);
    box-shadow: 
      0 8px 16px rgba(255, 182, 193, 0.15),
      0 4px 10px rgba(221, 160, 221, 0.1);
  }

  /* Shimmer Effect */
  .card-shimmer {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.8s ease;
    pointer-events: none;
  }

  .card:hover .card-shimmer {
    left: 100%;
  }

  /* Focus styles */
  .card-clickable:focus {
    outline: 3px solid rgba(255, 105, 180, 0.6);
    outline-offset: 3px;
  }

  /* Animation on mount */
  .card {
    animation: slideUp var(--transition-slow) ease-out;
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .card-sparkle,
    .rainbow-border,
    .card-shimmer {
      animation: none;
    }
    
    .card-hoverable:hover,
    .card-kawaii:hover {
      animation: none;
    }
  }

  /* Mobile optimizations */
  @media (max-width: 768px) {
    .card-sparkle {
      font-size: 0.8rem;
    }
    
    .card-hoverable:hover,
    .card-clickable:hover {
      transform: translateY(-4px) scale(1.01);
    }
  }
</style>
