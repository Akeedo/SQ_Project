import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssetSubcategoryComponent } from './create-asset-subcategory.component';

describe('CreateAssetSubcategoryComponent', () => {
  let component: CreateAssetSubcategoryComponent;
  let fixture: ComponentFixture<CreateAssetSubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAssetSubcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAssetSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
