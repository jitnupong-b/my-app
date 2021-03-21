import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  JsonpClientBackend,
} from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { map } from 'rxjs/operators';
const TOKEN_HEADER_KEY = 'Authorization';
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');
  constructor(private http: HttpClient) {}

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', 'true');
    this.getLoggedInName.emit(true);
  }

  get isLoggedIn() {
    return JSON.parse(
      localStorage.getItem('loggedIn') || this.loggedInStatus.toString()
    );
  }
  getName() {
    // return localStorage.getItem('name');
    return localStorage.getItem('name');
  }
  getMyEmail() {
    return localStorage.getItem('email');
  }
  getMyStatus() {
    return localStorage.getItem('status');
  }
  getIDOrganization() {
    return localStorage.getItem('IDOrganization');
  }

  getMyID() {
    return localStorage.getItem('ID');
  }
  getLogin() {
    return localStorage.getItem('loggedIn');
  }
  getToken() {
    return localStorage.getItem('token');
  }

  getMystatusName() {
    let mystatus = this.getMyStatus();
    this.getStatus().subscribe((data: any) => {
      for (let i = 0; i < data.data.length; i++) {
        if (mystatus == data.data[i].permission) {
          localStorage.setItem('mystatusname', data.data[i].status);
        }
      }
    });
  }
  myOrganization() {
    return localStorage.getItem('organization');
  }
  getMyAgency() {
    return localStorage.getItem('agency');
  }

  isLoggedIn2() {
    const usertoken = this.getLogin();
    if (usertoken != null) {
      return true;
    }
    return false;
  }
  deleteLoggedIn() {
    // localStorage.removeItem('loggedIn');
    localStorage.clear();
  }

  login(data: any): Observable<any> {
    this.http.post(`${baseUrl}users/login`, data).subscribe((dataa: any) => {
      localStorage.setItem(
        'name',
        dataa.result.firstName + ' ' + dataa.result.lastName
      );
      localStorage.setItem('email', dataa.result.email);
      localStorage.setItem('IDOrganization', dataa.result.ID_organization);
      localStorage.setItem('status', dataa.result.status);
      localStorage.setItem('organization', dataa.result.organization);
      localStorage.setItem('agency', dataa.result.agency);
      localStorage.setItem('ID', dataa.result.id);
      localStorage.setItem('token', dataa.token);
      this.getMystatusName();
    });
    return this.http.post(`${baseUrl}users/login`, data);
  }

  checkpass(data: any): Observable<any> {
    return this.http.post(`${baseUrl}users/checkpass`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${baseUrl}users/register`, data);
  }

  addOrganizationMain(data: any): Observable<any> {
    return this.http.post(`${baseUrl}users/addOrganizationMain`, data);
  }

  addOrganizationSub(data: any): Observable<any> {
    return this.http.post(`${baseUrl}users/addOrganizationSub`, data);
  }
  addOrganizationHospital(data: any): Observable<any> {
    return this.http.post(`${baseUrl}users/addOrganizationHospital`, data);
  }

  update(data: any): Observable<any> {
    return this.http.patch(`${baseUrl}users/updateProfiles`, data);
  }

  updatePassword(data: any): Observable<any> {
    return this.http.patch(`${baseUrl}users/updatePassword`, data);
  }
  updateOrganization_main(data: any): Observable<any> {
    return this.http.patch(`${baseUrl}users/updateOrganization_main`, data);
  }
  updateOrganization_sub(data: any): Observable<any> {
    return this.http.patch(`${baseUrl}users/updateOrganization_sub`, data);
  }

  updatedeleteUser(data: any): Observable<any> {
    return this.http.patch(`${baseUrl}users/updatedeleteUser`, data);
  }

  deleteOrganization(data: any): Observable<any> {
    return this.http.delete(`${baseUrl}users/deleteOrganization`, data);
  }

  users(): Observable<any> {
    return this.http.get(`${baseUrl}users/`);
  }

  usersOrganizations(organization: any): Observable<any> {
    return this.http.get(
      `${baseUrl}users/getUserOrganizations/` + organization
    );
  }
  getPermission(permission: any): Observable<any> {
    return this.http.get(`${baseUrl}users/getPermission/` + permission);
  }
  getUserByPermission(permission: any, organization: any): Observable<any> {
    return this.http.get(
      `${baseUrl}users/getUserByPermission/` + permission + `/` + organization
    );
  }
  getOrganizations(permission: any, byid: any): Observable<any> {
    return this.http.get(
      `${baseUrl}users/getOrganizations/` + permission + `/` + byid
    );
  }
  getOrganizationsByPermission(permission: any): Observable<any> {
    return this.http.get(
      `${baseUrl}users/getOrganizationsByPermission/` + permission
    );
  }
  getOrganizationsByID(permission: any): Observable<any> {
    return this.http.get(`${baseUrl}users/getOrganizationsByID/` + permission);
  }

  getOrganizations_all(): Observable<any> {
    return this.http.get(`${baseUrl}users/getOrganizations_all`);
  }

  getStatus(): Observable<any> {
    return this.http.get(`${baseUrl}users/getStatus`);
  }
  usersselect(id: any): Observable<any> {
    return this.http.get(`${baseUrl}users/` + id);
  }
  getUserByUserEmail(email: any): Observable<any> {
    return this.http.get(`${baseUrl}users/getUserByUserEmail/` + email);
  }
  getOrganizationByID(id: any): Observable<any> {
    return this.http.get(`${baseUrl}users/getOrganizationByID/` + id);
  }
  getOrganizationByName(id: any): Observable<any> {
    return this.http.get(`${baseUrl}users/getOrganizationByName/` + id);
  }
}
