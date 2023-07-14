import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIssueLogComponent } from './update-issue-log.component';

describe('UpdateIssueLogComponent', () => {
  let component: UpdateIssueLogComponent;
  let fixture: ComponentFixture<UpdateIssueLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateIssueLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateIssueLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
