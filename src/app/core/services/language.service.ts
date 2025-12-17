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
    localStorage.setItem('language', lang);
  }

  t(translations: { en: string; ar: string }): string {
    return translations[this.currentLanguage()];
  }
}
