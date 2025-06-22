import { Injectable, inject } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  private translate = inject(TranslateService);
  private readonly STORAGE_KEY = "language";
  private readonly DEFAULT_LANGUAGE = "en";
  public readonly availableLanguages: string[] = ["en", "es"];

  constructor() {
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    const savedLang = localStorage.getItem(this.STORAGE_KEY);
    const browserLang = this.translate.getBrowserLang();
    const supportedLangs = this.availableLanguages;

    let langToUse = this.DEFAULT_LANGUAGE;

    if (savedLang && supportedLangs.includes(savedLang)) {
      langToUse = savedLang;
    } else if (browserLang && supportedLangs.includes(browserLang)) {
      langToUse = browserLang;
    }

    this.translate.setDefaultLang(this.DEFAULT_LANGUAGE);
    this.setLanguage(langToUse);
  }

  public setLanguage(languageCode: string): void {
    if (this.isLanguageSupported(languageCode)) {
      this.translate.use(languageCode);
      localStorage.setItem(this.STORAGE_KEY, languageCode);
    }
  }

  public getCurrentLanguage(): string {
    return this.translate.currentLang || this.DEFAULT_LANGUAGE;
  }

  private isLanguageSupported(languageCode: string): boolean {
    return this.availableLanguages.some((lang) => lang === languageCode);
  }
}
