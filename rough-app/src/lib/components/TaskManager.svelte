<script>
  import { onMount } from 'svelte';
  import Card from './Card.svelte';
  import Button from './Button.svelte';
  import Input from './Input.svelte';
  import { makeDraggable, makeDropZone, reorderArray, addDragDropStyles } from '$lib/utils/dragDrop.js';

  /**
   * @typedef {Object} Task
   * @property {string} id
   * @property {string} title
   * @property {string} description
   * @property {'pending' | 'in-progress' | 'completed'} status
   * @property {string} priority
   * @property {Date} createdAt
   * @property {Date} dueDate
   */

  let tasks = $state([
    {
      id: '1',
      title: 'Fix security vulnerabilities',
      description: 'Update dependencies and resolve npm audit issues',
      status: 'completed',
      priority: 'high',
      createdAt: new Date('2024-01-01'),
      dueDate: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Implement drag-and-drop',
      description: 'Add drag-and-drop functionality for task reordering',
      status: 'in-progress',
      priority: 'medium',
      createdAt: new Date('2024-01-02'),
      dueDate: new Date('2024-01-20')
    },
    {
      id: '3',
      title: 'Add rich text editor',
      description: 'Create a rich text editor component for better note editing',
      status: 'pending',
      priority: 'low',
      createdAt: new Date('2024-01-03'),
      dueDate: new Date('2024-01-25')
    }
  ]);

  let showAddTask = $state(false);
  let newTask = $state({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });

  const statusColumns = [
    { id: 'pending', title: 'To Do', color: 'var(--color-secondary)' },
    { id: 'in-progress', title: 'In Progress', color: 'var(--color-accent)' },
    { id: 'completed', title: 'Completed', color: 'var(--color-success)' }
  ];

  const priorityColors = {
    low: 'var(--color-success)',
    medium: 'var(--color-accent)',
    high: 'var(--color-error)'
  };

  function getTasksByStatus(status) {
    return tasks.filter(task => task.status === status);
  }

  function addTask() {
    if (!newTask.title.trim()) return;

    const task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      status: 'pending',
      priority: newTask.priority,
      createdAt: new Date(),
      dueDate: newTask.dueDate ? new Date(newTask.dueDate) : null
    };

    tasks = [...tasks, task];
    
    // Reset form
    newTask = {
      title: '',
      description: '',
      priority: 'medium',
      dueDate: ''
    };
    showAddTask = false;
  }

  function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
  }

  function updateTaskStatus(taskId, newStatus) {
    tasks = tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: newStatus }
        : task
    );
  }

  function setupDragAndDrop() {
    addDragDropStyles();

    // Make task cards draggable
    tasks.forEach(task => {
      const taskElement = document.querySelector(`[data-task-id="${task.id}"]`);
      if (taskElement) {
        makeDraggable(taskElement, {
          data: { taskId: task.id, originalStatus: task.status },
          onDragStart: (e, data) => {
            console.log('Dragging task:', data);
          }
        });
      }
    });

    // Make status columns drop zones
    statusColumns.forEach(column => {
      const columnElement = document.querySelector(`[data-status="${column.id}"]`);
      if (columnElement) {
        makeDropZone(columnElement, {
          onDrop: (e, data) => {
            if (data && data.taskId) {
              updateTaskStatus(data.taskId, column.id);
            }
          }
        });
      }
    });
  }

  function formatDate(date) {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  }

  function isOverdue(task) {
    if (!task.dueDate || task.status === 'completed') return false;
    return new Date(task.dueDate) < new Date();
  }

  onMount(() => {
    setupDragAndDrop();
  });

  // Re-setup drag and drop when tasks change
  $effect(() => {
    // Small delay to ensure DOM is updated
    setTimeout(setupDragAndDrop, 100);
  });
</script>

