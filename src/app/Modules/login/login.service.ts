import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ApiService } from '@core/auth/api.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

    constructor(private ApiService:ApiService){}

    signIn(obj:any){
        return this.ApiService.postMethod('/simatec/api/vi/auth/login', obj, { loaderType:'loader'})
    }

}