import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    :host {
      display: block;
      font-family: var(--font-en);
      color: var(--text);
      background-color: var(--background);
      min-height: 100vh;
    }
    
    [dir="rtl"] :host {
      font-family: var(--font-ar);
    }
    
    * {
      font-family: inherit;
    }
  `]
})
export class AppComponent {}
