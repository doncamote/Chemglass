import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { MyservicioService } from '../myservicio.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {
  segment = 'home';
  imagenes: string[] = [];
  ubicacion: string = '...';
  usuario: any = null;

  slideOpts = {
    initialSlide: 0,
    speed: 500,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    }
  };

  constructor(
    private router: Router,
    private userService: MyservicioService
  ) {}

  async ngOnInit() {
    this.usuario = await this.userService.obtenerUsuarioActual();

    this.cargarImagenesUnsplash();

    if (this.usuario) {
      this.obtenerUbicacion();
    }
  }

  irAProductos() {
    this.router.navigate(['/tabs/products']);
  }

  cargarImagenesUnsplash() {
    this.imagenes = [
      'https://images.unsplash.com/photo-1508385082359-f07e6e0fbd5d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228724-4b7c8a02e0a6?auto=format&fit=crop&w=800&q=80'
    ];
  }

  async obtenerUbicacion() {
    try {
      if (!('geolocation' in navigator)) {
        this.ubicacion = 'Geolocalización no soportada';
        return;
      }

      navigator.geolocation.getCurrentPosition(async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        if (!response.ok) {
          this.ubicacion = 'Error al obtener ubicación';
          return;
        }

        const data = await response.json();
        this.ubicacion = data.address.city || data.address.town || data.address.village || 'Ubicación desconocida';
      }, (err) => {
        this.ubicacion = 'Permiso de ubicación denegado o error';
      });
    } catch (error) {
      this.ubicacion = 'Error al obtener ubicación';
    }
  }
}
