import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../../core/services/language.service';
import { translations } from '../../../../core/utils/translations';
import { portfolioData } from '../../../../core/utils/portfolio-data';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  langService = inject(LanguageService);
  hero = translations.hero;
  personalInfo = portfolioData.personalInfo;

  t(translation: { en: string; ar: string }): string {
    return this.langService.t(translation);
  }

  downloadCV() {
    window.open('/Mahmoud-Sayed-CV.pdf', '_blank');
  }

}
