import { TestBed } from '@angular/core/testing';

import { SubSiteService } from './subsite.service';

describe('SubSiteService', () => {
  let service: SubSiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubSiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
