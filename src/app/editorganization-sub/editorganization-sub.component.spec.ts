import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorganizationSubComponent } from './editorganization-sub.component';

describe('EditorganizationSubComponent', () => {
  let component: EditorganizationSubComponent;
  let fixture: ComponentFixture<EditorganizationSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorganizationSubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorganizationSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
