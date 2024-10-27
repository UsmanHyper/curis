import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderResourceCenterComponent } from './provider-resource-center.component';

describe('ProviderResourceCenterComponent', () => {
  let component: ProviderResourceCenterComponent;
  let fixture: ComponentFixture<ProviderResourceCenterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProviderResourceCenterComponent]
    });
    fixture = TestBed.createComponent(ProviderResourceCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
