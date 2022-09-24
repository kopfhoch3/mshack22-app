import { Component, OnInit, ViewChild } from '@angular/core';
import { LeafletDirective } from '@asymmetrik/ngx-leaflet';
import { Position } from '@capacitor/geolocation';
import { ViewDidEnter } from '@ionic/angular';
import { latLng, Map, tileLayer } from 'leaflet';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeviceInformationService } from '../device-information.service';
import { MapMarker } from '../map-marker/map-marker.component';
import { examplePopup } from '../poi-popup/poi-popup.component';
import { Tree } from '../model/tree';
import { TreeService } from '../services/tree.service';
import { TreeMapMarker } from '../tree-map-marker/tree-map-marker.component';

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
    zoom: 15,
    center: latLng(51.95219038758362, 7.638897986978916),
  };

  readonly poi = examplePopup;

  position$!: Observable<MapMarker>;
  treesMarker$!: Observable<TreeMapMarker[]>;

  constructor(
    private readonly deviceInformationService: DeviceInformationService,
    private readonly treeService: TreeService
  ) {}

  ngOnInit() {
    this.position$ = this.deviceInformationService
      .getCurrentLocation()
      .pipe(map((p) => ({ lat: p.coords.latitude, lng: p.coords.longitude })));

    this.treesMarker$ = this.treeService.getAll$().pipe(
      map((trees) =>
        trees.map((t) => ({
          lat: t.coordinates[1],
          lng: t.coordinates[0],
          status: 'good',
          treeFamily: t.treeFamily,
        }))
      )
    );
  }

  ionViewDidEnter(): void {
    setTimeout(() => this.map.getMap().invalidateSize(), 100);
  }
}
