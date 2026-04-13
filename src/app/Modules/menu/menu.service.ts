import { inject, Injectable } from '@angular/core';
import { ApiService } from '@core/auth/api.service';
import { AuthService } from '@core/auth/auth.service';

import { Observable } from 'rxjs';
    
@Injectable({
    providedIn: 'root',
  })


export class MenuService {

    private readonly ApiService = inject(ApiService);
    private readonly AuthService = inject(AuthService)

    logOut() {
        // return this.ApiService.postMethod('/api/auth/logout',{});
        return this.AuthService.signOut()
        
    }

}