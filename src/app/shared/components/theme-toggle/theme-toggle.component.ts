import { Component, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [NgIf],
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css']
})
export class ThemeToggleComponent {
  private readonly document = inject(DOCUMENT)
  
  currentTheme = 'light';

  toggleTheme(): void {
    const html = this.document.documentElement;
    const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
    
    if (currentTheme === 'light') {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      this.currentTheme = 'dark';
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      this.currentTheme = 'light';
    }
  }

  get isDarkMode(): boolean {
    return this.currentTheme === 'dark';
  }

  constructor() {
    // Initialize theme from localStorage or system preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        this.document.documentElement.classList.add('dark');
        this.currentTheme = 'dark';
      }
    }
  }
}
