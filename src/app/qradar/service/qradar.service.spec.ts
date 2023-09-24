import { TestBed } from '@angular/core/testing';

import { QradarService } from './qradar.service';

describe('QradarService', () => {
  let service: QradarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QradarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
