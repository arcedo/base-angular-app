import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError, retry, timer } from 'rxjs';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred';
      
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Client Error: ${error.error.message}`;
      } else {
        switch (error.status) {
          case 400:
            errorMessage = 'Bad Request: Please check your request parameters';
            break;
          case 404:
            errorMessage = 'Resource not found';
            break;
          case 500:
            errorMessage = 'Internal Server Error: Please try again later';
            break;
          case 503:
            errorMessage = 'Service Unavailable: The API is temporarily down';
            break;
          default:
            errorMessage = `Server Error: ${error.status} - ${error.message}`;
        }
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