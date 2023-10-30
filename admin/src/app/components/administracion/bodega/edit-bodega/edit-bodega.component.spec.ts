import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBodegaComponent } from './edit-bodega.component';

describe('EditBodegaComponent', () => {
  let component: EditBodegaComponent;
  let fixture: ComponentFixture<EditBodegaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBodegaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBodegaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
