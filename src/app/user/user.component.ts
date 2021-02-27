import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
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
export class UserComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'gender',
    'email',
    'number',
    'status',
    'organization',
    'agency',
    'owner',
    'Manage',
  ];
  searchText: any;
  status: any = 0;
  filterValues: any = {};
  dataSource: any = new MatTableDataSource();
  test: any = [];
  filterSelectObj: any = [];
  constructor(private authService: AuthServiceService, private router: Router) {
    // Object to create Filter for
    this.filterSelectObj = [
      {
        name: 'สถานะ',
        columnProp: 'status',
        options: [],
      },

      {
        name: 'สังกัด',
        columnProp: 'organization',
        options: [],
      },
    ];
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.getRemoteData();

    // Overrride default filter behaviour of Material Datatable
    this.dataSource.filterPredicate = this.createFilter();
  }

  // Get Uniqu values from columns to build filter
  getFilterObject(fullObj: any, key: any) {
    const uniqChk: any = [];
    fullObj.filter((obj: any) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }

  // Get remote serve data using HTTP call
  getRemoteData() {
    let remoteDummyData: any = [];
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
        remoteDummyData = data.data;
        this.test = data.data;
        this.dataSource.data = remoteDummyData;
        // this.dataSource.paginator = this.paginator;

        this.filterSelectObj.filter((o: any) => {
          o.options = this.getFilterObject(this.dataSource.data, o.columnProp);
        });
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
              remoteDummyData = data.data;
              this.test = data.data;
              this.dataSource.data = remoteDummyData;
              this.dataSource.paginator = this.paginator;
              // this.dataSource.paginator = this.paginator;
            });
        });
    }

    this.filterSelectObj.filter((o: any) => {
      o.options = this.getFilterObject(remoteDummyData, o.columnProp);
    });
  }

  // Custom filter method fot Angular Material Datatable
  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }

      let nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            searchTerms[col]
              .trim()
              .toLowerCase()
              .split(' ')
              .forEach((word: any) => {
                if (
                  data[col].toString().toLowerCase().indexOf(word) != -1 &&
                  isFilterSet
                ) {
                  found = true;
                }
              });
          }
          return found;
        } else {
          return true;
        }
      };
      return nameSearch();
    };
    return filterFunction;
  }

  // Called on Filter change
  filterChange(filter: any, event: any) {
    if (this.status == 0) {
      this.filterValues[
        filter.columnProp
      ] = event.target.value.trim().toLowerCase();
      this.dataSource.filter = JSON.stringify(this.filterValues);
    } else {
      this.status = 0;
      this.ngOnInit();
      this.filterValues[
        filter.columnProp
      ] = event.target.value.trim().toLowerCase();
      this.dataSource.filter = JSON.stringify(this.filterValues);
    }
  }
  // Reset table filters
  resetFilters() {
    this.ngOnInit();
    this.filterValues = {};
    this.filterSelectObj.forEach((value: any, key: any) => {
      value.modelValue = undefined;
    });
    this.dataSource.filter = '';
  }
  doFilter = (value: any) => {
    if (value.value.trim().toLocaleLowerCase() != '') {
      this.status = 1;
      this.dataSource = new MatTableDataSource(this.test);
      console.log(this.dataSource);
      this.dataSource.filter = value.value.trim().toLocaleLowerCase();
    } else {
      this.status = 0;
      this.dataSource = new MatTableDataSource();
      this.ngOnInit();
    }
  };

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
  lastName: number;
  gender: string;
  email: string;
  Phone: string;
  status: string;
  organization: string;
  Agency: string;
  Owner: string;
}
