import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { toastDefaultConfig, ToastNotificationInput } from '@core/models/toast-config.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  toasts: ToastNotificationInput[] = [];

  constructor(
    public snackBar: MatSnackBar
  ) { }

  showToast(data: ToastNotificationInput): void {
    this.toasts.push(data);
    this.displayToast(data);
  }

  removeToast(notif: ToastNotificationInput): void {
    this.toasts = this.toasts.filter((toast) => toast !== notif);
  }

  clearToasts(): void {
    this.toasts.splice(0, this.toasts.length);
  }


  /**
   * Display toast notification
   * @param data
   */
  displayToast(data: ToastNotificationInput) {
    this.snackBar.open(data.content, data?.action || 'OK', {
      horizontalPosition: data?.horizontalPosition,
      verticalPosition: data?.verticalPosition,
      duration: data?.duration || toastDefaultConfig.duration
    })
  }
}
