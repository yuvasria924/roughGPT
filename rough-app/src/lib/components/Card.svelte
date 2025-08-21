<script>
  /**
   * @typedef {'sm' | 'md' | 'lg' | 'xl'} CardSize
   * @typedef {'default' | 'elevated' | 'outlined'} CardVariant
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
  {@render children()}
</div>

<style>
  .card {
    display: flex;
    flex-direction: column;
    padding: var(--space-4);
    border-radius: var(--radius-lg);
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: all var(--transition-base);
    position: relative;
    overflow: hidden;
  }

  [data-theme="dark"] .card {
    background: rgba(15, 23, 42, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  /* Sizes */
  .card-sm {
    padding: var(--space-3);
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

  /* Variants */
  .card-default {
    /* Default glassmorphism already applied above */
  }

  .card-elevated {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.2);
  }

  [data-theme="dark"] .card-elevated {
    background: rgba(15, 23, 42, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  .card-outlined {
    border: 2px solid rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.1);
  }

  [data-theme="dark"] .card-outlined {
    border: 2px solid rgba(255, 255, 255, 0.2);
    background: rgba(15, 23, 42, 0.2);
  }

  /* Interactive States */
  .card-hoverable:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    border-color: var(--color-primary);
    background: rgba(255, 255, 255, 0.25);
  }

  [data-theme="dark"] .card-hoverable:hover {
    background: rgba(15, 23, 42, 0.5);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  }

  .card-clickable {
    cursor: pointer;
    user-select: none;
  }

  .card-clickable:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.12);
    background: rgba(255, 255, 255, 0.2);
  }

  [data-theme="dark"] .card-clickable:hover {
    background: rgba(15, 23, 42, 0.4);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.35);
  }

  .card-clickable:active {
    transform: translateY(-2px) scale(1.005);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .card-clickable:focus {
    outline: 2px solid var(--border-focus);
    outline-offset: 2px;
  }

  /* Animation on mount */
  .card {
    animation: slideUp var(--transition-slow) ease-out;
  }

  /* Shimmer effect for glass cards */
  .card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: left 0.5s;
  }

  .card:hover::before {
    left: 100%;
  }
</style>
