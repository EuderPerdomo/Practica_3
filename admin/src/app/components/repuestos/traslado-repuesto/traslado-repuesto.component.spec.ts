import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrasladoRepuestoComponent } from './traslado-repuesto.component';

describe('TrasladoRepuestoComponent', () => {
  let component: TrasladoRepuestoComponent;
  let fixture: ComponentFixture<TrasladoRepuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrasladoRepuestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrasladoRepuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
