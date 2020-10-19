import { HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorIntercept implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getToken();
    if (!!accessToken) {
      const cloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const handled = next.handle(cloned);
      return handled.pipe(
        catchError((error: HttpErrorResponse) => {
          this.catchErrors(error);
          return throwError(error);
        })
      );
    }
    return next.handle(request);
  }

  private catchErrors(res: HttpErrorResponse) {
    if (this.isError(res)) {
      console.log(`Internal server error occurred (${res.status} - ${res.statusText})`);
      this.router.navigateByUrl('/error');
    } else if (this.isUnauthorized(res)) {
      console.log(
        `User is not authenticated  - not logged in or the session expired? (${res.status} - ${res.statusText})`
      );
      this.authService.removeToken();
      this.router.navigateByUrl('/');
    } else if (this.isForbidden(res)) {
      console.log(
        `User does not have necessary permissions for the resource (${res.status} - ${res.statusText}): ${res.url}`
      );
      this.authService.removeToken();
      this.router.navigateByUrl('/');
    }
  }

  isError(res: HttpErrorResponse): boolean {
    return res && res.status === 500;
  }

  isUnauthorized(res: HttpErrorResponse): boolean {
    return res && res.status === 401;
  }

  isForbidden(res: HttpErrorResponse): boolean {
    return res && res.status === 403;
  }
}
