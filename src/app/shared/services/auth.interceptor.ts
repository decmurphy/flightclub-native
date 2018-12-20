import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { CoreService } from './core.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private coreService: CoreService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': `Bearer ${this.coreService.getAccessToken()}`,
      },
    });

    return next.handle(req);
  }

}
