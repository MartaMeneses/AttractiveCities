import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionCiudadesComponent } from './seleccion-ciudades.component';

describe('SeleccionCiudadesComponent', () => {
  let component: SeleccionCiudadesComponent;
  let fixture: ComponentFixture<SeleccionCiudadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionCiudadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionCiudadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
