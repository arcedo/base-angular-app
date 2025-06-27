import { HttpErrorResponse } from "@angular/common/http";

export const getErrorMessage = (error: HttpErrorResponse): string => {
  if (error.error instanceof ErrorEvent) {
    return `Client Error: ${error.error.message}`;
  }

  const errorMessages = new Map<number, string>([
    [400, 'Bad Request: Please check your request parameters'],
    [401, 'Unauthorized: Please log in again'],
    [403, 'Forbidden: You don\'t have permission to access this resource'],
    [404, 'Resource not found'],
    [422, 'Validation failed: Please check your input'],
    [429, 'Too many requests: Please try again later'],
    [500, 'Internal Server Error: Please try again later'],
    [503, 'Service Unavailable: The API is temporarily down']
  ]);

  return errorMessages.get(error.status) ?? `Server Error: ${error.status} - ${error.message}`;
};