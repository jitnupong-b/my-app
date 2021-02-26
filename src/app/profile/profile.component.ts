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
  organization: any;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  organizations: any;

  dataSource: any;
  id: any;
  FirstName: any;
  LastName: any;
  Gender: any;
  Email: any;
  number: any;
  ID_organization: any;
  organization: any;
  agency: any;

  formGroup!: FormGroup;
  status1: boolean = false;
  status2: boolean = false;
  status3: boolean = false;
  status4: boolean = false;

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private http: HttpClient
  ) {
    this.authService.usersselect(this.getID()).subscribe((data: any) => {
      this.id = data.data.id;
      this.FirstName = data.data.firstName;
      this.LastName = data.data.lastName;
      this.Gender = data.data.gender;
      this.Email = data.data.email;
      this.number = data.data.number;
      this.agency = data.data.agency;
      this.organization = data.data.organization;
    });
  }
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.formGroup = new FormGroup({
      id: new FormControl({ value: 'n/a', disabled: true }),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      organization: new FormControl({ value: 'n/a', disabled: true }),
      agency: new FormControl('', Validators.required),
    });
  }

  getID() {
    return localStorage.getItem('ID');
  }

  updateProfile() {
    if (this.formGroup.value.organization != '') {
      this.formGroup.value.id = this.getID();
      this.formGroup.value.ID_organization = this.formGroup.value.organization;
      this.authService
        .getOrganizationByID(this.formGroup.value.organization)
        .subscribe((result) => {
          this.formGroup.value.organization = result.data[0].name;
          this.authService.update(this.formGroup.value).subscribe((result) => {
            if (result.success) {
              localStorage.setItem('agency', this.formGroup.value.agency);
              localStorage.setItem(
                'organization',
                this.formGroup.value.organization
              );
              // alert(result.message);
              // window.location.href = window.location.href;

              // alert('yes');
              // this.authService.setLoggedIn(true);
              // this.router.navigate(['dashboard']);

              // this.token = result.token;
              // alert(result.token);
              // this.authService.namet('testeiei');
            } else {
              alert(result.message);
              window.location.href = window.location.href;
              // alert('no');
            }
          });
        });
    }
  }
  cancle() {
    this.router.navigate(['dashboard']);
  }
}
