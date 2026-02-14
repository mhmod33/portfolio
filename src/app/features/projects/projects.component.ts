import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { portfolioData } from '../../core/utils/portfolio-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  langService = inject(LanguageService);
  projects = portfolioData.projects;

  get devProjects() {
    return this.projects.filter(p => ['Development', 'Portfolio', 'Graduation Project'].includes(p.type || ''));
  }

  get designProjects() {
    return this.projects.filter(p => p.type === 'UI/UX Design');
  }
}
