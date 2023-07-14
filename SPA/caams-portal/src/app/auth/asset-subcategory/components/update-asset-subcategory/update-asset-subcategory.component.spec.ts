import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAssetSubcategoryComponent } from './update-asset-subcategory.component';

describe('UpdateAssetSubcategoryComponent', () => {
  let component: UpdateAssetSubcategoryComponent;
  let fixture: ComponentFixture<UpdateAssetSubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAssetSubcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAssetSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
