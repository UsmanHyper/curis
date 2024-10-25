import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderPortalComponent } from './provider-portal.component';

describe('ProviderPortalComponent', () => {
  let component: ProviderPortalComponent;
  let fixture: ComponentFixture<ProviderPortalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProviderPortalComponent]
    });
    fixture = TestBed.createComponent(ProviderPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
