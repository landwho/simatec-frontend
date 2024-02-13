import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CookieService} from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [CookieService],
  bootstrap: []
})
export class CoreModule { }