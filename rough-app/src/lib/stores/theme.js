import { writable } from 'svelte/store';
import { browser } from '$app/environment';

/**
 * @typedef {'light' | 'dark' | 'system'} Theme
 */

// Get initial theme from localStorage or default to 'system'
function getInitialTheme() {
  if (!browser) return 'system';
  
  const stored = localStorage.getItem('theme');
  if (stored && ['light', 'dark', 'system'].includes(stored)) {
    return stored;
  }
  return 'system';
}

// Determine actual theme based on preference and system
function getActualTheme(theme) {
  if (theme === 'system') {
    return browser && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return theme;
}

// Create the theme store
export const theme = writable(getInitialTheme());

// Apply theme to document
export function applyTheme(themeValue) {
  if (!browser) return;
  
  const actualTheme = getActualTheme(themeValue);
  document.documentElement.setAttribute('data-theme', actualTheme);
  
  // Also apply body class for backward compatibility
  document.body.classList.toggle('dark-mode', actualTheme === 'dark');
}

// Subscribe to theme changes
if (browser) {
  theme.subscribe((value) => {
    localStorage.setItem('theme', value);
    applyTheme(value);
  });

  // Listen for system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', () => {
    theme.update(currentTheme => {
      if (currentTheme === 'system') {
        applyTheme('system');
      }
      return currentTheme;
    });
  });
}

// Theme toggle functions
export function toggleTheme() {
  theme.update(current => {
    const themes = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(current);
    return themes[(currentIndex + 1) % themes.length];
  });
}

export function setTheme(newTheme) {
  theme.set(newTheme);
}
