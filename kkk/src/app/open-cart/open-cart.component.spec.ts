import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenCartComponent } from './open-cart.component';

describe('OpenCartComponent', () => {
  let component: OpenCartComponent;
  let fixture: ComponentFixture<OpenCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
