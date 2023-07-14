import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssetModelComponent } from './create-asset-model.component';

describe('CreateAssetModelComponent', () => {
  let component: CreateAssetModelComponent;
  let fixture: ComponentFixture<CreateAssetModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAssetModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAssetModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
