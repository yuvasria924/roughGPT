<script>
  import { onMount } from 'svelte';
  import Card from '$lib/components/Card.svelte';
  import Button from '$lib/components/Button.svelte';
  import TaskManager from '$lib/components/TaskManager.svelte';
  import RichTextEditor from '$lib/components/RichTextEditor.svelte';

  let activeTab = $state('tasks');
  let noteContent = $state('');
  let savedNotes = $state([]);

  function switchTab(tab) {
    activeTab = tab;
  }

  function saveNote() {
    if (!noteContent.trim()) return;
    
    const note = {
      id: Date.now().toString(),
      content: noteContent,
      createdAt: new Date(),
      title: extractTitle(noteContent)
    };
    
    savedNotes = [note, ...savedNotes];
    noteContent = '';
  }

  function extractTitle(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    const firstHeading = div.querySelector('h1, h2, h3');
    if (firstHeading) {
      return firstHeading.textContent;
    }
    const text = div.textContent || div.innerText || '';
    return text.slice(0, 50) + (text.length > 50 ? '...' : '');
  }

  function deleteNote(noteId) {
    savedNotes = savedNotes.filter(note => note.id !== noteId);
  }

  function loadNote(note) {
    noteContent = note.content;
    activeTab = 'editor';
  }

  onMount(() => {
    // Load saved notes from localStorage
    const saved = localStorage.getItem('productivity-notes');
    if (saved) {
      try {
        savedNotes = JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load saved notes:', e);
      }
    }
  });

  // Save notes to localStorage when they change
  $effect(() => {
    localStorage.setItem('productivity-notes', JSON.stringify(savedNotes));
  });
</script>

<svelte:head>
  <title>Productivity Dashboard - Rough App</title>
  <meta name="description" content="Manage tasks and create rich text notes in your productivity dashboard" />
</svelte:head>

