import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubsiteComponent } from './create-subsite.component';

describe('CreateSubsiteComponent', () => {
  let component: CreateSubsiteComponent;
  let fixture: ComponentFixture<CreateSubsiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSubsiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
