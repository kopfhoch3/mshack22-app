import { Component, Input, OnInit } from '@angular/core';
import { circle, latLng, Layer } from 'leaflet';

export interface MapMarker {
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-map-marker',
  templateUrl: './map-marker.component.html',
  styleUrls: ['./map-marker.component.scss'],
})
export class MapMarkerComponent implements OnInit {
  @Input()
  point!: MapMarker;

  layer: Layer;

  constructor() {}

  ngOnInit() {
    this.layer = circle(latLng(this.point.lat, this.point.lng), { radius: 20 });
  }
}
