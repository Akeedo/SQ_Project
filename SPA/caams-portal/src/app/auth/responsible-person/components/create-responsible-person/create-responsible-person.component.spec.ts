import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateResponsiblePersonComponent } from './create-responsible-person.component';

describe('CreateResponsiblePersonComponent', () => {
  let component: CreateResponsiblePersonComponent;
  let fixture: ComponentFixture<CreateResponsiblePersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateResponsiblePersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateResponsiblePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
