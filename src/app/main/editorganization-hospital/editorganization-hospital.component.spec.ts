import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorganizationHospitalComponent } from './editorganization-hospital.component';

describe('EditorganizationHospitalComponent', () => {
  let component: EditorganizationHospitalComponent;
  let fixture: ComponentFixture<EditorganizationHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorganizationHospitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorganizationHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
