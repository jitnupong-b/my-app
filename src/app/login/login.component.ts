import { Component, OnInit } from '@angular/core';
import { validateBasis } from '@angular/flex-layout';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  constructor(private authService: AuthServiceService, private router: Router) {
    if (this.authService.getLogin()) {
      this.router.navigate(['main/dashboard']);
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  loginProces() {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe((result) => {

        console.log(result);
        console.log(result.success);

        if (result.success == 0) {
          Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'ไม่พบผูัใช้ตามอีเมลและรหัสผ่านที่ท่านระบุ กรุณาเข้าสู่ระบบอีกครั้ง'
          });
        } else if (result.success == 1) {
          localStorage.setItem('name', result.result.firstName + ' ' + result.result.lastName);
          localStorage.setItem('email', result.result.email);
          localStorage.setItem('IDOrganization', result.result.ID_organization);
          localStorage.setItem('status', result.result.status);
          localStorage.setItem('organization', result.result.organization);
          localStorage.setItem('agency', result.result.agency);
          localStorage.setItem('ID', result.result.id);
          localStorage.setItem('token', result.token);

          Swal.fire({
            icon: 'success',
            title: 'ล็อกอินสำเร็จ',
            text: 'กรุณารอ',
            showConfirmButton: false,
            timer: 1500
          });
          this.authService.setLoggedIn(true);
          this.router.navigate(['main/dashboard']);
        }

      });
    }
  }
}
