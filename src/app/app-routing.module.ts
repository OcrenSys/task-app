import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/list/list.component').then((c) => c.ListComponent),
  },

  {
    path: 'details',
    loadComponent: () =>
      import('./pages/details/details.component').then(
        (c) => c.DetailsComponent
      ),
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
