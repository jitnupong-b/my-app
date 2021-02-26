import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorganizationMainComponent } from './editorganization-main.component';

describe('EditorganizationMainComponent', () => {
  let component: EditorganizationMainComponent;
  let fixture: ComponentFixture<EditorganizationMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorganizationMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorganizationMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
