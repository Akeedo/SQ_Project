import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSubsiteComponent } from './update-subsite.component';

describe('UpdateSubsiteComponent', () => {
  let component: UpdateSubsiteComponent;
  let fixture: ComponentFixture<UpdateSubsiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSubsiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSubsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
