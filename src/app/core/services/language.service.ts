import { Injectable, signal } from '@angular/core';

export type Language = 'en' | 'ar';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  currentLanguage = signal<Language>('en');

  constructor() {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang) {
      this.currentLanguage.set(savedLang);
    }
    this.applyLanguage();
  }

  toggleLanguage() {
    this.currentLanguage.update(lang => lang === 'en' ? 'ar' : 'en');
    this.applyLanguage();
  }

  private applyLanguage() {
    const lang = this.currentLanguage();
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    if (lang === 'ar') {
      document.body.classList.add('font-arabic');
      document.body.classList.remove('font-english');
    } else {
      document.body.classList.add('font-english');
      document.body.classList.remove('font-arabic');
    }

    localStorage.setItem('language', lang);
  }

  t(translations: { en: string; ar: string }): string {
    return translations[this.currentLanguage()];
  }
}
