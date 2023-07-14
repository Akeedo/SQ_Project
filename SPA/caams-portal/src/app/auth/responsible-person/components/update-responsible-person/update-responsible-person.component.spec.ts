import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateResponsiblePersonComponent } from './update-responsible-person.component';

describe('UpdateResponsiblePersonComponent', () => {
  let component: UpdateResponsiblePersonComponent;
  let fixture: ComponentFixture<UpdateResponsiblePersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateResponsiblePersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateResponsiblePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
