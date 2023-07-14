import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAssetSubcategoryComponent } from './list-asset-subcategory.component';

describe('ListAssetSubcategoryComponent', () => {
  let component: ListAssetSubcategoryComponent;
  let fixture: ComponentFixture<ListAssetSubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAssetSubcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAssetSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
