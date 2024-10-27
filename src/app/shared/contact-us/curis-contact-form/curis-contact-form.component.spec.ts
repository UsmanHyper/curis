import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurisContactFormComponent } from './curis-contact-form.component';

describe('CurisContactFormComponent', () => {
  let component: CurisContactFormComponent;
  let fixture: ComponentFixture<CurisContactFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CurisContactFormComponent]
    });
    fixture = TestBed.createComponent(CurisContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
