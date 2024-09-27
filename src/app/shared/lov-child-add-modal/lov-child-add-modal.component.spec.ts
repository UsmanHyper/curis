import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LovChildAddModalComponent } from './lov-child-add-modal.component';

describe('LovChildAddModalComponent', () => {
  let component: LovChildAddModalComponent;
  let fixture: ComponentFixture<LovChildAddModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LovChildAddModalComponent]
    });
    fixture = TestBed.createComponent(LovChildAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
