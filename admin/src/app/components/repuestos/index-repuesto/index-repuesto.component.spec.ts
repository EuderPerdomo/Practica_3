import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexRepuestoComponent } from './index-repuesto.component';

describe('IndexRepuestoComponent', () => {
  let component: IndexRepuestoComponent;
  let fixture: ComponentFixture<IndexRepuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexRepuestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexRepuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
