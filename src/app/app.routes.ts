import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'access',
    pathMatch: 'full',
  },
  {
    path: 'access',
    loadComponent: () => import('./access/access.page').then(m => m.AccessPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then(m => m.TabsPage),
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then(m => m.HomePage)
      },
      {
        path: 'products',
        loadComponent: () => import('./products/products.page').then(m => m.ProductsPage)
      },
      {
        path: 'carrito',
        loadComponent: () => import('./carrito/carrito.page').then(m => m.CarritoPage)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'access'
  },
  {
    path: 'carrito',
    loadComponent: () => import('./carrito/carrito.page').then(m => m.CarritoPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'agregar',
    loadComponent: () => import('./pages/agregar/agregar.page').then(m => m.AgregarPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'modificar',
    loadComponent: () => import('./pages/modificar/modificar.page').then(m => m.ModificarPage),
    canActivate: [AuthGuard]
  }
];
