import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIssueLogComponent } from './view-issue-log.component';

describe('ViewIssueLogComponent', () => {
  let component: ViewIssueLogComponent;
  let fixture: ComponentFixture<ViewIssueLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewIssueLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIssueLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
