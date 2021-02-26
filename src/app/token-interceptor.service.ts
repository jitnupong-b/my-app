import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthServiceService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available

    let currentUser = this.authService.getToken();
    if (currentUser !== '') {
      request = request.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser}`,
        }),
      });
    }
    return next.handle(request);
  }
}
