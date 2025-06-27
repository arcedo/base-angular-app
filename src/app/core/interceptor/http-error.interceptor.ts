import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError, retry, timer } from 'rxjs';
import { inject } from '@angular/core';
import { NotificationService } from '../../shared/services/notification.service';
import { getErrorMessage } from '../utils/error-messages.util';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const errorMessage = getErrorMessage(error);

      // Check if this request should skip notifications
      const skipNotification = req.headers.get('X-Skip-Error-Notification') === 'true';
      
      if (!skipNotification) {
        notificationService.addNotification({
          message: errorMessage,
          type: 'error',
          duration: 5000
        });
      }

      console.error('HTTP Error:', {
        status: error.status,
        message: errorMessage,
        url: error.url,
        error: error.error
      });

      return throwError(() => new Error(errorMessage));
    })
  );
};

export const RetryInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.includes('/api/retry') || req.url.includes('/api/no-retry')) {
    return next(req); // Pass through without retry logic
  }

  return next(req).pipe(
    retry({
      count: 3,
      delay: (error) => {
        if (error.status === 503) {
          return timer(2000);
        }
        return timer(1000);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      console.error('Retry request failed:', error);
      return throwError(() => error);
    })
  );
}