
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { ApiService } from './api.service';
import { environment } from './../../../environments/environment';
import { LoggedUser, LoginModel } from '../models/loginModel.model';
import { MatDialog } from '@angular/material/dialog';
import { UserModel } from '../models/userModel.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  private _currentUser$ = new BehaviorSubject<LoginModel[]>([]);
  currentUser$ = this._currentUser$.asObservable();

  private _sockets$ = new BehaviorSubject<boolean>(false);
  sockets$ = this._sockets$.asObservable();

  private readonly TOKEN_NAME = environment.AUTH_KEY;
  private userLogged?: UserModel;

  constructor(
    private ApiService: ApiService,
    private Router: Router,
    private dialog: MatDialog,
    private CookieService:CookieService
  ) {
    this._isLoggedIn$.next(!!this.token);
  }

  get accessToken(): string {
    return localStorage.getItem(this.TOKEN_NAME) ?? '';
  }
  get token() {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  set currentUserName(user: string) {
    localStorage.setItem('currentUser', user);
  }
  set currentUser(user: LoginModel) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  setLoggedUser(user?: UserModel) {
    this.userLogged = user;
    localStorage.setItem('currentUser', JSON.stringify(this.userLogged));
    this._isLoggedIn$.next(true);
  }

  getLoggedUser() {
    return localStorage.getItem('currentUser') ?? '';
  }

  getCurrentUser(): LoggedUser | null {
    return JSON.parse(localStorage.getItem('currentUser') ?? 'null');
  }

  signIn(user: any) {
    return this.ApiService.postMethod<LoginModel>('/Login', user, { loaderType: 'dna' }).pipe(
      tap(response => {
        // this.currentUserName = JSON.stringify(response.result.usuario);
        // localStorage.setItem(this.TOKEN_NAME, response.token);
        // localStorage.setItem('parametrizations', JSON.stringify(response.parametrizations));
      }),
    );
  }

  
  
  signOut() {
    // Remove token from the local storage
    this.dialog.closeAll();
    localStorage.clear();
    this._isLoggedIn$.next(false);
    this.Router.navigate(['/simatec/login']);
    
  }
}
