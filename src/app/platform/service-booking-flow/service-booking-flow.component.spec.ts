import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceBookingFlowComponent } from './service-booking-flow.component';

describe('ServiceBookingFlowComponent', () => {
  let component: ServiceBookingFlowComponent;
  let fixture: ComponentFixture<ServiceBookingFlowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ServiceBookingFlowComponent]
    });
    fixture = TestBed.createComponent(ServiceBookingFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
