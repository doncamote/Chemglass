import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
  IonSegmentButton,
  IonRow,
  IonCol,
  IonCardSubtitle
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
    IonCardSubtitle,
    IonText,
    IonNote,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    IonSegment,
    IonSegmentButton,
    IonRow,
    IonCol
  ]
})
export class AccessPage implements OnInit {
  email = '';
  password = '';
  mensaje = '';
  segmento = 'login';

  registro = {
    nombre: '',
    apellidos: '',
    email: '',
    fechaNacimiento: '',
    password: ''
  };

  productos = [
    {
      nombre: 'Matraz aforado 100ml',
      descripcion: 'Vidrio, clase A',
      precio: 6500,
      imagen: 'assets/productos/matraz.jpg'
    },
    {
      nombre: 'Pipeta graduada 10ml',
      descripcion: 'Plástico, uso general',
      precio: 3200,
      imagen: 'assets/productos/pipeta.jpg'
    },
    {
      nombre: 'Bureta 50ml',
      descripcion: 'Vidrio con llave PTFE',
      precio: 9400,
      imagen: 'assets/productos/bureta.jpg'
    },
    {
      nombre: 'Erlenmeyer 250ml',
      descripcion: 'Vidrio con graduación',
      precio: 4100,
      imagen: 'assets/productos/erlenmeyer.png',
      infoQuimica: null
    }
  ];


  constructor(private servicio: MyservicioService, private router: Router) {}

  ngOnInit(): void {}

  async registrar() {
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

    const mensaje = await this.servicio.registrarUsuario({ nombre, apellidos, email, fechaNacimiento, password });
    this.mensaje = mensaje;

    if (mensaje.includes('exitosamente')) {
      this.registro = { nombre: '', apellidos: '', email: '', fechaNacimiento: '', password: '' };
    }
  }

  async login() {
    const resultado = await this.servicio.login(this.email, this.password);
    this.mensaje = resultado.mensaje;

    if (resultado.ok) {
      this.router.navigate(['/tabs/home']);
    }
  }
}
