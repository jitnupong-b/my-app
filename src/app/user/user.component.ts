import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'LastName',
    'Gender',
    'Email',
    'Phone',
    'Status',
    'Organization',
    'Agency',
    'Owner',
    'Manage',
  ];
  dataSource: any;

  constructor(private authService: AuthServiceService, private router: Router) {
    const myStatus: any = this.authService.getMyStatus();
    if (myStatus == 6) {
      let status: any;
      this.authService.getStatus().subscribe((data: any) => {
        status = data;
      });
      this.authService.users().subscribe((data: any) => {
        for (let i = 0; i < data.data.length; i++) {
          for (let o = 0; o < status.data.length; o++) {
            if (data.data[i].status === status.data[o].permission) {
              data.data[i].status = status.data[o].status;
            }
          }
        }
        this.dataSource = new MatTableDataSource<PeriodicElement>(data.data);
        this.dataSource.paginator = this.paginator;
      });
    } else {
      const myName: any = this.authService.getName();
      const myStatus: any = this.authService.getMyStatus();
      let status: any;
      this.authService.getStatus().subscribe((data: any) => {
        status = data;
      });
      this.authService
        .usersselect(this.authService.getMyID())
        .subscribe((data1: any) => {
          this.authService
            .getUserByPermission(myStatus, data1.data.ID_organization)
            .subscribe((data: any) => {
              for (let i = 0; i < data.data.length; i++) {
                for (let o = 0; o < status.data.length; o++) {
                  if (data.data[i].status === status.data[o].permission) {
                    data.data[i].status = status.data[o].status;
                  }
                }
              }

              this.dataSource = new MatTableDataSource<PeriodicElement>(
                data.data
              );
              this.dataSource.paginator = this.paginator;
            });
        });
    }
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  selectUser(id: any) {
    localStorage.setItem('selectID', id);
    this.router.navigate(['edit']);
  }

  deleteUser(id: any) {
    if (confirm('Are you sure to delete ID : ' + id)) {
      this.authService
        .deleteUser({
          body: { id: id },
        })
        .subscribe((result) => {
          alert(result.message);
          window.location.href = window.location.href;
        });
    }
  }
}

export interface PeriodicElement {
  firstName: string;
  id: number;
  LastName: number;
  Gender: string;
  Email: string;
  Phone: string;
  Status: string;
  Organization: string;
  Agency: string;
  Owner: string;
}
