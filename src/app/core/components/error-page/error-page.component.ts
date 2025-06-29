import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-error-page",
  templateUrl: "./error-page.component.html",
  imports: [RouterLink, TranslateModule],
})
export class ErrorPageComponent {}
