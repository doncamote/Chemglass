import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessPage } from './access.page';
import { Router } from '@angular/router';
import { MyservicioService } from '../myservicio.service';
import { FormsModule } from '@angular/forms';

describe('AccessPage', () => {
  let component: AccessPage;
  let fixture: ComponentFixture<AccessPage>;
  let mockServicio: jasmine.SpyObj<MyservicioService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockServicio = jasmine.createSpyObj('MyservicioService', ['registrarUsuario', 'login']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [AccessPage, FormsModule],
      providers: [
        { provide: MyservicioService, useValue: mockServicio },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar mensaje si falta campo en el registro', async () => {
    component.registro = { nombre: '', apellidos: '', email: '', fechaNacimiento: '', password: '' };
    await component.registrar();
    expect(component.mensaje).toContain('completa todos los campos');
  });

  it('debería mostrar mensaje si el correo es inválido', async () => {
    component.registro = {
      nombre: 'Juan',
      apellidos: 'Pérez',
      email: 'correo_invalido',
      fechaNacimiento: '2000-01-01',
      password: 'Password1'
    };
    await component.registrar();
    expect(component.mensaje).toContain('Correo electrónico inválido');
  });

  it('debería registrar correctamente si todo es válido', async () => {
    component.registro = {
      nombre: 'Juan',
      apellidos: 'Pérez',
      email: 'juan@mail.com',
      fechaNacimiento: '2000-01-01',
      password: 'Password1'
    };
    mockServicio.registrarUsuario.and.resolveTo('Usuario registrado exitosamente');
    await component.registrar();
    expect(component.mensaje).toContain('exitosamente');
  });

  it('debería logear correctamente y redirigir si las credenciales son válidas', async () => {
    component.email = 'juan@mail.com';
    component.password = 'Password1';
    mockServicio.login.and.resolveTo({ ok: true, mensaje: 'Login exitoso' });
    await component.login();
    expect(component.mensaje).toBe('Login exitoso');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/tabs/home']);
  });

  it('debería mostrar mensaje de error si el login falla', async () => {
    component.email = 'juan@mail.com';
    component.password = 'Password1';
    mockServicio.login.and.resolveTo({ ok: false, mensaje: 'Credenciales incorrectas' });
    await component.login();
    expect(component.mensaje).toBe('Credenciales incorrectas');
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
