import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss']
})
export class CarritoPage {
  carrito: any[] = [];

  constructor(
    private carritoService: CarritoService,
    private alertController: AlertController
  ) {}

  ionViewWillEnter() {
    this.carrito = this.carritoService.obtenerCarrito();
  }

  async comprar() {
    const total = this.carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    const detalle = this.carrito.map(p => `${p.nombre} (x${p.cantidad})`).join(', ');

    const alert = await this.alertController.create({
      header: 'Compra realizada',
      message: `Usted compró exitosamente: ${detalle}. Total: $${total}`,
      buttons: ['OK']
    });

    await alert.present();
    this.carritoService.vaciarCarrito();
    this.carrito = [];
  }
}
