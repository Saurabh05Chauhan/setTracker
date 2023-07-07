import { TestBed } from '@angular/core/testing';

import { SetTrackerService } from './set-tracker.service';

describe('SetTrackerService', () => {
  let service: SetTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
