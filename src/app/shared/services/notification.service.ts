import { Injectable, signal } from "@angular/core";

interface Notification {
  message: string;
  duration?: number;
  type?: "success" | "error" | "info";
}

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  notification = signal<Notification | null>(null);

  addNotification(newNotification: Notification) {
    this.notification.set(newNotification);
  }

  clearNotifications() {
    this.notification.set(null);
  }
}