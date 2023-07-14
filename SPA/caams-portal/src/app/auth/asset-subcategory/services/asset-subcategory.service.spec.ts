import { TestBed } from '@angular/core/testing';
import { AssetCategoryService } from './asset-subcategory.service';

describe('AssetSubcategoryService', () => {
  let service: AssetCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
