import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHoursComponent } from './add-hours.component';

describe('AddHoursComponent', () => {
  let component: AddHoursComponent;
  let fixture: ComponentFixture<AddHoursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddHoursComponent]
    });
    fixture = TestBed.createComponent(AddHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
