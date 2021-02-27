import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { AuthServiceService } from '../auth-service.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  numtotal: any;
  numsup3 = 0;
  numsup2 = 0;
  numsup1 = 0;

  constructor(private authService: AuthServiceService) {
    this.authService.users().subscribe((data: any) => {
      this.numtotal = data.data.length;
    });

    this.authService.users().subscribe((data: any) => {
      for (var i = 0; i < data.data.length; ++i) {
        if (data.data[i].status == 6) this.numsup3++;
      }
    });
    this.authService.users().subscribe((data: any) => {
      for (var i = 0; i < data.data.length; ++i) {
        if (data.data[i].status == 4) this.numsup2++;
      }
    });
    this.authService.users().subscribe((data: any) => {
      for (var i = 0; i < data.data.length; ++i) {
        if (data.data[i].status == 5) this.numsup1++;
      }
    });
  }

  ngOnInit(): void {}
  // test = this.authService.getName();
  name = this.authService.getName();

  agency = this.authService.getMyAgency();
  organization = this.authService.myOrganization();
}
