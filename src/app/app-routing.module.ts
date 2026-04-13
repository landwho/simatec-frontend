import { NgModule } from '@angular/core';
import { ExtraOptions, PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  // 🔥 raíz
  {
    path: '',
    redirectTo: 'simatec/login',
    pathMatch: 'full'
  },

  // 🔥 módulo principal
  {
    path: 'simatec',
    children: [
      {
        path: '',
        redirectTo: 'login', // 🔥 IMPORTANTE (evita loops)
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./Modules/login/login-routing')
            .then(m => m.LOGIN_ROUTES),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./Modules/dashboard/dashboard-routing')
            .then(m => m.DASHBOARD_ROUTES),
      },
      {
        path: 'ordenes',
        loadChildren: () =>
          import('./Modules/ordenes/ordenes-routing')
            .then(m => m.ORDENES_ROUTES),
      }
    ]
  },

  // 🔥 fallback global
  {
    path: '**',
    redirectTo: 'simatec/login'
  }
];

const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled',
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule {}