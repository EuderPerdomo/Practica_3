import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDispositivoComponent } from './create-dispositivo.component';

describe('CreateDispositivoComponent', () => {
  let component: CreateDispositivoComponent;
  let fixture: ComponentFixture<CreateDispositivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDispositivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDispositivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
