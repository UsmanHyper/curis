import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurisContactInfoComponent } from './curis-contact-info.component';

describe('CurisContactInfoComponent', () => {
  let component: CurisContactInfoComponent;
  let fixture: ComponentFixture<CurisContactInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CurisContactInfoComponent]
    });
    fixture = TestBed.createComponent(CurisContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
