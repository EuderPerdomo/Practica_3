import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionGarantiaComponent } from './gestion-garantia.component';

describe('GestionGarantiaComponent', () => {
  let component: GestionGarantiaComponent;
  let fixture: ComponentFixture<GestionGarantiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionGarantiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionGarantiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
