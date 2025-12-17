import { Component } from '@angular/core';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.css']
})
export class ProjectsPageComponent {}
