import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageComponent } from "./core/components/language.component";
import { NotificationComponent } from "./shared/components/notification/notification.component";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, TranslateModule, LanguageComponent, NotificationComponent],
  templateUrl: "./app.component.html",
})
export class AppComponent {
  title = "base-angular-app";
}
