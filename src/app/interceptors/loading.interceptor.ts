import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { LoadingService } from './../services/loading.service';


@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger;
    this.loadingService.setLoading(true);
    return next.handle(req)
      .pipe(
        map((event) => {
          if(event && event.hasOwnProperty('url')){
            this.loadingService.setLoading(false)
          }
          return event;
        })
      );

  }
}
