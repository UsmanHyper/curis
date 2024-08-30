import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderRatesModalComponent } from './provider-rates-modal.component';

describe('ProviderRatesModalComponent', () => {
  let component: ProviderRatesModalComponent;
  let fixture: ComponentFixture<ProviderRatesModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProviderRatesModalComponent]
    });
    fixture = TestBed.createComponent(ProviderRatesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
