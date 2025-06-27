import { Component, inject, effect, DestroyRef } from "@angular/core";
import { NotificationService } from "../../services/notification.service";
import { NotificationStyleDirective } from "../../directives/notification-style.directive";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  imports: [NotificationStyleDirective]
})
export class NotificationComponent {
  private notificationService = inject(NotificationService);
  private destroyRef = inject(DestroyRef);
  
  notification = this.notificationService.notification;
  
  private timeoutId: number | null = null;

  constructor() {
    // Effect runs whenever the notification signal changes
    effect(() => {
      const currentNotification = this.notification();
      
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
      
      if (currentNotification && currentNotification.duration) {
        this.timeoutId = setTimeout(() => {
          this.notificationService.clearNotifications();
          this.timeoutId = null;
        }, currentNotification.duration) as unknown as number;
      }
    });
    
    this.destroyRef.onDestroy(() => {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
    });
  }

  closeNotification() {
    this.notificationService.clearNotifications();
  }
}