import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MyservicioService {
 

  isWeb = true;

  async registrarUsuario(nuevoUsuario: any): Promise<string> {
    const usuarios = await this.obtener('usuarios') || [];

    const existe = usuarios.find((u: any) => u.email === nuevoUsuario.email);
    if (existe) return 'Ya existe un usuario registrado con ese correo.';

    usuarios.push(nuevoUsuario);
    await this.guardar('usuarios', usuarios);
    return 'Usuario registrado exitosamente.';
  }

  async login(email: string, password: string): Promise<{ mensaje: string, ok: boolean }> {
    const usuarios = await this.obtener('usuarios') || [];

    const usuario = usuarios.find((u: any) => u.email === email && u.password === password);
    if (usuario) {
      await this.guardar('usuarioActual', usuario);
      return { mensaje: 'Ingreso exitoso', ok: true };
    }

    return { mensaje: 'Credenciales incorrectas', ok: false };
  }

  async obtenerUsuarioActual() {
    return await this.obtener('usuarioActual');
  }

  async cerrarSesion() {
    if (this.isWeb) {
      localStorage.removeItem('usuarioActual');
    } else {
      
    }
  }

  private async obtener(key: string): Promise<any> {
    if (this.isWeb) {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } else {
      
      return null;
    }
  }

  private async guardar(key: string, value: any): Promise<void> {
    if (this.isWeb) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      
    }
  }
}
