import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticePrivatePolicyComponent } from './notice-private-policy.component';

describe('NoticePrivatePolicyComponent', () => {
  let component: NoticePrivatePolicyComponent;
  let fixture: ComponentFixture<NoticePrivatePolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoticePrivatePolicyComponent]
    });
    fixture = TestBed.createComponent(NoticePrivatePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
