import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loginbtn: boolean;
  logoutbtn: boolean;
  status: boolean = false;
  title = 'my-app';
  constructor(private authService: AuthServiceService, private router: Router) {
    if (this.authService.isLoggedIn2()) {
      this.authService.users().subscribe((data: any) => {
        if (!data.success) {
          this.authService.deleteLoggedIn();
          window.location.href = window.location.href;
        }
      });
    }

    authService.getLoggedInName.subscribe((name: boolean) =>
      this.changeName(name)
    );
    if (this.authService.isLoggedIn2()) {
      this.loginbtn = false;
      this.logoutbtn = true;
    } else {
      this.loginbtn = true;
      this.logoutbtn = false;
    }
    if (this.authService.getMyStatus() == '6') {
      this.status = true;
    } else {
      this.status = false;
    }
  }
  private changeName(name: boolean): void {
    // if (this.authService.getStatus() === 'Supporter3') {
    //   this.status = true;
    // } else {
    //   this.status = false;
    // }
    this.logoutbtn = name;
    this.loginbtn = !name;
  }
  logout() {
    this.authService.deleteLoggedIn();
    window.location.href = window.location.href;
    // this.router.navigate(['login']);
  }
}
