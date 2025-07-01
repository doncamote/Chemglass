import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class ProductsPage {
  productos = [
  { nombre: 'Matraz aforado 100ml', descripcion: 'Vidrio, clase A', precio: 6500, imagen: 'assets/productos/matraz.jpg' },
  { nombre: 'Pipeta graduada 10ml', descripcion: 'Plástico, uso general', precio: 3200, imagen: 'assets/productos/pipeta.jpg' },
  { nombre: 'Bureta 50ml', descripcion: 'Vidrio con llave PTFE', precio: 9400, imagen: 'assets/productos/bureta.jpg' },
  { nombre: 'Probeta 100ml', descripcion: 'Plástico, base ancha', precio: 4800, imagen: 'assets/productos/probeta.webp' },
  { nombre: 'Vaso precipitado 250ml', descripcion: 'Vidrio borosilicato', precio: 2700, imagen: 'assets/productos/vaso.webp' },
  { nombre: 'Erlenmeyer 250ml', descripcion: 'Vidrio con graduación', precio: 4100, imagen: 'assets/productos/erlenmeyer.png' },
  { nombre: 'Cilindro medidor 50ml', descripcion: 'Plástico transparente, clase B', precio: 3200, imagen: 'assets/productos/cilindro.jpg' },
  { nombre: 'Matraz balón 500ml', descripcion: 'Vidrio redondo fondo plano', precio: 7300, imagen: 'assets/productos/matraz-balon.png' },
  { nombre: 'Botella de reactivo ámbar 250ml', descripcion: 'Con tapa a rosca, vidrio ámbar', precio: 5600, imagen: 'assets/productos/botella.png' }
  ];

  constructor(private carritoService: CarritoService) {}

  agregarAlCarrito(producto: any) {
    this.carritoService.agregar(producto);
  }
}

