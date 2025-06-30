import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: any[] = [];

  constructor(private toastController: ToastController) {}

  agregar(producto: any) {
    const existente = this.carrito.find(p => p.nombre === producto.nombre);
    if (existente) {
      existente.cantidad += 1;
    } else {
      this.carrito.push({ ...producto, cantidad: 1 });
    }
    this.mostrarToast('Producto agregado al carrito');
  }

  obtenerCarrito() {
    return this.carrito;
  }

  vaciarCarrito() {
    this.carrito = [];
  }

  private async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }
}
