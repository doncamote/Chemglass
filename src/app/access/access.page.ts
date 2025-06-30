import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,    
  IonNote,
  IonSegment,
  IonSegmentButton
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { MyservicioService } from '../myservicio.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-access',
  templateUrl: './access.page.html',
  styleUrls: ['./access.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonText,
    IonNote,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    IonSegment,
    IonSegmentButton
  ]
})
export class AccessPage implements OnInit {
  email = '';
  password = '';
  mensaje = '';
  segmento = 'login';

  productos = [
    { nombre: 'Matraz aforado 100ml', descripcion: 'Vidrio, clase A', precio: 6500 },
    { nombre: 'Pipeta graduada 10ml', descripcion: 'Plástico, uso general', precio: 3200 },
    { nombre: 'Bureta 50ml', descripcion: 'Vidrio con llave PTFE', precio: 9400 }
  ];

  constructor(private servicio: MyservicioService, private router: Router) {}

  ngOnInit(): void {}

  registro = {
    nombre: '',
    apellidos: '',
    email: '',
    fechaNacimiento: '',
    password: ''
  };

  registrar() {
    const { nombre, apellidos, email, fechaNacimiento, password } = this.registro;

    if (!nombre || !apellidos || !email || !fechaNacimiento || !password) {
      this.mensaje = 'Por favor, completa todos los campos.';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.mensaje = 'Correo electrónico inválido.';
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!passwordRegex.test(password)) {
      this.mensaje = 'La contraseña debe contener al menos una mayúscula, una minúscula y un número.';
      return;
    }

    const fecha = new Date(fechaNacimiento);
    const hoy = new Date();
    if (fecha > hoy) {
      this.mensaje = 'La fecha de nacimiento no puede ser futura.';
      return;
    }
    
    let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    if (usuarios.find((u: any) => u.email === email)) {
    this.mensaje = 'Ya existe un usuario registrado con ese correo.';
    return;
  }

    usuarios.push({ nombre, apellidos, email, fechaNacimiento, password });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    this.mensaje = 'Usuario registrado exitosamente.';
    console.log('Registrando usuario:', this.registro);

    this.registro = { nombre: '', apellidos: '', email: '', fechaNacimiento: '', password: '' };
  }

  login() {
  let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

  const usuarioEncontrado = usuarios.find((u: any) => u.email === this.email && u.password === this.password);

  if (usuarioEncontrado) {
    this.mensaje = 'Ingreso exitoso';
    this.router.navigate(['/tabs/home']);
  } else {
    this.mensaje = 'Credenciales incorrectas';
  }
}
}
