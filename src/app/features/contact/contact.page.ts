import { Component } from '@angular/core';
 
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <h1>{{ 'pages.contact.title' | translate }}</h1>
    <p>{{ 'pages.contact.placeholder' | translate }}</p>
  `,
})
export class ContactPageComponent {}
