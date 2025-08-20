<script>
  import { createEventDispatcher } from 'svelte';

  /**
   * @typedef {'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'} InputType
   * @typedef {'sm' | 'md' | 'lg'} InputSize
   */

  /**
   * @type {InputType}
   */
  let type = 'text';
  
  /**
   * @type {InputSize}
   */
  let size = 'md';
  
  /**
   * @type {string}
   */
  let value = $state('');
  
  /**
   * @type {string}
   */
  let placeholder = '';
  
  /**
   * @type {string}
   */
  let label = '';
  
  /**
   * @type {string}
   */
  let error = '';
  
  /**
   * @type {string}
   */
  let hint = '';
  
  /**
   * @type {boolean}
   */
  let disabled = false;
  
  /**
   * @type {boolean}
   */
  let required = false;
  
  /**
   * @type {boolean}
   */
  let fullWidth = false;
  
  /**
   * @type {string}
   */
  let customClass = '';

  /**
   * @type {string}
   */
  let leftIcon = '';
  
  /**
   * @type {string}
   */
  let rightIcon = '';

  let { oninput, onfocus, onblur, ...props } = $props();

  const dispatch = createEventDispatcher();

  function handleInput(event) {
    value = event.target.value;
    dispatch('input', { value });
    oninput?.(event);
  }

  function handleFocus(event) {
    dispatch('focus', event);
    onfocus?.(event);
  }

  function handleBlur(event) {
    dispatch('blur', event);
    onblur?.(event);
  }

  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;
</script>

<div class="input-wrapper {fullWidth ? 'input-wrapper-full-width' : ''} {customClass}">
  {#if label}
    <label for={inputId} class="input-label">
      {label}
      {#if required}
        <span class="input-required" aria-label="required">*</span>
      {/if}
    </label>
  {/if}
  
  <div class="input-container input-{size} {error ? 'input-error' : ''} {disabled ? 'input-disabled' : ''}">
    {#if leftIcon}
      <div class="input-icon input-icon-left">
        <svg class="input-icon-svg" viewBox="0 0 20 20" fill="currentColor">
          <path d={leftIcon} />
        </svg>
      </div>
    {/if}
    
    <input
      id={inputId}
      class="input-field {leftIcon ? 'input-field-left-icon' : ''} {rightIcon ? 'input-field-right-icon' : ''}"
      {type}
      {placeholder}
      {disabled}
      {required}
      bind:value
      oninput={handleInput}
      onfocus={handleFocus}
      onblur={handleBlur}
      {...props}
    />
    
    {#if rightIcon}
      <div class="input-icon input-icon-right">
        <svg class="input-icon-svg" viewBox="0 0 20 20" fill="currentColor">
          <path d={rightIcon} />
        </svg>
      </div>
    {/if}
  </div>
  
  {#if error}
    <div class="input-message input-message-error" role="alert">
      {error}
    </div>
  {:else if hint}
    <div class="input-message input-message-hint">
      {hint}
    </div>
  {/if}
</div>

<style>
  .input-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .input-wrapper-full-width {
    width: 100%;
  }

  .input-label {
    font-size: var(--font-size-sm);
    font-weight: 500;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: var(--space-1);
  }

  .input-required {
    color: var(--color-error);
    font-size: var(--font-size-sm);
  }

  .input-container {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-field {
    width: 100%;
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    background-color: var(--bg-primary);
    color: var(--text-primary);
    font-size: inherit;
    transition: all var(--transition-base);
    outline: none;
  }

  .input-field::placeholder {
    color: var(--text-tertiary);
  }

  .input-field:focus {
    border-color: var(--border-focus);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  .input-field:disabled {
    background-color: var(--bg-secondary);
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Sizes */
  .input-sm .input-field {
    padding: var(--space-2) var(--space-3);
    font-size: var(--font-size-sm);
    min-height: 2rem;
  }

  .input-md .input-field {
    padding: var(--space-3) var(--space-4);
    font-size: var(--font-size-base);
    min-height: 2.5rem;
  }

  .input-lg .input-field {
    padding: var(--space-4) var(--space-5);
    font-size: var(--font-size-lg);
    min-height: 3rem;
  }

  /* Icon adjustments */
  .input-field-left-icon {
    padding-left: 2.5rem;
  }

  .input-field-right-icon {
    padding-right: 2.5rem;
  }

  .input-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-tertiary);
    pointer-events: none;
    z-index: 1;
  }

  .input-icon-left {
    left: var(--space-3);
  }

  .input-icon-right {
    right: var(--space-3);
  }

  .input-icon-svg {
    width: 1rem;
    height: 1rem;
  }

  /* Error state */
  .input-error .input-field {
    border-color: var(--color-error);
  }

  .input-error .input-field:focus {
    border-color: var(--color-error);
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }

  /* Messages */
  .input-message {
    font-size: var(--font-size-xs);
    line-height: var(--line-height-tight);
  }

  .input-message-error {
    color: var(--color-error);
  }

  .input-message-hint {
    color: var(--text-tertiary);
  }

  /* Dark mode adjustments */
  [data-theme="dark"] .input-field {
    background-color: var(--bg-secondary);
    border-color: var(--border-primary);
  }

  [data-theme="dark"] .input-field:disabled {
    background-color: var(--bg-tertiary);
  }
</style>
