import { Component } from '@angular/core';
 
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <h1>{{ 'pages.about.title' | translate }}</h1>
    <p>{{ 'pages.about.placeholder' | translate }}</p>
  `,
})
export class AboutPageComponent {}
