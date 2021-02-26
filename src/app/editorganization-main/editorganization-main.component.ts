import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-editorganization-main',
  templateUrl: './editorganization-main.component.html',
  styleUrls: ['./editorganization-main.component.css'],
})
export class EditorganizationMainComponent implements OnInit {
  id: any;
  name: any;
  formGroup!: FormGroup;
  constructor(private authService: AuthServiceService, private router: Router) {
    this.id = this.getIDOrganization();
    this.authService
      .getOrganizationByID(this.getIDOrganization())
      .subscribe((result) => {
        this.name = result.data[0].name;
      });
  }
  cancle() {
    localStorage.removeItem('selectIDOrganization');
    this.router.navigate(['organization']);
  }
  getIDOrganization() {
    return localStorage.getItem('selectIDOrganization');
  }
  ngOnInit(): void {
    this.initForm();
  }
  updateOrganization() {
    if (this.formGroup.valid) {
      this.formGroup.value.id = this.getIDOrganization();
      this.authService
        .updateOrganization_main(this.formGroup.value)
        .subscribe((result) => {
          if (result.success) {
            alert('ทำรายการสำเร็จ');
            this.router.navigate(['organization']);
          } else {
            alert('ทำรายการล้มเหลว');
            this.router.navigate(['organization']);
          }
        });
    }
  }

  initForm() {
    this.formGroup = new FormGroup({
      // id: new FormControl({
      //   value: '',
      //   disabled: true,
      // }),
      id: new FormControl({ value: 'n/a', disabled: true }),
      name: new FormControl('', Validators.required),
    });
  }
}
