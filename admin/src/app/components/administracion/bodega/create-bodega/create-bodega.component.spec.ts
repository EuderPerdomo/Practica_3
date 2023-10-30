import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBodegaComponent } from './create-bodega.component';

describe('CreateBodegaComponent', () => {
  let component: CreateBodegaComponent;
  let fixture: ComponentFixture<CreateBodegaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBodegaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBodegaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
