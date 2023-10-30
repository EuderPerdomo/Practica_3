import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexGarantiaComponent } from './index-garantia.component';

describe('IndexGarantiaComponent', () => {
  let component: IndexGarantiaComponent;
  let fixture: ComponentFixture<IndexGarantiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexGarantiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexGarantiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
