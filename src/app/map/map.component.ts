import { Component, OnInit } from '@angular/core';
import { latLng, Map, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
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

  constructor() {}

  ngOnInit() {}

  mapReady(map: Map) {
    setTimeout(() => map.invalidateSize(), 1000);
  }
}
