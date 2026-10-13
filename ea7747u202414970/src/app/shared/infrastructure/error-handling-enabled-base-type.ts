import {HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';


/**
 * Base type for infrastructure objects that perform HTTP requests and need
 * to turn an HTTP failure into a readable error.
 *
 * @author Carla Gallardo
 */
export abstract class ErrorHandlingEnabledBaseType {
  /**
   * Builds an error handler that turns an HTTP failure into a readable error.
   *
   * @param operation - The description of the operation that failed.
   * @returns A function that maps the HTTP error into an error observable.
   */
  protected handleError(operation: string) {
    return (error: HttpErrorResponse): Observable<never> => {
      let message = operation;
      if (error.status === 404) {
        message = `${operation}: Resource not found`;
      } else if (error.error instanceof ErrorEvent) {
        message = `${operation}: ${error.error.message}`;
      } else {
        message = `${operation}: ${error.statusText || 'Unexpected error'}`;
      }
      return throwError(() => new Error(message));
    };
  }
}
