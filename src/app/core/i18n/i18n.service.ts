import { Injectable, signal } from '@angular/core';

type I18nDict = Record<string, any>;

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  readonly lang = signal<'en' | 'ar'>('en');
  readonly dict = signal<I18nDict>({});

  async init(defaultLang: 'en' | 'ar' = 'en'): Promise<void> {
    await this.setLang(defaultLang);
  }

  async setLang(lang: 'en' | 'ar'): Promise<void> {
    if (this.lang() === lang && Object.keys(this.dict()).length > 0) {
      return;
    }

    const res = await fetch(`/i18n/${lang}.json`, { cache: 'no-cache' });
    if (!res.ok) {
      throw new Error(`Failed to load i18n file: /i18n/${lang}.json (${res.status})`);
    }

    const json = (await res.json()) as I18nDict;
    this.lang.set(lang);
    this.dict.set(json);

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  t(key: string, params?: Record<string, string | number>): string {
    const value = this.getByPath(this.dict(), key);

    if (typeof value === 'string') {
      return this.interpolate(value, params);
    }

    if (Array.isArray(value)) {
      return value.join(', ');
    }

    return key;
  }

  private getByPath(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => (acc == null ? acc : acc[part]), obj);
  }

  private interpolate(template: string, params?: Record<string, string | number>): string {
    if (!params) return template;

    return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_match, key) => {
      const value = params[key];
      return value == null ? '' : String(value);
    });
  }
}
