import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaytmGetwayComponent } from './paytm-getway.component';

describe('PaytmGetwayComponent', () => {
  let component: PaytmGetwayComponent;
  let fixture: ComponentFixture<PaytmGetwayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaytmGetwayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaytmGetwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
