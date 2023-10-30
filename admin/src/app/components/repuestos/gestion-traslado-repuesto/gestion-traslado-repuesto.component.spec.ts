import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTrasladoRepuestoComponent } from './gestion-traslado-repuesto.component';

describe('GestionTrasladoRepuestoComponent', () => {
  let component: GestionTrasladoRepuestoComponent;
  let fixture: ComponentFixture<GestionTrasladoRepuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionTrasladoRepuestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionTrasladoRepuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
