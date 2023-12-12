import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(
    private AuthService: AuthService,
    private Router: Router,
  ) {}

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let isLogged = false;

    this.AuthService.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.Router.navigate(['/simatec/dashboard']);
      }

      isLogged = isLoggedIn;
    });

    return !isLogged;
  }
}
