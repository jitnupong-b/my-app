import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-organization-hospital',
  templateUrl: './organization-hospital.component.html',
  styleUrls: ['./organization-hospital.component.css'],
})
export class OrganizationHospitalComponent implements OnInit {
  formGroup!: FormGroup;
  organizations: any;
  byid: any;
  constructor(private authService: AuthServiceService, private router: Router) {
    this.authService.getOrganizationsByPermission(4).subscribe((data: any) => {
      this.organizations = data.data;
    });
  }

  ngOnInit(): void {
    this.initForm();
  }
  addOrganizationHospital() {
    if (this.formGroup.valid) {
      this.authService
        .getOrganizationsByID(this.formGroup.value.byid)
        .subscribe((results) => {
          this.formGroup.value.byname = results.data[0].name;
          this.authService
            .addOrganizationHospital(this.formGroup.value)
            .subscribe((result) => {
              if (result.success) {
                alert('ทำรายการสำเร็จ');
                window.location.href = window.location.href;
              } else {
                alert('ทำรายการล้มเหลว');
                window.location.href = window.location.href;
              }
            });
        });
    }
  }
  cancle() {
    this.router.navigate(['organization']);
  }
  initForm() {
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      byid: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
    });
  }
}
