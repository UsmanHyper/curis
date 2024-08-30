import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderAppointmentDetailsComponent } from './provider-appointment-details.component';

describe('ProviderAppointmentDetailsComponent', () => {
  let component: ProviderAppointmentDetailsComponent;
  let fixture: ComponentFixture<ProviderAppointmentDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProviderAppointmentDetailsComponent]
    });
    fixture = TestBed.createComponent(ProviderAppointmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
