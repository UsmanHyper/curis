import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsInformationComponent } from './appointments-information.component';

describe('AppointmentsInformationComponent', () => {
  let component: AppointmentsInformationComponent;
  let fixture: ComponentFixture<AppointmentsInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentsInformationComponent]
    });
    fixture = TestBed.createComponent(AppointmentsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
