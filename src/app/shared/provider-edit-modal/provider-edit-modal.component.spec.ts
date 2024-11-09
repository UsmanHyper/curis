import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderEditModalComponent } from './provider-edit-modal.component';

describe('ProviderEditModalComponent', () => {
  let component: ProviderEditModalComponent;
  let fixture: ComponentFixture<ProviderEditModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProviderEditModalComponent]
    });
    fixture = TestBed.createComponent(ProviderEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
