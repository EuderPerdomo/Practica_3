import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGarantiaComponent } from './create-garantia.component';

describe('CreateGarantiaComponent', () => {
  let component: CreateGarantiaComponent;
  let fixture: ComponentFixture<CreateGarantiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGarantiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGarantiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
