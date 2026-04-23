
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoaderService } from '../loader/loader.service';
import { TranslocoService } from '@jsverse/transloco';
type ApiLoaderType = 'loader' | 'dna' | 'skeleton' | 'none';
type ApiMoreOptions = {
  params?: any,
  loaderType?: ApiLoaderType,
  silent?: boolean
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  message: any;
  constructor(
    private HttpClient: HttpClient,
    private MatSnackBar: MatSnackBar,
    private Router: Router,
    private LoaderService: LoaderService,
    private translocoService: TranslocoService
  ) {}

  showLoader(loaderType: ApiLoaderType = "loader") {
    if(loaderType === 'loader') this.LoaderService.showLoader();
    if(loaderType === 'dna') this.LoaderService.showDNALoader();
    if(loaderType === 'skeleton') this.LoaderService.showSkeletonLoader();
  }

  hideLoader(loaderType: ApiLoaderType = "loader") {
    if(loaderType === 'loader') this.LoaderService.hideLoader();
    if(loaderType === 'dna') this.LoaderService.hideDNALoader();
    if(loaderType === 'skeleton') this.LoaderService.hideSkeletonLoader();
  }

  getMethod<T>(endpoint: string, { params, loaderType }: ApiMoreOptions = {}) {
    this.showLoader(loaderType);
    const url = `${environment.URLBase}${endpoint}`;
    return this.HttpClient.get<T>(url, { params,  withCredentials:true }).pipe(
      tap(response => {
        this.hideLoader(loaderType);
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        this.hideLoader(loaderType);
        if (error.status == 0) this.showErrorMessage(this.translocoService.translate('errorCode.CX_DENIED'));
        if (!error.ok) this.showErrorMessage(error.error.errors?.msg);
        this.showErrorMessage(this.translocoService.translate(`errorCode.${error.error.errorCode ?? 'DEFAULT'}`));
        return throwError(()=>true);
      }),
    );
  }

  postMethod<T>(endpoint: string, data: any, { params, loaderType, silent }: ApiMoreOptions = {}) {
    const url = `${environment.URLBase}${endpoint}`;
    this.showLoader(loaderType);
    if (loaderType !== 'none') this.LoaderService.showSpiner();
    return this.HttpClient.post<T>(url, data, { params, withCredentials:true }).pipe(
      tap(() => {
        this.hideLoader(loaderType);
      }),
      catchError((error: HttpErrorResponse) => {
        this.hideLoader(loaderType);
        if (!silent) {
          if (error.status == 0) this.showErrorMessage("ERR_CONNECTION_REFUSED");
          this.showErrorMessage(error.error.message);
        }
        return throwError(() => error);
      }),
    );
  }

  putMethod<T>(endpoint: string, data: any, { params, loaderType }: ApiMoreOptions = {}){
    const url = `${environment.URLBase}${endpoint}`;
    this.showLoader(loaderType);
    return this.HttpClient.put<T>(url, data, { params,  withCredentials:true }).pipe(
      tap(() => {
        this.hideLoader(loaderType);
      }),
      catchError((error: HttpErrorResponse) => {
        this.hideLoader(loaderType);

        if (error.status == 0) {
          this.showErrorMessage(this.translocoService.translate('errorCode.CX_DENIED'));
        }

        this.showErrorMessage(this.translocoService.translate(`errorCode.${error.error.errorCode ?? 'DEFAULT'}`));
        return throwError(()=> true);
      }),
    );
  }

  
  

  showErrorMessage(message: string) {
    return this.MatSnackBar.open(message, '', {
      duration: 4000,
      verticalPosition: 'top',
      panelClass: ['error-snackbar', 'text-white'],
    });
  }

  showSuccessMessage(message: string) {
    return this.MatSnackBar.open(message, '', {
      duration: 4000,
      verticalPosition: 'top',
      panelClass: ['success-snackbar', 'text-white'],
    });
  }






}
