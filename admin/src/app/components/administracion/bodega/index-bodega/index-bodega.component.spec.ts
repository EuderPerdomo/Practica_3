import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexBodegaComponent } from './index-bodega.component';

describe('IndexBodegaComponent', () => {
  let component: IndexBodegaComponent;
  let fixture: ComponentFixture<IndexBodegaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexBodegaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexBodegaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
