import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyFeaturesComponent } from './key-features.component';

describe('KeyFeaturesComponent', () => {
  let component: KeyFeaturesComponent;
  let fixture: ComponentFixture<KeyFeaturesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [KeyFeaturesComponent]
    });
    fixture = TestBed.createComponent(KeyFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
