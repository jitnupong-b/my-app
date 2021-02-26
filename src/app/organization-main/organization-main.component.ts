import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
@Component({
  selector: 'app-organization-main',
  templateUrl: './organization-main.component.html',
  styleUrls: ['./organization-main.component.css'],
})
export class OrganizationMainComponent implements OnInit {
  formGroup!: FormGroup;
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  addOrganizationMain() {
    if (this.formGroup.valid) {
      this.authService
        .addOrganizationMain(this.formGroup.value)
        .subscribe((result) => {
          if (result.success) {
            alert('ทำรายการสำเร็จ');
            window.location.href = window.location.href;
          } else {
            alert('ทำรายการล้มเหลว');
            window.location.href = window.location.href;
          }
        });
    }
  }
  cancle() {
    this.router.navigate(['organization']);
  }
  initForm() {
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }
}
