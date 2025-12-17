import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../core/services/language.service';
import { translations } from '../../../core/utils/translations';
import { portfolioData } from '../../../core/utils/portfolio-data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  langService = inject(LanguageService);
  nav = translations.nav;
  footer = translations.footer;
  personalInfo = portfolioData.personalInfo;
  currentYear = new Date().getFullYear();

  t(translation: { en: string; ar: string }): string {
    return this.langService.t(translation);
  }

  scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }
}
