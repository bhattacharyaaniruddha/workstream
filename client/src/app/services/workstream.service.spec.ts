import { TestBed } from '@angular/core/testing';

import { WorkstreamService } from './workstream.service';

describe('WorkstreamService', () => {
  let service: WorkstreamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkstreamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
