import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentViewModalComponent } from './appointment-view-modal.component';

describe('AppointmentViewModalComponent', () => {
  let component: AppointmentViewModalComponent;
  let fixture: ComponentFixture<AppointmentViewModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppointmentViewModalComponent]
    });
    fixture = TestBed.createComponent(AppointmentViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
