import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewRoutingModule } from './page-routing';
import { SharedModule } from '@shared/sharedModule.module';
import { MatIconModule } from '@angular/material/icon';

//components
import { PageViewComponent } from './page-view.component';

@NgModule({
  declarations: [
    // PageViewComponent
  ],
  imports: [
    CommonModule,
    ViewRoutingModule,
    SharedModule,
    MatIconModule
  ]
})
export class PageViewModule { }