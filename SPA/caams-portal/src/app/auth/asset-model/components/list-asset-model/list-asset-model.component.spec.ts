import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAssetModelComponent } from './list-asset-model.component';

describe('ListAssetModelComponent', () => {
  let component: ListAssetModelComponent;
  let fixture: ComponentFixture<ListAssetModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAssetModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAssetModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
