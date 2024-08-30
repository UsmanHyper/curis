import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderAppointmentModalComponent } from './calender-appointment-modal.component';

describe('CalenderAppointmentModalComponent', () => {
  let component: CalenderAppointmentModalComponent;
  let fixture: ComponentFixture<CalenderAppointmentModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CalenderAppointmentModalComponent]
    });
    fixture = TestBed.createComponent(CalenderAppointmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