<div class="task-manager">
  <div class="task-header">
    <h2 class="task-title">Task Management</h2>
    <Button
      variant="primary"
      size="sm"
      onclick={() => showAddTask = !showAddTask}
    >
      + Add Task
    </Button>
  </div>

  {#if showAddTask}
    <Card size="md" customClass="add-task-form">
      <h3 class="form-title">Create New Task</h3>
      
      <div class="form-fields">
        <Input
          label="Task Title"
          bind:value={newTask.title}
          placeholder="Enter task title..."
          required
          fullWidth
        />

        <div class="form-row">
          <div class="form-field">
            <label for="priority" class="form-label">Priority</label>
            <select bind:value={newTask.priority} id="priority" class="form-select">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <Input
            label="Due Date"
            type="date"
            bind:value={newTask.dueDate}
          />
        </div>

        <div class="form-field">
          <label for="description" class="form-label">Description</label>
          <textarea
            id="description"
            bind:value={newTask.description}
            placeholder="Task description..."
            class="form-textarea"
            rows="3"
          ></textarea>
        </div>
      </div>

      <div class="form-actions">
        <Button variant="ghost" onclick={() => showAddTask = false}>
          Cancel
        </Button>
        <Button variant="primary" onclick={addTask}>
          Create Task
        </Button>
      </div>
    </Card>
  {/if}

  <div class="kanban-board">
    {#each statusColumns as column}
      <div 
        class="status-column" 
        data-status={column.id}
        style="--column-color: {column.color}"
      >
        <div class="column-header">
          <h3 class="column-title">{column.title}</h3>
          <span class="task-count">{getTasksByStatus(column.id).length}</span>
        </div>

        <div class="task-list">
          {#each getTasksByStatus(column.id) as task (task.id)}
            <Card 
              size="sm" 
              customClass="task-card {isOverdue(task) ? 'overdue' : ''}"
              data-task-id={task.id}
            >
              <div class="task-content">
                <div class="task-main">
                  <h4 class="task-title-text">{task.title}</h4>
                  {#if task.description}
                    <p class="task-description">{task.description}</p>
                  {/if}
                </div>

                <div class="task-meta">
                  <div class="task-priority" style="background-color: {priorityColors[task.priority]}">
                    {task.priority}
                  </div>
                  
                  {#if task.dueDate}
                    <div class="task-due-date {isOverdue(task) ? 'overdue' : ''}">
                      <svg viewBox="0 0 24 24" fill="currentColor" class="date-icon">
                        <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" stroke="currentColor" stroke-width="1.5" fill="none" />
                      </svg>
                      {formatDate(task.dueDate)}
                    </div>
                  {/if}
                </div>

                <div class="task-actions">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onclick={() => deleteTask(task.id)}
                    title="Delete task"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" class="delete-icon">
                      <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" stroke="currentColor" stroke-width="1.5" fill="none" />
                    </svg>
                  </Button>
                </div>
              </div>
            </Card>
          {/each}

          {#if getTasksByStatus(column.id).length === 0}
            <div class="empty-column">
              <p>No tasks</p>
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .task-manager {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--space-4);
  }

  .task-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-6);
  }

  .task-title {
    font-size: var(--font-size-2xl);
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
  }

  .add-task-form {
    margin-bottom: var(--space-6);
    animation: slideUp var(--transition-base) ease-out;
  }

  .form-title {
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--space-4);
  }

  .form-fields {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    margin-bottom: var(--space-4);
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4);
  }

  .form-field {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .form-label {
    font-size: var(--font-size-sm);
    font-weight: 500;
    color: var(--text-primary);
  }

  .form-select,
  .form-textarea {
    padding: var(--space-3);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    background-color: var(--bg-primary);
    color: var(--text-primary);
    font-size: var(--font-size-base);
    transition: border-color var(--transition-base);
  }

  .form-select:focus,
  .form-textarea:focus {
    outline: none;
    border-color: var(--border-focus);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  .form-textarea {
    resize: vertical;
    font-family: inherit;
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--space-2);
  }

  .kanban-board {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-6);
  }

  .status-column {
    background-color: var(--bg-secondary);
    border-radius: var(--radius-lg);
    padding: var(--space-4);
    min-height: 400px;
    border: 2px solid transparent;
    transition: all var(--transition-base);
  }

  .status-column.drag-over {
    border-color: var(--column-color);
    background-color: rgba(255, 255, 255, 0.05);
  }

  .column-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-4);
    padding-bottom: var(--space-2);
    border-bottom: 2px solid var(--column-color);
  }

  .column-title {
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
  }

  .task-count {
    background-color: var(--column-color);
    color: white;
    font-size: var(--font-size-xs);
    font-weight: 600;
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-full);
    min-width: 1.5rem;
    text-align: center;
  }

  .task-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .task-card {
    cursor: grab;
    transition: all var(--transition-base);
    border-left: 3px solid transparent;
  }

  .task-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .task-card.overdue {
    border-left-color: var(--color-error);
    background-color: rgba(239, 68, 68, 0.05);
  }

  .task-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .task-main {
    flex: 1;
  }

  .task-title-text {
    font-size: var(--font-size-base);
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 var(--space-1) 0;
    line-height: var(--line-height-tight);
  }

  .task-description {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
    line-height: var(--line-height-relaxed);
    margin: 0;
  }

  .task-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-2);
    flex-wrap: wrap;
  }

  .task-priority {
    font-size: var(--font-size-xs);
    font-weight: 600;
    color: white;
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-sm);
    text-transform: uppercase;
  }

  .task-due-date {
    font-size: var(--font-size-xs);
    color: var(--text-tertiary);
    font-weight: 500;
  }

  .task-due-date.overdue {
    color: var(--color-error);
    font-weight: 600;
  }

  .date-icon {
    width: 0.875rem;
    height: 0.875rem;
    display: inline;
    margin-right: var(--space-1);
  }

  .delete-icon {
    width: 1rem;
    height: 1rem;
  }

  .task-actions {
    display: flex;
    justify-content: flex-end;
  }

  .empty-column {
    text-align: center;
    padding: var(--space-8);
    color: var(--text-tertiary);
    font-style: italic;
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .task-manager {
      padding: var(--space-2);
    }

    .kanban-board {
      grid-template-columns: 1fr;
      gap: var(--space-4);
    }

    .form-row {
      grid-template-columns: 1fr;
    }

    .task-header {
      flex-direction: column;
      gap: var(--space-3);
      align-items: stretch;
    }
  }
</style>
