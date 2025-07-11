import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../services/carrito.service';
import { HttpClient } from '@angular/common/http';

interface InfoQuimica {
  MolecularFormula: string;
  MolecularWeight: string;
}

interface Producto {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  quimico?: string;
  infoQuimica: InfoQuimica | null;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  ]
})
export class ProductsPage {
  productos: Producto[] = [
    // Reactivos químicos
    {
      nombre: 'Ácido sulfúrico',
      descripcion: 'Concentrado 98%',
      precio: 15000,
      imagen: 'assets/productos/acid-sulfuric.jpg',
      quimico: 'sulfuric acid',
      infoQuimica: null
    },
    {
      nombre: 'Cloruro de sodio',
      descripcion: 'Sal común pura',
      precio: 3500,
      imagen: 'assets/productos/sodium-chloride.jpg',
      quimico: 'sodium chloride',
      infoQuimica: null
    },
    {
      nombre: 'Etanol',
      descripcion: 'Alcohol etílico 96%',
      precio: 7800,
      imagen: 'assets/productos/etanol.webp',
      quimico: 'ethanol',
      infoQuimica: null
    },
    {
      nombre: 'Acetona',
      descripcion: 'Disolvente puro',
      precio: 6900,
      imagen: 'assets/productos/acetone.webp',
      quimico: 'acetone',
      infoQuimica: null
    },

    // Volumétricos clásicos
    { nombre: 'Matraz aforado 100ml', descripcion: 'Vidrio, clase A', precio: 6500, imagen: 'assets/productos/matraz.jpg', infoQuimica: null },
    { nombre: 'Pipeta graduada 10ml', descripcion: 'Plástico, uso general', precio: 3200, imagen: 'assets/productos/pipeta.jpg', infoQuimica: null },
    { nombre: 'Bureta 50ml', descripcion: 'Vidrio con llave PTFE', precio: 9400, imagen: 'assets/productos/bureta.jpg', infoQuimica: null },
    { nombre: 'Probeta 100ml', descripcion: 'Plástico, base ancha', precio: 4800, imagen: 'assets/productos/probeta.webp', infoQuimica: null },
    { nombre: 'Vaso precipitado 250ml', descripcion: 'Vidrio borosilicato', precio: 2700, imagen: 'assets/productos/vaso.webp', infoQuimica: null },
    { nombre: 'Erlenmeyer 250ml', descripcion: 'Vidrio con graduación', precio: 4100, imagen: 'assets/productos/erlenmeyer.png', infoQuimica: null },
    { nombre: 'Cilindro medidor 50ml', descripcion: 'Plástico transparente, clase B', precio: 3200, imagen: 'assets/productos/cilindro.jpg', infoQuimica: null },
    { nombre: 'Matraz balón 500ml', descripcion: 'Vidrio redondo fondo plano', precio: 7300, imagen: 'assets/productos/matraz-balon.png', infoQuimica: null },
    { nombre: 'Botella de reactivo ámbar 250ml', descripcion: 'Con tapa a rosca, vidrio ámbar', precio: 5600, imagen: 'assets/productos/botella.png', infoQuimica: null }
  ];

  constructor(
    private carritoService: CarritoService,
    private http: HttpClient
  ) {}

  agregarAlCarrito(producto: Producto) {
    this.carritoService.agregar(producto);
  }

  obtenerInfoQuimica(producto: Producto) {
    if (!producto.quimico) return;

    const nombreBuscado = encodeURIComponent(producto.quimico);
    const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${nombreBuscado}/property/MolecularFormula,MolecularWeight/JSON`;

    this.http.get<any>(url).subscribe({
      next: (res) => {
        const props = res?.PropertyTable?.Properties?.[0];
        if (props) {
          producto.infoQuimica = {
            MolecularFormula: props.MolecularFormula,
            MolecularWeight: parseFloat(props.MolecularWeight).toFixed(2)

          };
        } else {
          producto.infoQuimica = {
            MolecularFormula: 'N/A',
            MolecularWeight: 'N/A'
          };
        }
      },
      error: () => {
        producto.infoQuimica = {
          MolecularFormula: 'Error',
          MolecularWeight: 'Error'
        };
      }
    });
  }
}
