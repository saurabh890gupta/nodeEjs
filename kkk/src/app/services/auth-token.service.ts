import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent,HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService implements HttpInterceptor {

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    console.log("hhhhhhhhhheeeeeeeeellllllloooooooo",sessionStorage.getItem('token'))
    // let currentUser = JSON.parse(sessionStorage.getItem('token'));
    if (sessionStorage.getItem('token')) {
        // request = request.clone({
        //     setHeaders: { 
        //         authorization: `Bearer ${currentUser.token}`
        //     }
        // });
        request = request.clone({
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
              'authorization': `Bearer ${sessionStorage.getItem('token')}`
            // 'authorization':'bearer ' + sessionStorage.getItem('token')
          })
        })
    }
    return next.handle(request);
  }
}
