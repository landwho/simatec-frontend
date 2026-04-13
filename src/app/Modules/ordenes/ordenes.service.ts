import { inject, Injectable } from '@angular/core';
import { ApiService } from '@core/auth/api.service';
import { OrderListInterface } from './model/order-list.interface';
import { Observable } from 'rxjs';
    
@Injectable({
    providedIn: 'root',
  })


export class OrdenesService {

    private readonly ApiService = inject(ApiService);

    getOrderList(): Observable<OrderListInterface[]> {
        return this.ApiService.getMethod('/api/order',{loaderType: 'loader' });
    }

}