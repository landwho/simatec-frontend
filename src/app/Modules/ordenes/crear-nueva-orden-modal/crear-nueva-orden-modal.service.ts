import { inject, Injectable } from '@angular/core';
import { ApiService } from '@core/auth/api.service';
import { DetailsRequestBodyInterfaceModel, OrderInterfaceModel } from './crear-nueva-orden.interface';
import { Observable } from 'rxjs';
import { SharedServices } from '@shared/shared-services/shared-services.service';
    
@Injectable({
    providedIn: 'root',
  })


export class CrearNuevaOrdenModalService {

    private readonly ApiService = inject(ApiService);
    private readonly SharedServices = inject(SharedServices);


    addStudiesOnOrder(idOrder: number, body: DetailsRequestBodyInterfaceModel): Observable<any> {
        return this.ApiService.postMethod<any>('/api/order/'+idOrder+'/detail', body);
    }

    getPhysician(){
        return this.SharedServices.getCatalogos(['physician'])
    }

    createOrder(body: OrderInterfaceModel): Observable<any> {
        return this.ApiService.postMethod<any>('/api/order', body);
    }


}