<main class="productivity-container">
  <div class="productivity-header">
    <h1 class="page-title">Productivity Dashboard</h1>
    <p class="page-subtitle">Manage your tasks and create rich content notes</p>
  </div>

  <div class="tab-navigation">
    <Card size="sm" customClass="tab-card">
      <div class="tab-buttons">
        <Button
          variant={activeTab === 'tasks' ? 'primary' : 'ghost'}
          size="md"
          onclick={() => switchTab('tasks')}
          customClass="tab-button"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" class="tab-icon">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" stroke="currentColor" stroke-width="2" fill="none" />
          </svg>
          Task Management
        </Button>
        <Button
          variant={activeTab === 'editor' ? 'primary' : 'ghost'}
          size="md"
          onclick={() => switchTab('editor')}
          customClass="tab-button"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" class="tab-icon">
            <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" stroke="currentColor" stroke-width="2" fill="none" />
          </svg>
          Rich Text Editor
        </Button>
        <Button
          variant={activeTab === 'notes' ? 'primary' : 'ghost'}
          size="md"
          onclick={() => switchTab('notes')}
          customClass="tab-button"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" class="tab-icon">
            <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" stroke="currentColor" stroke-width="2" fill="none" />
          </svg>
          Saved Notes
        </Button>
      </div>
    </Card>
  </div>

  <div class="tab-content">
    {#if activeTab === 'tasks'}
      <div class="tab-panel tasks-panel fade-in">
        <TaskManager />
      </div>
    
    {:else if activeTab === 'editor'}
      <div class="tab-panel editor-panel fade-in">
        <Card size="lg" variant="elevated" customClass="editor-container">
          <div class="editor-header">
            <h2 class="editor-title">Rich Text Editor</h2>
            <div class="editor-actions">
              <Button
                variant="primary"
                size="sm"
                onclick={saveNote}
                disabled={!noteContent.trim()}
              >
                Save Note
              </Button>
            </div>
          </div>
          
          <RichTextEditor
            bind:value={noteContent}
            placeholder="Start writing your rich text note..."
          />
        </Card>
      </div>
    
    {:else if activeTab === 'notes'}
      <div class="tab-panel notes-panel fade-in">
        <div class="notes-header">
          <h2 class="notes-title">Saved Notes</h2>
          <p class="notes-subtitle">
            {savedNotes.length} note{savedNotes.length === 1 ? '' : 's'} saved
          </p>
        </div>

        {#if savedNotes.length === 0}
          <Card size="lg" customClass="empty-state">
            <div class="empty-content">
              <div class="empty-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" class="empty-svg">
                  <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" stroke="currentColor" stroke-width="2" fill="none" />
                </svg>
              </div>
              <h3 class="empty-title">No notes yet</h3>
              <p class="empty-description">
                Create your first rich text note using the editor.
              </p>
              <Button
                variant="primary"
                onclick={() => switchTab('editor')}
              >
                Create Note
              </Button>
            </div>
          </Card>
        {:else}
          <div class="notes-grid">
            {#each savedNotes as note (note.id)}
              <Card size="md" hoverable customClass="note-card">
                <div class="note-preview">
                  <h3 class="note-title">{note.title}</h3>
                  <div class="note-content-preview">
                    {@html note.content}
                  </div>
                  <div class="note-meta">
                    <span class="note-date">
                      {new Intl.DateTimeFormat('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }).format(new Date(note.createdAt))}
                    </span>
                  </div>
                </div>
                
                <div class="note-actions">
                  <Button
                    variant="ghost"
                    size="sm"
                    onclick={() => loadNote(note)}
                    title="Edit note"
                  >
                    ✏️ Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onclick={() => deleteNote(note.id)}
                    title="Delete note"
                  >
                    🗑️ Delete
                  </Button>
                </div>
              </Card>
            {/each}
          </div>
        {/if}
      </div>
    {/if}
  </div>
</main>

<style>
  .productivity-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: var(--space-8) var(--space-4);
    min-height: 100vh;
  }

  .productivity-header {
    text-align: center;
    margin-bottom: var(--space-8);
    animation: slideUp var(--transition-slow) ease-out;
  }

  .page-title {
    font-size: var(--font-size-4xl);
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: var(--space-2);
    background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .page-subtitle {
    font-size: var(--font-size-lg);
    color: var(--text-secondary);
    line-height: var(--line-height-relaxed);
  }

  .tab-navigation {
    margin-bottom: var(--space-8);
    animation: scaleIn var(--transition-slow) ease-out 0.2s both;
  }

  .tab-card {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }

  .tab-buttons {
    display: flex;
    gap: var(--space-2);
    justify-content: center;
    flex-wrap: wrap;
  }

  .tab-button {
    flex: 1;
    min-width: 150px;
    justify-content: center;
  }

  .tab-content {
    animation: fadeIn var(--transition-slow) ease-out 0.4s both;
  }

  .tab-panel {
    width: 100%;
  }

  .editor-container {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
  }

  .editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-4);
    flex-wrap: wrap;
    gap: var(--space-4);
  }

  .editor-title {
    font-size: var(--font-size-2xl);
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
  }

  .editor-actions {
    display: flex;
    gap: var(--space-2);
  }

  .notes-header {
    text-align: center;
    margin-bottom: var(--space-6);
  }

  .notes-title {
    font-size: var(--font-size-2xl);
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--space-2);
  }

  .notes-subtitle {
    color: var(--text-secondary);
    font-size: var(--font-size-base);
  }

  .empty-state {
    max-width: 500px;
    margin: 0 auto;
  }

  .empty-content {
    text-align: center;
    padding: var(--space-8);
  }

  .empty-icon {
    font-size: 4rem;
    margin-bottom: var(--space-4);
    opacity: 0.7;
  }

  .empty-title {
    font-size: var(--font-size-xl);
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--space-3);
  }

  .empty-description {
    color: var(--text-secondary);
    margin-bottom: var(--space-6);
    line-height: var(--line-height-relaxed);
  }

  .notes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: var(--space-6);
  }

  .note-card {
    display: flex;
    flex-direction: column;
    min-height: 200px;
  }

  .note-preview {
    flex: 1;
    margin-bottom: var(--space-4);
  }

  .note-title {
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--space-3);
    line-height: var(--line-height-tight);
  }

  .note-content-preview {
    color: var(--text-secondary);
    line-height: var(--line-height-relaxed);
    font-size: var(--font-size-sm);
    max-height: 100px;
    overflow: hidden;
    position: relative;
    margin-bottom: var(--space-3);
  }

  .note-content-preview::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 20px;
    background: linear-gradient(transparent, var(--bg-primary));
  }

  .note-content-preview :global(h1),
  .note-content-preview :global(h2),
  .note-content-preview :global(h3) {
    font-size: var(--font-size-sm);
    margin: var(--space-1) 0;
  }

  .note-content-preview :global(p) {
    margin: var(--space-1) 0;
  }

  .note-meta {
    border-top: 1px solid var(--border-primary);
    padding-top: var(--space-2);
  }

  .note-date {
    font-size: var(--font-size-xs);
    color: var(--text-tertiary);
    font-weight: 500;
  }

  .note-actions {
    display: flex;
    justify-content: space-between;
    gap: var(--space-2);
    padding-top: var(--space-3);
    border-top: 1px solid var(--border-primary);
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .productivity-container {
      padding: var(--space-4) var(--space-2);
    }

    .tab-buttons {
      flex-direction: column;
    }

    .tab-button {
      min-width: auto;
    }

    .editor-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .notes-grid {
      grid-template-columns: 1fr;
      gap: var(--space-4);
    }

    .note-actions {
      justify-content: stretch;
    }

    .note-actions > :global(*) {
      flex: 1;
    }
  }

  @media (max-width: 480px) {
    .page-title {
      font-size: var(--font-size-3xl);
    }

    .tab-button {
      font-size: var(--font-size-sm);
      padding: var(--space-2) var(--space-3);
    }
  }
</style>
