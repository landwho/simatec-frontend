import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/sharedModule.module';
import { MatIconModule } from '@angular/material/icon';
import { SistematicMenuComponent } from './menu.component';
import { MenubarModule } from 'primeng/menubar';
//components

@NgModule({
  declarations: [
    SistematicMenuComponent
  ],
  exports:[SistematicMenuComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    MenubarModule
  ]
})
export class SistematicMenuModule { }
