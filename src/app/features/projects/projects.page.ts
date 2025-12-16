import { Component } from '@angular/core';
 
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <h1>{{ 'pages.projects.title' | translate }}</h1>
    <p>{{ 'pages.projects.placeholder' | translate }}</p>
  `,
})
export class ProjectsPageComponent {}
