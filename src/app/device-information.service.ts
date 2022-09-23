import { Injectable } from '@angular/core';
import { CallbackID, Geolocation, Position, WatchPositionCallback } from '@capacitor/geolocation';
import { Device } from '@capacitor/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceInformationService {

  public async getCurrentLocation(): Promise<Position> {
    return await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
    });
  }

  public async watchLocation(callback: WatchPositionCallback): Promise<CallbackID> {
    return Geolocation.watchPosition({
      enableHighAccuracy: true,
    }, callback);
  }

  public async cancelLocationWatch(callbackId: CallbackID): Promise<void> {
    return Geolocation.clearWatch({
      id: callbackId,
    });
  }

  public async getDeviceId(): Promise<string> {
    return (await Device.getId()).uuid;
  }

}
