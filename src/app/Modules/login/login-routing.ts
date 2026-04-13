import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { NoAuthGuard } from '@core/guards/no-auth.guard';

export const LOGIN_ROUTES: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [NoAuthGuard]
  }
];