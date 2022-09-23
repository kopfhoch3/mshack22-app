import { Injectable } from '@angular/core';
import { CallbackID, Geolocation, Position, WatchPositionCallback } from '@capacitor/geolocation';
import { Device } from '@capacitor/device';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeviceInformationService {

  public getCurrentLocation(): Observable<Position> {
    return from(Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
    }));
  }

  public watchLocation(callback: WatchPositionCallback): Observable<CallbackID> {
    return from(Geolocation.watchPosition({
      enableHighAccuracy: true,
    }, callback));
  }

  public cancelLocationWatch(callbackId: CallbackID): Observable<void> {
    return from(Geolocation.clearWatch({
      id: callbackId,
    }));
  }

  public getDeviceId(): Observable<string> {
    return from(Device.getId()).pipe(
      map(deviceId => deviceId.uuid)
    );
  }

}
