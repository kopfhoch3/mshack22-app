import { Component, OnInit, ViewChild } from '@angular/core';
import { LeafletDirective } from '@asymmetrik/ngx-leaflet';
import { ViewDidEnter } from '@ionic/angular';
import { latLng, Map, tileLayer } from 'leaflet';

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

  constructor() {}

  ngOnInit() {}

  ionViewDidEnter(): void {
    setTimeout(() => this.map.getMap().invalidateSize(), 100);
  }
}
