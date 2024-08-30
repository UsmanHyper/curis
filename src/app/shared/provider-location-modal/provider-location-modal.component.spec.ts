import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderLocationModalComponent } from './provider-location-modal.component';

describe('ProviderLocationModalComponent', () => {
  let component: ProviderLocationModalComponent;
  let fixture: ComponentFixture<ProviderLocationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProviderLocationModalComponent]
    });
    fixture = TestBed.createComponent(ProviderLocationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
