import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshDone$ = new BehaviorSubject<string | null>(null);

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.addAuthHeader(request, this.authService.accessToken);

    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401(request, next);
        }
        return throwError(() => error);
      })
    );
  }

  private handle401(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.authService.refreshToken) {
      this.authService.signOut();
      return throwError(() => new Error('No refresh token'));
    }

    if (this.isRefreshing) {
      // Queue this request until refresh completes
      return this.refreshDone$.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => next.handle(this.addAuthHeader(request, token!)))
      );
    }

    this.isRefreshing = true;
    this.refreshDone$.next(null);

    return this.authService.refreshAccessToken().pipe(
      switchMap((response) => {
        this.isRefreshing = false;
        this.refreshDone$.next(response.accessToken);
        return next.handle(this.addAuthHeader(request, response.accessToken));
      }),
      catchError((err) => {
        this.isRefreshing = false;
        this.authService.signOut();
        return throwError(() => err);
      })
    );
  }

  private addAuthHeader(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token),
    });
  }
}
