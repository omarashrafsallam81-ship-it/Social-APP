import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type Language = 'en' | 'ar';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly translate = inject(TranslateService);

  readonly currentLanguage = signal<Language>('en');

  constructor() {
    this.initializeLanguage();
  }

  // Initialize language when application starts
  private initializeLanguage(): void {
    const savedLanguage = localStorage.getItem('language');

    const language: Language = savedLanguage === 'ar' ? 'ar' : 'en';

    this.changeLanguage(language);
  }

  // Change application language
  changeLanguage(language: Language): void {
    this.translate.use(language);

    this.currentLanguage.set(language);

    localStorage.setItem('language', language);

    document.documentElement.lang = language;

    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }

  // Toggle between Arabic and English
  toggleLanguage(): void {
    const language: Language = this.currentLanguage() === 'en' ? 'ar' : 'en';

    this.changeLanguage(language);
  }
}
