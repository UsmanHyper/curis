import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LovChildViewModalComponent } from './lov-child-view-modal.component';

describe('LovChildViewModalComponent', () => {
  let component: LovChildViewModalComponent;
  let fixture: ComponentFixture<LovChildViewModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LovChildViewModalComponent]
    });
    fixture = TestBed.createComponent(LovChildViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
