import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../core/services/language.service';

@Component({
    selector: 'app-loader',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="loader-overlay">
      <div class="loader-content">
        <div class="loader-text">{{ langService.t({ en: 'Loading Portfolio...', ar: 'جاري تحميل الملف الشخصي' }) }}</div>
        <div class="spinner"></div>
      </div>
    </div>
  `,
    styles: [`
    .loader-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--bg-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      font-family: var(--font-primary);
    }
    .loader-content {
      text-align: center;
    }
    .loader-text {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: var(--text-primary);
    }
    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid var(--border-color);
      border-top: 4px solid var(--accent-color);
      border-radius: 50%;
      margin: 0 auto;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class LoaderComponent {
    langService = inject(LanguageService);
}
