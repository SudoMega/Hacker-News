import { TestBed } from '@angular/core/testing';

import { NewsTestService } from './news-test.service';

describe('NewsTestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewsTestService = TestBed.get(NewsTestService);
    expect(service).toBeTruthy();
  });
});
