import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from '@core/auth/api.service';
import { OrderListInterface } from './model/order-list.interface';
import { Observable } from 'rxjs';
    
@Injectable({
    providedIn: 'root',
  })


export class OrdenesService {

    private readonly ApiService = inject(ApiService);
    private ordersSignal = signal<OrderListInterface[]>([]);
    orders$ = this.ordersSignal.asReadonly();

    getOrderList(): Observable<OrderListInterface[]> {
        return this.ApiService.getMethod('/api/order',{loaderType: 'loader' });
    }

    setOrders(data: OrderListInterface[]) {
        this.ordersSignal.set(data);
    }

    addOrder(order: OrderListInterface) {
        this.ordersSignal.update(prev => [...prev, order]); 
    }

}