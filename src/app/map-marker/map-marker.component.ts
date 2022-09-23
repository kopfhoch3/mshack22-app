import { Component, Input, OnInit } from '@angular/core';
import { circle, latLng, Layer } from 'leaflet';

export interface MapMarker {
  readonly lat: number;
  readonly lng: number;
}

@Component({
  selector: 'app-map-marker',
  templateUrl: './map-marker.component.html',
  styleUrls: ['./map-marker.component.scss'],
})
export class MapMarkerComponent implements OnInit {
  @Input()
  marker!: MapMarker;

  layer: Layer;

  constructor() {}

  ngOnInit() {
    this.layer = circle(latLng(this.marker.lat, this.marker.lng), {
      radius: 20,
    });
  }
}
