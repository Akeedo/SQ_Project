import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListResponsiblePersonComponent } from './list-responsible-person.component';

describe('ListResponsiblePersonComponent', () => {
  let component: ListResponsiblePersonComponent;
  let fixture: ComponentFixture<ListResponsiblePersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListResponsiblePersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListResponsiblePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
