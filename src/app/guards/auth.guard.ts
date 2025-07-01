import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MyservicioService } from '../myservicio.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private servicio: MyservicioService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const usuario = await this.servicio.obtenerUsuarioActual();
    if (usuario) {
      return true;
    } else {
      this.router.navigate(['/access']);
      return false;
    }
  }
}
