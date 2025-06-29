import { Injectable, inject } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterStateSnapshot, TitleStrategy } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { take, catchError } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class CustomTitleStrategy extends TitleStrategy {
  private title = inject(Title);
  private translateService = inject(TranslateService);

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.translateService
        .get(title)
        .pipe(
          take(1),
          catchError((error) => {
            console.error("Translation failed, using fallback:", error);
            return of(title);
          }),
        )
        .subscribe((translatedTitle) => {
          this.title.setTitle(translatedTitle);
        });
    }
  }
}
