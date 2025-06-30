import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('../home/home.page').then(m => m.HomePage),
      },
      {
        path: 'products',
        loadComponent: () => import('../products/products.page').then(m => m.ProductsPage),
      },

      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      }
    ]
  }
];
