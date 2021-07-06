import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationHospitalComponent } from './organization-hospital.component';

describe('OrganizationHospitalComponent', () => {
  let component: OrganizationHospitalComponent;
  let fixture: ComponentFixture<OrganizationHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationHospitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
