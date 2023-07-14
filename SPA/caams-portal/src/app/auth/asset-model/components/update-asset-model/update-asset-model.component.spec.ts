import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAssetModelComponent } from './update-asset-model.component';

describe('UpdateAssetModelComponent', () => {
  let component: UpdateAssetModelComponent;
  let fixture: ComponentFixture<UpdateAssetModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAssetModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAssetModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
