import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexDispositivoComponent } from './index-dispositivo.component';

describe('IndexDispositivoComponent', () => {
  let component: IndexDispositivoComponent;
  let fixture: ComponentFixture<IndexDispositivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexDispositivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexDispositivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
