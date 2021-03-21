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

export interface PeriodicElement {
  id: number;
  permission: any;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  dataSource: any;
  id: any;
  FirstName: any;
  LastName: any;
  Gender: any;
  Email: any;
  number: any;
  permission: any;
  permissions: any;

  formGroup!: FormGroup;
  status1: boolean = false;
  status2: boolean = false;
  status3: boolean = false;
  status4: boolean = false;
  organizations: any;
  organization: any;
  agency: any;
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private http: HttpClient
  ) {
    // let myStatus = this.authService.getMyStatus();

    // if (myStatus === '6') {
    //   this.authService.getOrganizations_all().subscribe((result) => {
    //     this.organizations = result.data;
    //   });
    // } else {
    //   this.authService
    //     .getOrganizations(myStatus, this.authService.getIDOrganization())
    //     .subscribe((result) => {
    //       this.organizations = result.data;
    //     });
    // }
    this.authService
      .getPermission(this.authService.getMyStatus())
      .subscribe((permiss: any) => {
        this.permissions = permiss.data;
      });
    this.authService.usersselect(this.getID()).subscribe((data: any) => {
      // alert(this.dataSource.id);
      this.id = data.data.id;
      this.FirstName = data.data.firstName;
      this.LastName = data.data.lastName;
      this.Gender = data.data.gender;
      this.Email = data.data.email;
      this.number = data.data.number;
      this.permission = data.data.status;
      this.agency = data.data.agency;
      this.organization = data.data.organization;
    });
  }
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.formGroup = new FormGroup({
      // id: new FormControl({
      //   value: '',
      //   disabled: true,
      // }),
      id: new FormControl({ value: 'n/a', disabled: true }),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      permission: new FormControl('', Validators.required),
      agency: new FormControl('', Validators.required),
      organization: new FormControl('', Validators.required),
    });
  }

  getID() {
    return localStorage.getItem('selectID');
  }

  dataset(data: any) {
    let myStatus = this.authService.getMyStatus();

    if (myStatus === '6') {
      this.authService
        .getOrganizationsByPermission(data.value.permission)
        .subscribe((result) => {
          this.organizations = result.data;
        });
    } else {
      this.authService
        .getOrganizations(data.value, this.authService.getIDOrganization())
        .subscribe((result) => {
          this.organizations = result.data;
        });
    }
  }

  updateUser() {
    if (this.formGroup.value.permission != '') {
      this.formGroup.value.id = this.getID();
      console.log(this.formGroup.value);
      this.authService
        .getOrganizationsByID(this.formGroup.value.organization)
        .subscribe((result) => {
          this.formGroup.value.ID_organization = result.data[0].byid;
          this.formGroup.value.organization = result.data[0].name;
          this.formGroup.value.permission = this.formGroup.value.permission.id;
          this.authService.update(this.formGroup.value).subscribe((result) => {
            console.log(this.formGroup.value);
            if (result.success) {
              alert('ทำรายการสำเร็จ');
              this.router.navigate(['user']);
            } else {
              alert('ทำรายการล้มเหลว');
              this.router.navigate(['user']);
            }
          });
        });
    }
  }
  cancle() {
    localStorage.removeItem('selectID');
    this.router.navigate(['user']);
  }
}
