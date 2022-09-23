import { Component, OnInit, ViewChild } from '@angular/core';
import { LeafletDirective } from '@asymmetrik/ngx-leaflet';
import { Position } from '@capacitor/geolocation';
import { ViewDidEnter } from '@ionic/angular';
import { latLng, Map, tileLayer } from 'leaflet';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeviceInformationService } from '../device-information.service';
import { MapMarker } from '../map-marker/map-marker.component';
import { TreeMapMarker } from '../tree-map-marker/tree-map-marker.component';

const ms: TreeMapMarker = {
  lat: 51.58,
  lng: 7.38,
  status: 'good',
};

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, ViewDidEnter {
  @ViewChild(LeafletDirective)
  map!: LeafletDirective;

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'MS-Hack-22 Nachhaltigkeitsapp',
      }),
    ],
    zoom: 10,
    center: latLng(51.58, 7.38),
  };

  readonly msMarker = ms;

  position$!: Observable<MapMarker>;

  constructor(
    private readonly deviceInformationService: DeviceInformationService
  ) {}

  ngOnInit() {
    this.position$ = this.deviceInformationService
      .getCurrentLocation()
      .pipe(map((p) => ({ lat: p.coords.latitude, lng: p.coords.longitude })));
  }

  ionViewDidEnter(): void {
    setTimeout(() => this.map.getMap().invalidateSize(), 100);
  }
}
