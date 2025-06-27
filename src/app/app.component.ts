import { Component, OnInit, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageComponent } from "./core/components/language.component";
import { NotificationService } from "./shared/services/notification.service";
import { NotificationComponent } from "./shared/components/notification/notification.component";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, TranslateModule, LanguageComponent, NotificationComponent],
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  title = "base-angular-app";

  private notificationService = inject(NotificationService);

  ngOnInit() {
    this.notificationService.addNotification({
      message: "Welcome to the Base Angular App!",
      duration: 10000,
      type: "success",
    });
  }
}
