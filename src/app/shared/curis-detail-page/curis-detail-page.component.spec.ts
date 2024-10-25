import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurisDetailPageComponent } from './curis-detail-page.component';

describe('CurisDetailPageComponent', () => {
  let component: CurisDetailPageComponent;
  let fixture: ComponentFixture<CurisDetailPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CurisDetailPageComponent]
    });
    fixture = TestBed.createComponent(CurisDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
