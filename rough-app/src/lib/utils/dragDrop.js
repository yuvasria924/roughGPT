/**
 * Utility functions for drag and drop functionality
 */

/**
 * Makes an element draggable and sets up drag event handlers
 * @param {HTMLElement} element - The element to make draggable
 * @param {Object} options - Options for drag behavior
 * @param {Function} options.onDragStart - Called when drag starts
 * @param {Function} options.onDragEnd - Called when drag ends
 * @param {any} options.data - Data to associate with the draggable element
 */
export function makeDraggable(element, options = {}) {
  const { onDragStart, onDragEnd, data } = options;
  
  element.draggable = true;
  element.setAttribute('role', 'button');
  element.setAttribute('aria-grabbed', 'false');
  
  element.addEventListener('dragstart', (e) => {
    element.classList.add('dragging');
    element.setAttribute('aria-grabbed', 'true');
    
    // Store data in the drag event
    if (data) {
      e.dataTransfer.setData('application/json', JSON.stringify(data));
    }
    
    // Set drag effect
    e.dataTransfer.effectAllowed = 'move';
    
    // Create a custom drag image
    const dragImage = element.cloneNode(true);
    dragImage.style.transform = 'rotate(5deg)';
    dragImage.style.opacity = '0.8';
    dragImage.style.backgroundColor = 'var(--color-primary)';
    dragImage.style.color = 'white';
    
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, element.offsetWidth / 2, element.offsetHeight / 2);
    
    // Remove the drag image after a short delay
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
    
    onDragStart?.(e, data);
  });
  
  element.addEventListener('dragend', (e) => {
    element.classList.remove('dragging');
    element.setAttribute('aria-grabbed', 'false');
    onDragEnd?.(e, data);
  });
  
  // Add keyboard support for accessibility
  element.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      // Simulate drag start for keyboard users
      element.setAttribute('aria-grabbed', 'true');
      element.classList.add('keyboard-selected');
    }
  });
}

/**
 * Makes an element a drop zone
 * @param {HTMLElement} element - The element to make a drop zone
 * @param {Object} options - Options for drop behavior
 * @param {Function} options.onDrop - Called when something is dropped
 * @param {Function} options.onDragEnter - Called when drag enters the zone
 * @param {Function} options.onDragLeave - Called when drag leaves the zone
 * @param {Function} options.onDragOver - Called when dragging over the zone
 */
export function makeDropZone(element, options = {}) {
  const { onDrop, onDragEnter, onDragLeave, onDragOver } = options;
  
  element.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    element.classList.add('drag-over');
    onDragOver?.(e);
  });
  
  element.addEventListener('dragenter', (e) => {
    e.preventDefault();
    element.classList.add('drag-enter');
    onDragEnter?.(e);
  });
  
  element.addEventListener('dragleave', (e) => {
    element.classList.remove('drag-over', 'drag-enter');
    onDragLeave?.(e);
  });
  
  element.addEventListener('drop', (e) => {
    e.preventDefault();
    element.classList.remove('drag-over', 'drag-enter');
    
    const data = e.dataTransfer.getData('application/json');
    const parsedData = data ? JSON.parse(data) : null;
    
    onDrop?.(e, parsedData);
  });
}

/**
 * Reorder an array based on drag and drop positions
 * @param {Array} array - The array to reorder
 * @param {number} fromIndex - The original index
 * @param {number} toIndex - The target index
 * @returns {Array} The reordered array
 */
export function reorderArray(array, fromIndex, toIndex) {
  const result = [...array];
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  return result;
}

/**
 * Get the insertion index for a drop operation
 * @param {HTMLElement} container - The container element
 * @param {number} y - The y coordinate of the drop
 * @returns {number} The index where the item should be inserted
 */
export function getInsertionIndex(container, y) {
  const children = [...container.children];
  
  return children.reduce((insertIndex, child, index) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    
    if (offset < 0 && insertIndex === children.length) {
      return index;
    }
    
    return insertIndex;
  }, children.length);
}

/**
 * Add visual feedback styles for drag and drop
 */
export function addDragDropStyles() {
  if (document.getElementById('drag-drop-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'drag-drop-styles';
  style.textContent = `
    .dragging {
      opacity: 0.5;
      transform: rotate(2deg);
      transition: all var(--transition-base);
      cursor: grabbing !important;
    }
    
    .drag-over {
      border: 2px dashed var(--color-primary);
      background-color: rgba(37, 99, 235, 0.05);
      transform: scale(1.02);
      transition: all var(--transition-base);
    }
    
    .drag-enter {
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
    }
    
    .keyboard-selected {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }
    
    [draggable="true"] {
      cursor: grab;
    }
    
    [draggable="true"]:active {
      cursor: grabbing;
    }
    
    .drop-indicator {
      height: 2px;
      background-color: var(--color-primary);
      margin: var(--space-1) 0;
      border-radius: 1px;
      opacity: 0;
      transition: opacity var(--transition-base);
    }
    
    .drop-indicator.active {
      opacity: 1;
    }
  `;
  
  document.head.appendChild(style);
}
