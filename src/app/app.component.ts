import { Component, OnInit } from '@angular/core';
import { Position } from '@capacitor/geolocation';
import { DeviceInformationService } from './device-information.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Map', url: '/map', icon: 'map' },
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  
  constructor(private readonly deviceInformationService: DeviceInformationService) {}

  public deviceId: string;
  public currentLocation?: Position;
  
  ngOnInit(): void {
    this.deviceInformationService.getDeviceId().then(id => {
      this.deviceId = id;
    });

    this.deviceInformationService.watchLocation((position: Position | null, err?: any) => {
      this.currentLocation = position;
    })
  }
}
