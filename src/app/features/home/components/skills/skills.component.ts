import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../../core/services/language.service';
import { translations } from '../../../../core/utils/translations';
import { portfolioData } from '../../../../core/utils/portfolio-data';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  langService = inject(LanguageService);
  skills = translations.skills;
  portfolioSkills = portfolioData.skills;

  t(translation: { en: string; ar: string }): string {
    return this.langService.t(translation);
  }
}
