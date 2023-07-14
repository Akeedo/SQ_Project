import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIssueLogComponent } from './list-issue-log.component';

describe('ListIssueLogComponent', () => {
  let component: ListIssueLogComponent;
  let fixture: ComponentFixture<ListIssueLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListIssueLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIssueLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
