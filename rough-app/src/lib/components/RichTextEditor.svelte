<script>
  import { onMount } from 'svelte';
  import Button from './Button.svelte';

  /**
   * @type {string}
   */
  let value = '';
  
  /**
   * @type {boolean}
   */
  let disabled = false;
  
  /**
   * @type {string}
   */
  let placeholder = 'Start writing...';
  
  /**
   * @type {Function}
   */
  let onchange = () => {};

  let { ...props } = $props();

  /**
   * @type {HTMLDivElement}
   */
  let editorRef;
  
  let isFormatting = $state(false);
  let activeFormats = $state(new Set());

  const formatButtons = [
    { command: 'bold', icon: 'B', title: 'Bold (Ctrl+B)' },
    { command: 'italic', icon: 'I', title: 'Italic (Ctrl+I)' },
    { command: 'underline', icon: 'U', title: 'Underline (Ctrl+U)' },
    { command: 'strikeThrough', icon: 'S', title: 'Strikethrough' },
    { command: 'insertUnorderedList', icon: '•', title: 'Bullet List' },
    { command: 'insertOrderedList', icon: '1.', title: 'Numbered List' },
    { command: 'justifyLeft', icon: '←', title: 'Align Left' },
    { command: 'justifyCenter', icon: '↔', title: 'Center' },
    { command: 'justifyRight', icon: '→', title: 'Align Right' }
  ];

  function executeCommand(command, value = null) {
    isFormatting = true;
    document.execCommand(command, false, value);
    editorRef.focus();
    updateActiveFormats();
    handleInput();
    isFormatting = false;
  }

  function updateActiveFormats() {
    const newFormats = new Set();
    
    formatButtons.forEach(({ command }) => {
      if (document.queryCommandState(command)) {
        newFormats.add(command);
      }
    });
    
    activeFormats = newFormats;
  }

  function handleInput() {
    if (!isFormatting) {
      value = editorRef.innerHTML;
      onchange(value);
    }
    updateActiveFormats();
  }

  function handleKeyDown(event) {
    // Handle keyboard shortcuts
    if (event.ctrlKey || event.metaKey) {
      switch (event.key.toLowerCase()) {
        case 'b':
          event.preventDefault();
          executeCommand('bold');
          break;
        case 'i':
          event.preventDefault();
          executeCommand('italic');
          break;
        case 'u':
          event.preventDefault();
          executeCommand('underline');
          break;
        case 'z':
          if (event.shiftKey) {
            event.preventDefault();
            executeCommand('redo');
          } else {
            event.preventDefault();
            executeCommand('undo');
          }
          break;
      }
    }
  }

  function handlePaste(event) {
    event.preventDefault();
    const text = event.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  }

  function insertLink() {
    const url = prompt('Enter URL:');
    if (url) {
      executeCommand('createLink', url);
    }
  }

  function insertHeading(level) {
    executeCommand('formatBlock', `h${level}`);
  }

  function clearFormatting() {
    executeCommand('removeFormat');
  }

  onMount(() => {
    if (editorRef) {
      editorRef.innerHTML = value;
      editorRef.addEventListener('input', handleInput);
      editorRef.addEventListener('keydown', handleKeyDown);
      editorRef.addEventListener('paste', handlePaste);
      editorRef.addEventListener('mouseup', updateActiveFormats);
      editorRef.addEventListener('keyup', updateActiveFormats);
    }

    return () => {
      if (editorRef) {
        editorRef.removeEventListener('input', handleInput);
        editorRef.removeEventListener('keydown', handleKeyDown);
        editorRef.removeEventListener('paste', handlePaste);
        editorRef.removeEventListener('mouseup', updateActiveFormats);
        editorRef.removeEventListener('keyup', updateActiveFormats);
      }
    };
  });

  // Update editor content when value prop changes
  $effect(() => {
    if (editorRef && editorRef.innerHTML !== value) {
      editorRef.innerHTML = value;
    }
  });
</script>

