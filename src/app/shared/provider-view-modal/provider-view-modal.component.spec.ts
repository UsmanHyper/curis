import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderViewModalComponent } from './provider-view-modal.component';

describe('ProviderViewModalComponent', () => {
  let component: ProviderViewModalComponent;
  let fixture: ComponentFixture<ProviderViewModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProviderViewModalComponent]
    });
    fixture = TestBed.createComponent(ProviderViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
