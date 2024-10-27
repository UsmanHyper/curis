import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFeedbackSurveyComponent } from './patient-feedback-survey.component';

describe('PatientFeedbackSurveyComponent', () => {
  let component: PatientFeedbackSurveyComponent;
  let fixture: ComponentFixture<PatientFeedbackSurveyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PatientFeedbackSurveyComponent]
    });
    fixture = TestBed.createComponent(PatientFeedbackSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
