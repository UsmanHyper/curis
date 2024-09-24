import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsInformationComponent } from './patients-information.component';

describe('PatientsInformationComponent', () => {
  let component: PatientsInformationComponent;
  let fixture: ComponentFixture<PatientsInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientsInformationComponent]
    });
    fixture = TestBed.createComponent(PatientsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
