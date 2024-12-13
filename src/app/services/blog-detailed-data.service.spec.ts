import { TestBed } from '@angular/core/testing';

import { BlogDetailedDataService } from './blog-detailed-data.service';

describe('BlogDetailedDataService', () => {
  let service: BlogDetailedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogDetailedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
