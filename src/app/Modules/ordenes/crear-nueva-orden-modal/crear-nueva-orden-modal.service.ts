import { inject, Injectable } from '@angular/core';
import { ApiService } from '@core/auth/api.service';

import { Observable } from 'rxjs';
    
@Injectable({
    providedIn: 'root',
  })


export class CrearNuevaOrdenModalService {

    private readonly ApiService = inject(ApiService);



}