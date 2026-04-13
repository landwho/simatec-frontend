
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { JwtInterceptor } from '@core/interceptors/jwt-interceptor.interceptor';
import Aura from '@primeng/themes/aura';
import Lara from '@primeng/themes/lara'
import { providePrimeNG } from 'primeng/config';
import { SistematicMenuComponent } from '@modules/menu/menu.component';

@NgModule({ declarations: [
        AppComponent, 
    ],
    bootstrap: [AppComponent],
    imports: [BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SistematicMenuComponent
    ], providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true,
        },
        provideHttpClient(withInterceptorsFromDi()),
        providePrimeNG({
            theme: {
                preset: Lara,
                options: { colorScheme: 'light' }
            }
        })
    ] })
export class AppModule { }