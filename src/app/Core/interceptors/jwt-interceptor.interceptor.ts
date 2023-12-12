import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + this.authService.accessToken),
    });
    // Response
    return next.handle(request).pipe(
      catchError((error) => {
          // Catch "401 Unauthorized" responses
          if ( error instanceof HttpErrorResponse && error.status === 401 )
          {
              // Sign out
              this.authService.signOut()
              // Reload the app
              location.reload();
          }
          return throwError(error);
      })
    );
  }
}
