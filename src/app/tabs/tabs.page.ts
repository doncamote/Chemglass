import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { MyservicioService } from '../myservicio.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'], 
  standalone: true,
  imports: [IonicModule, RouterModule]
})
export class TabsPage implements OnInit {
  constructor(
    private servicio: MyservicioService,
    private router: Router
  ) {}

  async ngOnInit() {
    const usuario = await this.servicio.obtenerUsuarioActual();
    if (!usuario) {
      this.router.navigate(['/access']);
    }
  }

  async cerrarSesion() {
    await this.servicio.cerrarSesion();
    this.router.navigate(['/access']);
  }
}
