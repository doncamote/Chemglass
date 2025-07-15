import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CarritoPage } from './carrito.page';
import { IonicModule, AlertController } from '@ionic/angular';
import { CarritoService } from '../services/carrito.service';

describe('CarritoPage', () => {
  let component: CarritoPage;
  let fixture: ComponentFixture<CarritoPage>;
  let carritoService: CarritoService;
  let alertCtrlSpy: jasmine.SpyObj<AlertController>;

  beforeEach(async () => {
    const alertCtrlMock = jasmine.createSpyObj('AlertController', ['create']);

    await TestBed.configureTestingModule({
      imports: [CarritoPage, IonicModule.forRoot()],
      providers: [
        CarritoService,
        { provide: AlertController, useValue: alertCtrlMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CarritoPage);
    component = fixture.componentInstance;
    carritoService = TestBed.inject(CarritoService);
    alertCtrlSpy = TestBed.inject(AlertController) as jasmine.SpyObj<AlertController>;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería calcular correctamente el total de la compra', () => {
    component.carrito = [
      { nombre: 'Reactivo A', precio: 1000, cantidad: 2 },
      { nombre: 'Reactivo B', precio: 500, cantidad: 3 }
    ];

    const total = component.carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    expect(total).toBe(1000 * 2 + 500 * 3); // 2000 + 1500 = 3500
  });
});
