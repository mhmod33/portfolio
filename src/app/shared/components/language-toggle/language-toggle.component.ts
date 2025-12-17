import { Component, inject } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  templateUrl: './language-toggle.component.html',
  styleUrls: ['./language-toggle.component.css']
})
export class LanguageToggleComponent {
  private readonly i18n = inject(I18nService);
  
  currentLang = this.i18n.lang;

  async switchLanguage(lang: 'en' | 'ar'): Promise<void> {
    await this.i18n.setLang(lang);
  }

  get currentLanguage(): 'en' | 'ar' {
    return this.currentLang();
  }
}
