import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../../core/services/language.service';
import { translations } from '../../../../core/utils/translations';
import { portfolioData } from '../../../../core/utils/portfolio-data';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  langService = inject(LanguageService);
  about = translations.about;
  stats = portfolioData.stats;

  t(translation: { en: string; ar: string }): string {
    return this.langService.t(translation);
  }
}
