import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ApiService } from '@core/auth/api.service';
import { AuthService } from '@core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

    // private Subject     = inject(Subject)
    // private HttpClient  = inject(HttpClient)
    private readonly AuthService = inject(AuthService)

    constructor(private ApiService:ApiService){}

    signIn(obj:any){
        return this.AuthService.signIn( obj)
    }

}