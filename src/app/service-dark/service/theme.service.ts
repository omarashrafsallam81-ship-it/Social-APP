import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  // الحالة الحالية للـ Dark Mode
  readonly isDarkMode = signal(localStorage.getItem('darkMode') === 'true');

  constructor() {
    // تطبيق الـ Theme أول ما التطبيق يشتغل
    this.applyTheme();
  }

  toggleTheme(): void {
    // عكس الحالة الحالية
    this.isDarkMode.update((value) => !value);

    // حفظ الحالة
    localStorage.setItem('darkMode', this.isDarkMode().toString());

    // تطبيق الـ Theme
    this.applyTheme();
  }

  private applyTheme(): void {
    document.documentElement.classList.toggle('dark', this.isDarkMode());
  }
}
