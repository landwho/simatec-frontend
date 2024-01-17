
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing';
import { DashboardComponent } from './dashboard.component';
import { TableModule } from 'primeng/table';
import { SistematicMenuModule } from '@modules/menu/menu.module';

import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    SistematicMenuModule,
    TableModule,
    InputNumberModule,
    InputTextModule,
    MultiSelectModule,
    RadioButtonModule,
    ButtonModule
  ]
})
export class DashboardModule { }
