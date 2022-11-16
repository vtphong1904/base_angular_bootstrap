import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {ToastService} from "../../shared/components/toast.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private toastService: ToastService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const language = this._translocoService.getActiveLang();
    let newReq = request.clone();

    // if ( this._authService.accessToken)
    // {
    //   newReq = req.clone({
    //     headers: req.headers.set('Authorization', 'Bearer ' + this._authService.accessToken).set('LANG_KEY', language)
    //   });
    // }


    // Response
    return next.handle(newReq).pipe(
      catchError((error) => {

        // Catch '401 Unauthorized' responses
        // @ts-ignore
        if ( error instanceof HttpErrorResponse && (error.status === 401 || (error.url.includes('/account') && error.status === 500 )))
        {
          // Sign out

          // this._authService.signOut();

          // Reload the app
          // location.reload();
        }
        if ( error instanceof HttpErrorResponse && error.status === 403)
        {
          // this._router.navigateByUrl('unlock-session');
        }

        if (error instanceof HttpErrorResponse && error.status === 400 || error.status === 405 || error.status === 500) {
          this.toastService.show(error?.error?.message || 'Có lỗi xảy ra', '');
        }

        return throwError(error);
      })
    );
  }
}
