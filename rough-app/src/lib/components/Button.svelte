<script>
  /**
   * @typedef {'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'anime-gradient' | 'elegant'} ButtonVariant
   * @typedef {'sm' | 'md' | 'lg'} ButtonSize
   */

  /**
   * @type {ButtonVariant}
   */
  let variant = 'primary';
  
  /**
   * @type {ButtonSize}
   */
  let size = 'md';
  
  /**
   * @type {boolean}
   */
  let disabled = false;
  
  /**
   * @type {boolean}
   */
  let loading = false;
  
  /**
   * @type {boolean}
   */
  let fullWidth = false;
  
  /**
   * @type {string}
   */
  let customClass = '';

  let { children, onclick, ...props } = $props();
</script>

<button
  class="btn btn-{variant} btn-{size} {fullWidth ? 'btn-full-width' : ''} {loading ? 'btn-loading' : ''} {customClass}"
  {disabled}
  onclick={onclick}
  {...props}
>
  {#if loading}
    <div class="btn-spinner" aria-hidden="true"></div>
  {/if}
  <span class="btn-content" class:btn-content-loading={loading}>
    {@render children()}
  </span>
  
  <!-- Professional sparkle effects for anime buttons -->
  {#if variant === 'anime-gradient' || variant === 'elegant'}
    <div class="btn-sparkles">
      <div class="sparkle sparkle-1">✨</div>
      <div class="sparkle sparkle-2">⭐</div>
      <div class="sparkle sparkle-3">💫</div>
    </div>
  {/if}
</button>

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    border: none;
    border-radius: var(--radius-xl);
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: all var(--transition-base);
    position: relative;
    white-space: nowrap;
    font-family: inherit;
    overflow: hidden;
  }

  .btn:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  /* Sizes */
  .btn-sm {
    padding: var(--space-2) var(--space-4);
    font-size: var(--font-size-sm);
    min-height: 2.5rem;
    border-radius: var(--radius-lg);
  }

  .btn-md {
    padding: var(--space-3) var(--space-6);
    font-size: var(--font-size-base);
    min-height: 3rem;
  }

  .btn-lg {
    padding: var(--space-4) var(--space-8);
    font-size: var(--font-size-lg);
    min-height: 3.5rem;
  }

  /* Original Variants */
  .btn-primary {
    background-color: var(--color-primary);
    color: var(--text-inverse);
    box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
  }

  .btn-primary:hover:not(:disabled) {
    background-color: var(--color-primary-hover);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);
  }

  .btn-secondary {
    background: rgba(255, 255, 255, 0.15);
    color: var(--text-primary);
    border: 1px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
  }

  .btn-secondary:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.25);
    border-color: var(--color-primary);
    transform: translateY(-2px);
  }

  .btn-outline {
    background-color: transparent;
    color: var(--color-primary);
    border: 2px solid var(--color-primary);
  }

  .btn-outline:hover:not(:disabled) {
    background-color: var(--color-primary);
    color: var(--text-inverse);
    transform: translateY(-2px);
  }

  .btn-ghost {
    background-color: transparent;
    color: var(--text-secondary);
  }

  .btn-ghost:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-primary);
  }

  .btn-danger {
    background-color: var(--color-error);
    color: var(--text-inverse);
    box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
  }

  .btn-danger:hover:not(:disabled) {
    background-color: #dc2626;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(239, 68, 68, 0.4);
  }

  /* NEW: Professional Anime Gradient Button (Pink → Purple → Blue) */
  .btn-anime-gradient {
    background: linear-gradient(135deg, #FF69B4 0%, #9932CC 50%, #4169E1 100%);
    color: white;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    box-shadow: 
      0 8px 32px rgba(255, 105, 180, 0.3),
      0 4px 16px rgba(153, 50, 204, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    position: relative;
  }

  .btn-anime-gradient::before {
    content: '';
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
    transition: left 0.6s;
  }

  .btn-anime-gradient:hover:not(:disabled) {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 
      0 12px 40px rgba(255, 105, 180, 0.4),
      0 8px 25px rgba(153, 50, 204, 0.35),
      0 0 30px rgba(65, 105, 225, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    animation: professionalGlow 2s ease-in-out infinite;
    background: linear-gradient(135deg, #FF1493 0%, #8A2BE2 50%, #1E90FF 100%);
  }

  .btn-anime-gradient:hover::before {
    left: 100%;
  }

  /* NEW: Elegant Pastel Button */
  .btn-elegant {
    background: linear-gradient(135deg, 
      rgba(255, 182, 193, 0.8) 0%,
      rgba(221, 160, 221, 0.8) 50%,
      rgba(173, 216, 230, 0.8) 100%
    );
    color: #4A5568;
    font-weight: 600;
    border: 2px solid rgba(255, 255, 255, 0.6);
    box-shadow: 
      0 6px 20px rgba(255, 182, 193, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
  }

  .btn-elegant:hover:not(:disabled) {
    transform: translateY(-2px) scale(1.01);
    background: linear-gradient(135deg, 
      rgba(255, 192, 203, 0.9) 0%,
      rgba(230, 230, 250, 0.9) 50%,
      rgba(175, 238, 238, 0.9) 100%
    );
    box-shadow: 
      0 10px 30px rgba(255, 182, 193, 0.4),
      0 0 20px rgba(221, 160, 221, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.7);
    border-color: rgba(255, 105, 180, 0.6);
  }

  @keyframes professionalGlow {
    0%, 100% {
      filter: brightness(1) saturate(1);
    }
    50% {
      filter: brightness(1.1) saturate(1.15);
    }
  }

  /* Sparkle Effects */
  .btn-sparkles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
  }

  .sparkle {
    position: absolute;
    font-size: 0.7rem;
    animation: professionalSparkle 3s infinite ease-in-out;
    opacity: 0;
  }

  .sparkle-1 {
    top: 20%;
    left: 25%;
    animation-delay: 0s;
  }

  .sparkle-2 {
    top: 60%;
    right: 25%;
    animation-delay: 1s;
  }

  .sparkle-3 {
    bottom: 25%;
    left: 60%;
    animation-delay: 2s;
  }

  @keyframes professionalSparkle {
    0%, 100% {
      opacity: 0;
      transform: translateY(0) scale(0.6);
    }
    50% {
      opacity: 0.8;
      transform: translateY(-8px) scale(1);
    }
  }

  /* Enhanced interaction for anime buttons */
  .btn-anime-gradient:active:not(:disabled) {
    transform: translateY(-1px) scale(0.98);
  }

  .btn-elegant:active:not(:disabled) {
    transform: translateY(-1px) scale(0.99);
  }

  /* Full width */
  .btn-full-width {
    width: 100%;
  }

  /* Loading state */
  .btn-loading {
    pointer-events: none;
  }

  .btn-content-loading {
    opacity: 0.7;
  }

  .btn-spinner {
    position: absolute;
    width: 1rem;
    height: 1rem;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Focus styles */
  .btn:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.8);
    outline-offset: 2px;
  }

  .btn-anime-gradient:focus-visible,
  .btn-elegant:focus-visible {
    outline: 3px solid rgba(255, 105, 180, 0.6);
    outline-offset: 3px;
  }

  /* Active state */
  .btn:active:not(:disabled) {
    transform: translateY(-1px);
  }

  /* Dark mode adjustments */
  [data-theme="dark"] .btn-secondary {
    background: rgba(15, 23, 42, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  [data-theme="dark"] .btn-secondary:hover:not(:disabled) {
    background: rgba(15, 23, 42, 0.6);
  }

  [data-theme="dark"] .btn-elegant {
    color: #E2E8F0;
    background: linear-gradient(135deg, 
      rgba(139, 92, 246, 0.2) 0%,
      rgba(168, 85, 247, 0.2) 50%,
      rgba(196, 181, 253, 0.2) 100%
    );
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .btn-anime-gradient:hover {
      animation: none;
    }
    
    .sparkle {
      animation: none;
      opacity: 0.6;
    }
  }
</style>
