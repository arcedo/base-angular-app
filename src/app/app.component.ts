import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { LanguageComponent } from "./core/components/language.component";
import { NotificationComponent } from "./features/notifications/components/notification/notification.component";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, LanguageComponent, NotificationComponent],
  templateUrl: "./app.component.html",
})
export class AppComponent {}
