import { Routes } from '@angular/router';
import { OrdenesComponent } from './ordenes.component'; 
import { AuthGuard } from '@core/guards/auth.guard';


export const ORDENES_ROUTES: Routes = [
  {
    path: '',
    component: OrdenesComponent,
    canActivate: [AuthGuard]
  }
];