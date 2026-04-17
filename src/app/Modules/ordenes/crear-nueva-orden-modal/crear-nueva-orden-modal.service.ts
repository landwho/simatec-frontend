import { inject, Injectable, signal  } from '@angular/core';
import { ApiService } from '@core/auth/api.service';
import { DetailsRequestBodyInterfaceModel, OrderInterfaceModel } from './crear-nueva-orden.interface';
import { Observable } from 'rxjs';
import { SharedServices } from '@shared/shared-services/shared-services.service';
import { OrderListInterface } from '../model/order-list.interface';
    
@Injectable({
    providedIn: 'root',
  })


export class CrearNuevaOrdenModalService {

    private readonly ApiService = inject(ApiService);
    private readonly SharedServices = inject(SharedServices);
    
    private ordersSignal = signal<OrderListInterface[]>([]);
    orders$ = this.ordersSignal.asReadonly();

    addStudiesOnOrder(idOrder: number, body: DetailsRequestBodyInterfaceModel): Observable<any> {
        return this.ApiService.postMethod<any>('/api/order/'+idOrder+'/detail', body);
    }

    getCatalogs(){
        return this.SharedServices.getCatalogos(['physician', 'area' , 'origin', 'test', 'orderType' , 'priceList'])
    }

    createOrder(body: OrderInterfaceModel): Observable<any> {
        return this.ApiService.postMethod<any>('/api/order', body);
    }

    addOrder(order: OrderListInterface) {
        this.ordersSignal.update(prev => [order, ...prev]);
    }


}