'use client';

import * as React from 'react';

export function toast(
  message: string,
  options?: {
    description?: React.ReactNode;
    position?: 'bottom-right' | 'top-right' | 'top-left' | 'bottom-left';
    classNames?: {
      content?: string;
    };
    style?: React.CSSProperties;
  },
) {
  // Simple toast implementation - can be enhanced with a toast library later
  if (typeof window !== 'undefined') {
    const toastEl = document.createElement('div');
    const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    
    toastEl.className = `fixed z-50 rounded-lg border p-4 shadow-lg backdrop-blur-sm transition-all duration-300 ${
      theme === 'dark'
        ? 'bg-black/90 border-white/10 text-white'
        : 'bg-white/90 border-black/10 text-black'
    } ${
      options?.position === 'bottom-right'
        ? 'bottom-4 right-4'
        : options?.position === 'top-right'
        ? 'top-4 right-4'
        : options?.position === 'top-left'
        ? 'top-4 left-4'
        : 'bottom-4 left-4'
    }`;
    
    const messageEl = document.createElement('div');
    messageEl.className = 'font-medium text-sm';
    messageEl.textContent = message;
    toastEl.appendChild(messageEl);
    
    if (options?.description) {
      const descEl = document.createElement('div');
      descEl.className = `text-xs mt-1 ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
      }`;
      if (typeof options.description === 'string') {
        descEl.textContent = options.description;
      } else {
        descEl.innerHTML = String(options.description);
      }
      toastEl.appendChild(descEl);
    }
    
    document.body.appendChild(toastEl);

    // Animation d'entrée
    setTimeout(() => {
      toastEl.style.opacity = '1';
      toastEl.style.transform = 'translateY(0)';
    }, 10);

    setTimeout(() => {
      toastEl.style.opacity = '0';
      toastEl.style.transform = 'translateY(10px)';
      setTimeout(() => {
        toastEl.remove();
      }, 300);
    }, 3000);
  }
}
