import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  numtotal = 0;
  numsup3 = 0;
  numsup2 = 0;
  numsup1 = 0;

  name: any;
  agency: any;
  organization: any;
  status: any;

  constructor(private authService: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
    this.authService.users().subscribe((data: any) => {
      console.log(data.data);
      if (data.data !== undefined) {
        this.numtotal = data.data.length;
        for (var i = 0; i < data.data.length; ++i) {
          if (data.data[i].status == 6) this.numsup3++;
          if (data.data[i].status == 4) this.numsup2++;
          if (data.data[i].status == 5) this.numsup1++;

        }
      }
    });

    this.name = this.authService.getName();
    this.agency = this.authService.getMyAgency();
    this.organization = this.authService.myOrganization();
    this.status = localStorage.getItem('mystatusname');
  }
}
