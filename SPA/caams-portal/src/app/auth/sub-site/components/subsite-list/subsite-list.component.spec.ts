import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSiteListComponent } from './subsite-list.component';

describe('SubSiteListComponent', () => {
  let component: SubSiteListComponent;
  let fixture: ComponentFixture<SubSiteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubSiteListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubSiteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
