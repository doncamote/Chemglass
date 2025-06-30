import { Routes } from '@angular/router';

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
    loadComponent: () => import('./carrito/carrito.page').then( m => m.CarritoPage)
  },
  {
    path: 'agregar',
    loadComponent: () => import('./pages/agregar/agregar.page').then( m => m.AgregarPage)
  },
  {
    path: 'modificar',
    loadComponent: () => import('./pages/modificar/modificar.page').then( m => m.ModificarPage)
  }
];
