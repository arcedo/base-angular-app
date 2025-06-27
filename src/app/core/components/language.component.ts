import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageService } from "../services/language.service";

@Component({
  selector: "app-language-selector",
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="flex gap-2 items-center">
      @for (lang of availableLanguages; track lang) {
        <button
          [class]="
            'text-black/50 text-sm font-semibold transition-colors duration-200 hover:text-black cursor-pointer ' +
            (currentLanguage === lang ? 'underline text-black/90' : '')
          "
          (click)="changeLang(lang)"
        >
          {{ lang.toUpperCase() }}
        </button>
      }
    </div>
  `,
})
export class LanguageComponent {
  private languageService = inject(LanguageService);

  public get availableLanguages(): string[] {
    return this.languageService.availableLanguages;
  }

  public get currentLanguage(): string {
    return this.languageService.getCurrentLanguage();
  }

  public changeLang(lang: string): void {
    this.languageService.setLanguage(lang);
  }
}
