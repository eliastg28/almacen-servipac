import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor() { }

  intercept(req: HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
    let authReq = req;
    const token = localStorage.getItem('token');
    if(token!=null){
      authReq = req.clone({setHeaders:{Authorization:token}});
    }
    return next.handle(authReq);
  }

  
}

export const authInterceptopProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
];