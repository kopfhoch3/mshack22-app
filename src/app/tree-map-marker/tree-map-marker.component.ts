import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  circle,
  icon,
  Icon,
  latLng,
  Layer,
  LayerGroup,
  layerGroup,
  marker,
  Point,
} from 'leaflet';
import { MapMarker } from '../map-marker/map-marker.component';

export type TreeStatus = 'critical' | 'warn' | 'good';

export interface TreeMapMarker extends MapMarker {
  readonly status: TreeStatus;
  readonly treeFamily: string;
}

@Component({
  selector: 'app-tree-map-marker',
  templateUrl: './tree-map-marker.component.html',
  styleUrls: ['./tree-map-marker.component.scss'],
})
export class TreeMapMarkerComponent implements OnInit {
  @Input()
  marker!: TreeMapMarker;

  @Output()
  showEmitter = new EventEmitter<boolean>();

  showS = false;

  layer!: Layer;

  private readonly treeIconMap = {
    good: 'assets/marker/tree_good.png',
    warn: 'assets/marker/tree_warn.png',
    critical: 'assets/marker/tree_critical.png',
  };

  constructor() {}

  ngOnInit() {
    this.layer = circle(latLng(this.marker.lat, this.marker.lng), {
      radius: 1,
      color: 'green',
    }).on('click', () => {this.showS = !this.showS; this.showEmitter.emit(this.showS);console.log('hi');});
  }
}
