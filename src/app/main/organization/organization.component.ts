import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css'],
})
export class OrganizationComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'status',
    'byname',
    //'address',
    //'telephone',
    'Manage',
  ];
  dataSource: any;
  dialog: any;

  constructor(private authService: AuthServiceService, private router: Router) {
    let myStatus = this.authService.getMyStatus();
    // if (myStatus != '6') {
    //   this.router.navigate(['dashboard']);
    // }
    this.authService.getOrganizations_all().subscribe((data: any) => {
      console.log(data);
      this.dataSource = new MatTableDataSource<PeriodicElement>(data.data);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit(): void { }
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  selectOrganization(id: any, permission: any) {
    if (permission == 'Supporter 2') {
      localStorage.setItem('selectIDOrganization', id);
      this.router.navigate(['../main/editorganization_main']);
    } else if (permission == 'Supporter 1') {
      localStorage.setItem('selectIDOrganization', id);
      this.router.navigate(['../main/editorganization_sub']);
    } else if (permission == 'Operator Foreman Superviser') {
      localStorage.setItem('selectIDOrganization', id);
      this.router.navigate(['../main/editorganization_hospital']);
    }
  }
  deleteOrganization(id: any) {
    if (confirm('Are you sure to delete ID : ' + id)) {
      this.authService
        .deleteOrganization({
          body: { id: id },
        })
        .subscribe((result) => {
          console.log(result.message);
          // alert(result.message);
          // window.location.href = window.location.href;
        });
    }
  }
}
export interface PeriodicElement {
  id: number;
  name: string;
  permission: number;
  status: string;
  byname: string;
  address: string;
  telephone: string;
}
