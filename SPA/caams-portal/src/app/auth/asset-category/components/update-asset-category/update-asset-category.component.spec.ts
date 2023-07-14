import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAssetCategoryComponent } from './update-asset-category.component';

describe('UpdateAssetCategoryComponent', () => {
  let component: UpdateAssetCategoryComponent;
  let fixture: ComponentFixture<UpdateAssetCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAssetCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAssetCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
