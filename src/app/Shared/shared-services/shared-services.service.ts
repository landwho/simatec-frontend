import { inject, Injectable } from '@angular/core';
import { ApiService } from '@core/auth/api.service';
import { CatalogosInterfaceModel,AreaInterfaceModel,PhysicianInterfaceModel, CatalogType } from './shared-services.interface';
import { Observable } from 'rxjs';
    
@Injectable({
    providedIn: 'root',
  })


export class SharedServices {

    private readonly ApiService = inject(ApiService);

    getAreas(): Observable<AreaInterfaceModel[]> {
        return this.ApiService.getMethod<AreaInterfaceModel[]>('/api/area');
    }

    getCatalogos(catalogs: CatalogType[]): Observable<CatalogosInterfaceModel> {
        return this.ApiService.postMethod<CatalogosInterfaceModel>('/api/catalog', {catalogs, "idPriceList":1});
    }

    getBranches(idBranch:number){
        return this.ApiService.getMethod('/api/branch-area/assigned/'+idBranch)
    }



}