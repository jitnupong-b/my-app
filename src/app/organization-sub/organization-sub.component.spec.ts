import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationSubComponent } from './organization-sub.component';

describe('OrganizationSubComponent', () => {
  let component: OrganizationSubComponent;
  let fixture: ComponentFixture<OrganizationSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationSubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
