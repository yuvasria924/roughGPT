<script>
  import { theme, toggleTheme } from '$lib/stores/theme.js';
  
  /**
   * @type {'sm' | 'md' | 'lg'}
   */
  let size = 'md';
  
  /**
   * @type {boolean}
   */
  let showLabel = false;

  const themeIcons = {
    light: `M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.59-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.59zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.59-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.59z`,
    dark: `M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z`,
    system: `M9 12a3 3 0 11-6 0 3 3 0 016 0zM21 12a3 3 0 11-6 0 3 3 0 016 0zM12 21a3 3 0 110-6 3 3 0 010 6zM12 9a3 3 0 110-6 3 3 0 010 6z`
  };

  const themeLabels = {
    light: 'Light',
    dark: 'Dark', 
    system: 'System'
  };

  // Get size classes
  $: sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5', 
    lg: 'w-6 h-6'
  };

  $: buttonSizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5'
  };
</script>

<button
  class="theme-toggle {buttonSizeClasses[size]}"
  onclick={toggleTheme}
  aria-label="Toggle theme"
  title="Switch theme: {themeLabels[$theme]}"
>
  <svg
    class="theme-icon {sizeClasses[size]}"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d={themeIcons[$theme]} />
  </svg>
  
  {#if showLabel}
    <span class="theme-label">
      {themeLabels[$theme]}
    </span>
  {/if}
</button>

<style>
  .theme-toggle {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition-base);
    position: relative;
    overflow: hidden;
  }

  .theme-toggle:hover {
    background-color: var(--bg-tertiary);
    color: var(--text-primary);
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
  }

  .theme-toggle:active {
    transform: translateY(0);
  }

  .theme-toggle:focus-visible {
    outline: 2px solid var(--border-focus);
    outline-offset: 2px;
  }

  .theme-icon {
    transition: transform var(--transition-base);
    flex-shrink: 0;
  }

  .theme-toggle:hover .theme-icon {
    transform: rotate(15deg);
  }

  .theme-label {
    font-size: var(--font-size-sm);
    font-weight: 500;
    white-space: nowrap;
  }

  /* Smooth icon transitions */
  .theme-icon {
    animation: fadeIn var(--transition-base) ease-out;
  }

  /* Add a subtle glow effect on focus */
  .theme-toggle:focus {
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  /* Dark mode adjustments */
  [data-theme="dark"] .theme-toggle {
    background-color: var(--bg-tertiary);
  }

  [data-theme="dark"] .theme-toggle:hover {
    background-color: var(--bg-secondary);
  }
</style>
