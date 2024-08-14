import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRatesComponent } from './add-rates.component';

describe('AddRatesComponent', () => {
  let component: AddRatesComponent;
  let fixture: ComponentFixture<AddRatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRatesComponent]
    });
    fixture = TestBed.createComponent(AddRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
