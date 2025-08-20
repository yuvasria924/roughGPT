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
   * @type {boolean}
   */
  let clickable = false;
  
  /**
   * @type {string}
   */
  let customClass = '';

  let { children, onclick, ...props } = $props();

  $effect(() => {
    if (onclick) {
      clickable = true;
    }
  });
</script>

<div
  class="card card-{size} card-{variant} {hoverable ? 'card-hoverable' : ''} {clickable ? 'card-clickable' : ''} {customClass} fade-in"
  onclick={onclick}
  {...props}
  role={clickable ? 'button' : undefined}
  tabindex={clickable ? 0 : undefined}
>
  {@render children()}
</div>

<style>
  .card {
    background-color: var(--bg-primary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-lg);
    transition: all var(--transition-base);
    position: relative;
    overflow: hidden;
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
    background-color: var(--bg-primary);
  }

  .card-elevated {
    box-shadow: var(--shadow-md);
    border: none;
  }

  .card-outlined {
    border: 2px solid var(--border-secondary);
    background-color: transparent;
  }

  /* Interactive States */
  .card-hoverable:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .card-clickable {
    cursor: pointer;
    user-select: none;
  }

  .card-clickable:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  .card-clickable:active {
    transform: translateY(0);
    box-shadow: var(--shadow-sm);
  }

  .card-clickable:focus {
    outline: 2px solid var(--border-focus);
    outline-offset: 2px;
  }

  /* Dark mode adjustments */
  [data-theme="dark"] .card {
    background-color: var(--bg-secondary);
    border-color: var(--border-primary);
  }

  [data-theme="dark"] .card-elevated {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
  }

  [data-theme="dark"] .card-hoverable:hover,
  [data-theme="dark"] .card-clickable:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3);
  }

  /* Animation on mount */
  .card {
    animation: slideUp var(--transition-slow) ease-out;
  }
</style>
