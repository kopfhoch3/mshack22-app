import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DeviceInformationService } from '../device-information.service';

@Injectable()
export class DeviceIdInterceptorService implements HttpInterceptor {
  constructor(
    private readonly deviceInformationService: DeviceInformationService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const deviceId$ = this.deviceInformationService.getDeviceId();
    return deviceId$.pipe(
      switchMap((dId) =>
        next.handle(req.clone({ setHeaders: { 'X-DEVICE-ID': dId } }))
      )
    );
  }
}
