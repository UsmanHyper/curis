import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientViewModalComponent } from './patient-view-modal.component';

describe('PatientViewModalComponent', () => {
  let component: PatientViewModalComponent;
  let fixture: ComponentFixture<PatientViewModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PatientViewModalComponent]
    });
    fixture = TestBed.createComponent(PatientViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
