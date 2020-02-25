import { TestBed } from '@angular/core/testing';

import { DinosaureService } from './dinosaure.service';

describe('DinosaureService', () => {
  let service: DinosaureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DinosaureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
