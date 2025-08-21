<script>
  /**
   * @typedef {'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'anime' | 'kawaii'} ButtonVariant
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
  
  <!-- Sparkle effects for anime buttons -->
  {#if variant === 'anime' || variant === 'kawaii'}
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
    background: rgba(255, 255, 255, 0.2);
    color: var(--text-primary);
    border: 1px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
  }

  .btn-secondary:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.3);
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

  /* NEW: Anime Gradient Button (Pink → Purple → Blue) */
  .btn-anime {
    background: linear-gradient(135deg, #FF69B4, #9932CC, #4169E1);
    color: white;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    box-shadow: 
      0 8px 32px rgba(255, 105, 180, 0.4),
      0 4px 16px rgba(153, 50, 204, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    position: relative;
  }

  .btn-anime::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transition: left 0.6s;
  }

  .btn-anime:hover:not(:disabled) {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 
      0 12px 40px rgba(255, 105, 180, 0.5),
      0 8px 25px rgba(153, 50, 204, 0.4),
      0 0 30px rgba(65, 105, 225, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
    animation: kawaiGlow 2s ease-in-out infinite;
  }

  .btn-anime:hover::before {
    left: 100%;
  }

  /* NEW: Kawaii Soft Button */
  .btn-kawaii {
    background: linear-gradient(135deg, #FFB6C1, #DDA0DD, #B0E0E6);
    color: #4A5568;
    font-weight: 600;
    border: 2px solid rgba(255, 255, 255, 0.8);
    box-shadow: 
      0 6px 20px rgba(255, 182, 193, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.6);
  }

  .btn-kawaii:hover:not(:disabled) {
    transform: translateY(-2px);
    background: linear-gradient(135deg, #FFC0CB, #E6E6FA, #AFEEEE);
    box-shadow: 
      0 10px 30px rgba(255, 182, 193, 0.5),
      0 0 20px rgba(221, 160, 221, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
  }

  @keyframes kawaiGlow {
    0%, 100% {
      filter: brightness(1) saturate(1);
    }
    50% {
      filter: brightness(1.1) saturate(1.2);
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
    font-size: 0.8rem;
    animation: sparkleFloat 3s infinite ease-in-out;
    opacity: 0;
  }

  .sparkle-1 {
    top: 20%;
    left: 20%;
    animation-delay: 0s;
  }

  .sparkle-2 {
    top: 60%;
    right: 20%;
    animation-delay: 1s;
  }

  .sparkle-3 {
    bottom: 20%;
    left: 60%;
    animation-delay: 2s;
  }

  @keyframes sparkleFloat {
    0%, 100% {
      opacity: 0;
      transform: translateY(0) scale(0.5);
    }
    50% {
      opacity: 1;
      transform: translateY(-10px) scale(1);
    }
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

  .btn-anime:focus-visible,
  .btn-kawaii:focus-visible {
    outline: 3px solid rgba(255, 255, 255, 0.9);
    outline-offset: 3px;
  }

  /* Active state */
  .btn:active:not(:disabled) {
    transform: translateY(-1px);
  }

  .btn-anime:active:not(:disabled) {
    transform: translateY(-1px) scale(0.98);
  }

  /* Dark mode adjustments */
  [data-theme="dark"] .btn-secondary {
    background: rgba(15, 23, 42, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  [data-theme="dark"] .btn-secondary:hover:not(:disabled) {
    background: rgba(15, 23, 42, 0.6);
  }

  [data-theme="dark"] .btn-kawaii {
    color: #E2E8F0;
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .btn-anime:hover {
      animation: none;
    }
    
    .sparkle {
      animation: none;
      opacity: 0.6;
    }
  }
</style>
