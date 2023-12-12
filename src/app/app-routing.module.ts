import { NgModule } from '@angular/core';
import { ExtraOptions, PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'simatec', pathMatch: 'full' },
  {
    path: 'simatec',
    loadChildren: () => import('./Modules/login/login.module').then(m=>m.LoginModule),
  },
  {
    path: 'simatec',
    loadChildren: () => import('./Modules/dashboard/dashboard.module').then(m=>m.DashboardModule),
  },
  {
    path: 'simatec',
    loadChildren: () => import('./Modules/page-view/page-view.module').then(m=>m.PageViewModule),
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
export class AppRoutingModule { }
