import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing';


import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    CardModule,
    InputTextModule,
    FieldsetModule,
    AvatarModule,
    AvatarGroupModule,
    ButtonModule,
    PanelModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
