import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
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
    
    main {
      flex: 1;
    }
  `]
})
export class AppComponent {}
