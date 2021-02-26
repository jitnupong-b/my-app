import { Component, OnInit } from '@angular/core';
import { validateBasis } from '@angular/flex-layout';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  constructor(private authService: AuthServiceService, private router: Router) {
    if (!this.authService.getLogin()) {
    } else {
      this.router.navigate(['dashboard']);
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
        if (result.success) {
          alert('เข้าสู่ระบบสำเร็จ');
          this.authService.setLoggedIn(true);
          this.router.navigate(['dashboard']);

          // this.token = result.token;
          // alert(result.token);
          // this.authService.namet('testeiei');
        } else {
          alert('เข้าสู่ระบบล้มเหลว');
        }
      });
    }
  }
}
