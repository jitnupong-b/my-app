import {
  HttpClient,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';
import { baseUrl } from 'src/environments/environment';
import { TestBed } from '@angular/core/testing';
interface Permissions {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  organizations: any;
  permissions: any;
  organization: any;

  agency: any;
  formGroup!: FormGroup;
  status1: boolean = false;
  status2: boolean = false;
  status3: boolean = false;
  status4: boolean = false;

  dataset(data: any) {
    this.authService
      .getOrganizationsByPermission(data.value)
      .subscribe((result) => {
        this.organizations = result.data;
      });
  }
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private http: HttpClient
  ) {
    let myStatus = this.authService.getMyStatus();

    if (myStatus === '6') {
      this.authService.getOrganizations_all().subscribe((result) => {
        this.organizations = result.data;
      });
    } else {
      this.authService
        .getOrganizations(myStatus, this.authService.getIDOrganization())
        .subscribe((result) => {
          this.organizations = result.data;
        });
    }

    this.authService.getPermission(myStatus).subscribe((permiss: any) => {
      this.permissions = permiss.data;
    });
  }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.formGroup = new FormGroup({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      // password: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      permission: new FormControl('', Validators.required),
      organization: new FormControl('', Validators.required),
      agency: new FormControl('', Validators.required),
    });
  }

  regisProces() {
    if (this.formGroup.valid) {
      this.formGroup.value.password = '123456';
      console.log(this.formGroup.value);
      this.authService
        .getOrganizationsByID(this.formGroup.value.organization)
        .subscribe((result) => {
          console.log('1');
          this.authService
            .getUserByUserEmail(this.formGroup.value.email)
            .subscribe((results) => {
              console.log('2');
              if (results.success) {
                alert('มีผู้ใช้งานอีเมลนี้แล้ว');
              } else {
                console.log('3');
                this.formGroup.value.ID_organization = result.data[0].byid;
                this.formGroup.value.organization = result.data[0].name;
                this.formGroup.value.owner = this.authService.getName();
                console.log(this.formGroup.value);
                this.authService
                  .register(this.formGroup.value)
                  .subscribe((result) => {
                    if (result.success) {
                      alert('Register success');
                      window.location.href = window.location.href;
                    } else {
                      alert('Register fail');
                      window.location.href = window.location.href;
                    }
                  });
              }
            });
        });
    }
  }
}
