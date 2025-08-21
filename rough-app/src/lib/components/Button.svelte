<script>
  /**
   * @typedef {'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'} ButtonVariant
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
</button>

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    border: none;
    border-radius: var(--radius-md);
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: all var(--transition-base);
    position: relative;
    white-space: nowrap;
    font-family: inherit;
  }

  .btn:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  /* Sizes */
  .btn-sm {
    padding: var(--space-2) var(--space-3);
    font-size: var(--font-size-sm);
    min-height: 2rem;
  }

  .btn-md {
    padding: var(--space-3) var(--space-4);
    font-size: var(--font-size-base);
    min-height: 2.5rem;
  }

  .btn-lg {
    padding: var(--space-4) var(--space-6);
    font-size: var(--font-size-lg);
    min-height: 3rem;
  }

  /* Variants */
  .btn-primary {
    background-color: var(--color-primary);
    color: var(--text-inverse);
  }

  .btn-primary:hover:not(:disabled) {
    background-color: var(--color-primary-hover);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  .btn-secondary {
    background-color: var(--bg-secondary);
    color: var(--text-primary);
    border: 1px solid var(--border-primary);
  }

  .btn-secondary:hover:not(:disabled) {
    background-color: var(--bg-tertiary);
    border-color: var(--border-secondary);
  }

  .btn-outline {
    background-color: transparent;
    color: var(--color-primary);
    border: 2px solid var(--color-primary);
  }

  .btn-outline:hover:not(:disabled) {
    background-color: var(--color-primary);
    color: var(--text-inverse);
  }

  .btn-ghost {
    background-color: transparent;
    color: var(--text-secondary);
  }

  .btn-ghost:hover:not(:disabled) {
    background-color: var(--bg-secondary);
    color: var(--text-primary);
  }

  .btn-danger {
    background-color: var(--color-error);
    color: var(--text-inverse);
  }

  .btn-danger:hover:not(:disabled) {
    background-color: #dc2626;
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
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
    outline: 2px solid var(--border-focus);
    outline-offset: 2px;
  }

  /* Active state */
  .btn:active:not(:disabled) {
    transform: translateY(0);
  }
</style>
