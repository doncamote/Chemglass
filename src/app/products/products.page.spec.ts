import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsPage } from './products.page';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CarritoService } from '../services/carrito.service';

describe('ProductsPage', () => {
  let component: ProductsPage;
  let fixture: ComponentFixture<ProductsPage>;
  let carritoService: CarritoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsPage, IonicModule.forRoot(), HttpClientTestingModule],
      providers: [CarritoService]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsPage);
    component = fixture.componentInstance;
    carritoService = TestBed.inject(CarritoService);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a carritoService.agregar() al agregar un producto', () => {
    const producto = { nombre: 'Test', descripcion: '', precio: 1000, imagen: '', infoQuimica: null };
    spyOn(carritoService, 'agregar');
    component.agregarAlCarrito(producto);
    expect(carritoService.agregar).toHaveBeenCalledWith(producto);
  });
});
