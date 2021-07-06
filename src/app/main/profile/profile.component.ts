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
import { AuthServiceService } from '../../auth-service.service';
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
  password_old: any;
  password_new: any;
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
      this.ID_organization = data.data.ID_organization;
    });
  }
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.formGroup = new FormGroup({
      id: new FormControl(
        { value: 'n/a', disabled: true },
        Validators.required
      ),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password_old: new FormControl(''),
      password_new: new FormControl(''),
      number: new FormControl('', Validators.required),
      organization: new FormControl(
        { value: 'n/a', disabled: true },
        Validators.required
      ),
      agency: new FormControl('', Validators.required),
    });
  }

  getID() {
    return localStorage.getItem('ID');
  }
  getEmail() {
    return localStorage.getItem('email');
  }

  updateProfile() {
    if (this.formGroup.value) {
      this.formGroup.value.id = this.getID();
      this.formGroup.value.ID_organization = this.ID_organization;

      this.authService
        .getOrganizationByName(this.organization)
        .subscribe((results) => {
          console.log(results);
          this.formGroup.value.organization = results.data[0].name;

          this.authService.update(this.formGroup.value).subscribe((result) => {
            if (result.success) {
              localStorage.setItem('agency', this.formGroup.value.agency);
              localStorage.setItem(
                'organization',
                this.formGroup.value.organization
              );
              if (
                this.formGroup.value.password_old != '' &&
                this.formGroup.value.password_new != ''
              ) {
                this.formGroup.value.changepass = {
                  ['email']: this.getEmail(),
                  ['password']: this.formGroup.value.password_old,
                };

                this.authService
                  .checkpass(this.formGroup.value.changepass)
                  .subscribe((result) => {
                    // console.log(result);
                    if (result.success) {
                      this.formGroup.value.sendpass = {
                        ['id']: this.getID(),
                        ['password']: this.formGroup.value.password_new,
                      };
                      this.authService
                        .updatePassword(this.formGroup.value.sendpass)
                        .subscribe((result) => {
                          if (result.success) {
                            alert('เปลี่ยนรหัสผ่านสำเร็จ');
                          }
                        });
                    } else {
                      alert('รหัสผ่านเก่าไม่ถูกต้อง');
                    }
                  });
              }
              alert(result.message);

              this.router.navigate(['main/dashboard']);

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
