import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { TokenInterceptorService } from './token-interceptor.service';
import { AuthServiceService } from './auth-service.service';
import { EditComponent } from './edit/edit.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProfileComponent } from './profile/profile.component';
import { OrganizationComponent } from './organization/organization.component';
import { OrganizationMainComponent } from './organization-main/organization-main.component';
import { OrganizationSubComponent } from './organization-sub/organization-sub.component';
import { EditorganizationMainComponent } from './editorganization-main/editorganization-main.component';
import { EditorganizationSubComponent } from './editorganization-sub/editorganization-sub.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrganizationHospitalComponent } from './organization-hospital/organization-hospital.component';
import { EditorganizationHospitalComponent } from './editorganization-hospital/editorganization-hospital.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AdminComponent,
    UserComponent,
    EditComponent,
    ProfileComponent,
    OrganizationComponent,
    OrganizationMainComponent,
    OrganizationSubComponent,
    EditorganizationMainComponent,
    EditorganizationSubComponent,
    OrganizationHospitalComponent,
    EditorganizationHospitalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    Ng2SearchPipeModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      {
        path: 'admin', component: AdminComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'user', component: UserComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'edit', component: EditComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: 'organization',
        component: OrganizationComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: 'organization-main',
        component: OrganizationMainComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: 'organization-sub',
        component: OrganizationSubComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: 'organization-hospital',
        component: OrganizationHospitalComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: 'editorganization_main',
        component: EditorganizationMainComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: 'editorganization_sub',
        component: EditorganizationSubComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: 'editorganization_hospital',
        component: EditorganizationHospitalComponent,
        // canActivate: [AuthGuard],
      },
    ]),
  ],
  providers: [
    AuthServiceService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent, AuthGuard],
})
export class AppModule { }
