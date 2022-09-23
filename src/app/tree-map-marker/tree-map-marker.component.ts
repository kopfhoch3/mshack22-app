import { Component, Input, OnInit } from '@angular/core';
import { icon, Icon, latLng, Layer, marker, Point } from 'leaflet';
import { MapMarker } from '../map-marker/map-marker.component';

type TreeStatus = 'critical' | 'warn' | 'good';

export interface TreeMapMarker extends MapMarker {
  readonly status: TreeStatus;
}

@Component({
  selector: 'app-tree-map-marker',
  templateUrl: './tree-map-marker.component.html',
  styleUrls: ['./tree-map-marker.component.scss'],
})
export class TreeMapMarkerComponent implements OnInit {
  @Input()
  marker!: TreeMapMarker;

  layer!: Layer;

  private readonly treeIconMap = {
    good: 'assets/marker/tree_good.png',
    warn: 'assets/marker/tree_warn.png',
    critical: 'assets/marker/tree_critical.png',
  };

  constructor() {}

  ngOnInit() {
    this.layer = marker(latLng(this.marker.lat, this.marker.lng), {
      icon: icon({
        iconSize: [22, 45],
        iconAnchor: [11, 45],
        iconUrl: this.treeIconMap[this.marker.status],
      }),
      draggable: false,
      riseOnHover: true,
    });
  }
}
