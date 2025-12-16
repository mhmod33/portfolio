import { Component } from '@angular/core';
 
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-case-studies-page',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <h1>{{ 'pages.caseStudies.title' | translate }}</h1>
    <p>{{ 'pages.caseStudies.placeholder' | translate }}</p>
  `,
})
export class CaseStudiesPageComponent {}