<div class="rich-text-editor" {...props}>
  <div class="toolbar">
    <div class="toolbar-group">
      {#each formatButtons as { command, icon, title }}
        <Button
          variant={activeFormats.has(command) ? 'primary' : 'ghost'}
          size="sm"
          onclick={() => executeCommand(command)}
          {title}
          customClass="format-btn"
        >
          {icon}
        </Button>
      {/each}
    </div>

    <div class="toolbar-group">
      <Button
        variant="ghost"
        size="sm"
        onclick={() => insertHeading(1)}
        title="Heading 1"
        customClass="format-btn"
      >
        H1
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onclick={() => insertHeading(2)}
        title="Heading 2"
        customClass="format-btn"
      >
        H2
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onclick={() => insertHeading(3)}
        title="Heading 3"
        customClass="format-btn"
      >
        H3
      </Button>
    </div>

    <div class="toolbar-group">
      <Button
        variant="ghost"
        size="sm"
        onclick={insertLink}
        title="Insert Link"
        customClass="format-btn"
      >
        🔗
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onclick={clearFormatting}
        title="Clear Formatting"
        customClass="format-btn"
      >
        ✂️
      </Button>
    </div>
  </div>

  <div
    bind:this={editorRef}
    class="editor-content"
    contenteditable={!disabled}
    data-placeholder={placeholder}
    role="textbox"
    aria-label="Rich text editor"
    aria-multiline="true"
  ></div>
</div>

<style>
  .rich-text-editor {
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-lg);
    background-color: var(--bg-primary);
    overflow: hidden;
    transition: border-color var(--transition-base);
  }

  .rich-text-editor:focus-within {
    border-color: var(--border-focus);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  .toolbar {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2);
    background-color: var(--bg-secondary);
    border-bottom: 1px solid var(--border-primary);
    flex-wrap: wrap;
  }

  .toolbar-group {
    display: flex;
    gap: var(--space-1);
    padding: 0 var(--space-2);
    border-right: 1px solid var(--border-primary);
  }

  .toolbar-group:last-child {
    border-right: none;
  }

  .format-btn {
    min-width: 2rem;
    font-weight: 600;
    font-family: var(--font-family-mono);
  }

  .editor-content {
    min-height: 200px;
    max-height: 500px;
    padding: var(--space-4);
    font-size: var(--font-size-base);
    line-height: var(--line-height-relaxed);
    color: var(--text-primary);
    outline: none;
    overflow-y: auto;
    word-wrap: break-word;
  }

  .editor-content:empty::before {
    content: attr(data-placeholder);
    color: var(--text-tertiary);
    font-style: italic;
  }

  /* Rich text content styling */
  .editor-content :global(h1) {
    font-size: var(--font-size-2xl);
    font-weight: 700;
    margin: var(--space-4) 0 var(--space-2) 0;
    color: var(--text-primary);
  }

  .editor-content :global(h2) {
    font-size: var(--font-size-xl);
    font-weight: 600;
    margin: var(--space-3) 0 var(--space-2) 0;
    color: var(--text-primary);
  }

  .editor-content :global(h3) {
    font-size: var(--font-size-lg);
    font-weight: 600;
    margin: var(--space-3) 0 var(--space-1) 0;
    color: var(--text-primary);
  }

  .editor-content :global(p) {
    margin: var(--space-2) 0;
  }

  .editor-content :global(ul),
  .editor-content :global(ol) {
    margin: var(--space-2) 0;
    padding-left: var(--space-6);
  }

  .editor-content :global(li) {
    margin: var(--space-1) 0;
  }

  .editor-content :global(a) {
    color: var(--color-primary);
    text-decoration: underline;
  }

  .editor-content :global(a:hover) {
    color: var(--color-primary-hover);
  }

  .editor-content :global(strong) {
    font-weight: 700;
  }

  .editor-content :global(em) {
    font-style: italic;
  }

  .editor-content :global(u) {
    text-decoration: underline;
  }

  .editor-content :global(strike) {
    text-decoration: line-through;
  }

  /* Scrollbar styling */
  .editor-content::-webkit-scrollbar {
    width: 6px;
  }

  .editor-content::-webkit-scrollbar-track {
    background: var(--bg-secondary);
  }

  .editor-content::-webkit-scrollbar-thumb {
    background: var(--border-secondary);
    border-radius: 3px;
  }

  .editor-content::-webkit-scrollbar-thumb:hover {
    background: var(--text-tertiary);
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .toolbar {
      padding: var(--space-1);
    }

    .toolbar-group {
      padding: 0 var(--space-1);
    }

    .format-btn {
      min-width: 1.5rem;
      font-size: var(--font-size-xs);
    }

    .editor-content {
      min-height: 150px;
      padding: var(--space-3);
    }
  }
</style>
