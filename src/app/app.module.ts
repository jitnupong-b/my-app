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
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { AdminComponent } from './main/admin/admin.component';
import { UserComponent } from './main/user/user.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { TokenInterceptorService } from './token-interceptor.service';
import { AuthServiceService } from './auth-service.service';
import { EditComponent } from './main/edit/edit.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProfileComponent } from './main/profile/profile.component';
import { OrganizationComponent } from './main/organization/organization.component';
import { OrganizationMainComponent } from './main/organization-main/organization-main.component';
import { OrganizationSubComponent } from './main/organization-sub/organization-sub.component';
import { EditorganizationMainComponent } from './main/editorganization-main/editorganization-main.component';
import { EditorganizationSubComponent } from './main/editorganization-sub/editorganization-sub.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrganizationHospitalComponent } from './main/organization-hospital/organization-hospital.component';
import { EditorganizationHospitalComponent } from './main/editorganization-hospital/editorganization-hospital.component';
import { MainComponent } from './main/main.component';
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
    MainComponent
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
    RouterModule.forChild([
      {
        path: 'main',
        component: MainComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'user', component: UserComponent },
          { path: 'profile', component: ProfileComponent },
          { path: 'admin', component: AdminComponent },
          { path: 'organization', component: OrganizationComponent },
          { path: 'organization-main', component: OrganizationMainComponent },
          { path: 'organization-sub', component: OrganizationSubComponent },
          { path: 'organization-hospital', component: OrganizationHospitalComponent },
          { path: 'editorganization_main', component: EditorganizationMainComponent },
          { path: 'editorganization_sub', component: EditorganizationSubComponent },
          { path: 'editorganization-hospital', component: EditorganizationHospitalComponent },
          { path: 'edit', component: EditComponent }
        ],
        canActivate: [AuthGuard]
      }
    ])
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
