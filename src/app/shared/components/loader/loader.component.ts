import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../core/services/language.service';

@Component({
    selector: 'app-loader',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="loader-overlay" id="loader-overlay">
      <div class="loader-content">
        <!-- SVG Monogram "ME" with calligraphic stroke drawing -->
        <svg class="monogram-svg" viewBox="0 0 280 120" xmlns="http://www.w3.org/2000/svg">
          <!-- Letter M -->
          <path class="monogram-letter letter-m"
            d="M 20 100 L 20 20 L 50 70 L 80 20 L 80 100"
            fill="none"
            stroke="var(--text-primary)"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <!-- Letter E -->
          <path class="monogram-letter letter-e"
            d="M 120 20 L 120 100 M 120 20 L 170 20 M 120 60 L 160 60 M 120 100 L 170 100"
            fill="none"
            stroke="var(--text-primary)"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <!-- Decorative dot -->
          <circle class="monogram-dot" cx="200" cy="95" r="4" fill="var(--text-primary)" opacity="0" />
        </svg>

        <!-- Brand tagline -->
        <div class="loader-tagline">
          <span class="tagline-text">MAHMOUD SAYED</span>
        </div>
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
      animation: loaderFadeOut 0.6s ease-in-out 3.2s forwards;
    }

    .loader-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }

    .monogram-svg {
      width: 220px;
      height: 100px;
    }

    .monogram-letter {
      stroke-dasharray: 400;
      stroke-dashoffset: 400;
    }

    .letter-m {
      animation: drawStroke 1.8s cubic-bezier(0.65, 0, 0.35, 1) 0.3s forwards;
    }

    .letter-e {
      animation: drawStroke 1.6s cubic-bezier(0.65, 0, 0.35, 1) 0.8s forwards;
    }

    .monogram-dot {
      animation: dotAppear 0.5s ease-out 2s forwards;
    }

    @keyframes drawStroke {
      to {
        stroke-dashoffset: 0;
      }
    }

    @keyframes dotAppear {
      from {
        opacity: 0;
        transform: scale(0);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .loader-tagline {
      overflow: hidden;
    }

    .tagline-text {
      display: block;
      font-size: 0.85rem;
      font-weight: 300;
      letter-spacing: 0.45em;
      color: var(--text-secondary);
      opacity: 0;
      transform: translateY(20px);
      animation: taglineReveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) 2.2s forwards;
    }

    @keyframes taglineReveal {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes loaderFadeOut {
      to {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
      }
    }

    @media (max-width: 640px) {
      .monogram-svg {
        width: 160px;
        height: 75px;
      }
      .tagline-text {
        font-size: 0.7rem;
        letter-spacing: 0.35em;
      }
    }
  `]
})
export class LoaderComponent {
    langService = inject(LanguageService);
}
