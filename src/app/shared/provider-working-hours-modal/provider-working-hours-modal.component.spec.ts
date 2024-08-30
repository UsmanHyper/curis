import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderWorkingHoursModalComponent } from './provider-working-hours-modal.component';

describe('ProviderWorkingHoursModalComponent', () => {
  let component: ProviderWorkingHoursModalComponent;
  let fixture: ComponentFixture<ProviderWorkingHoursModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProviderWorkingHoursModalComponent]
    });
    fixture = TestBed.createComponent(ProviderWorkingHoursModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
