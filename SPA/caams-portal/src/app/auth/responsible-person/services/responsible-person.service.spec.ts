import { TestBed } from '@angular/core/testing';

import { ResponsiblePersonService } from './responsible-person.service';

describe('ResponsiblePersonService', () => {
  let service: ResponsiblePersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponsiblePersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
