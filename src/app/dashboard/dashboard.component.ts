import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { AuthServiceService } from '../auth-service.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {}
  // test = this.authService.getName();
  name = this.authService.getName();

  agency = this.authService.getMyAgency();
  organization = this.authService.myOrganization();
}
