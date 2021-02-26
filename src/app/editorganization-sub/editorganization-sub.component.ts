import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-editorganization-sub',
  templateUrl: './editorganization-sub.component.html',
  styleUrls: ['./editorganization-sub.component.css'],
})
export class EditorganizationSubComponent implements OnInit {
  id: any;
  name: any;
  organization: any;
  organizations: any;
  formGroup!: FormGroup;
  constructor(private authService: AuthServiceService, private router: Router) {
    this.id = this.getIDOrganization();
    this.authService
      .getOrganizationByID(this.getIDOrganization())
      .subscribe((result) => {
        this.name = result.data[0].name;
        this.organization = result.data[0].byname;
      });
    this.authService.getOrganizationsByPermission(5).subscribe((result) => {
      this.organizations = result.data;
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
    if (this.formGroup.value.organization != '') {
      this.formGroup.value.id = this.getIDOrganization();
      this.formGroup.value.byid = this.formGroup.value.organization.byid;
      this.formGroup.value.byname = this.formGroup.value.organization.byname;
      this.authService
        .updateOrganization_sub(this.formGroup.value)
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
      organization: new FormControl('', Validators.required),
    });
  }
}
