import { Component, Input, OnInit } from '@angular/core';
import { Layer } from 'leaflet';
import { MapMarker } from '../map-marker/map-marker.component';
import { createTreeMapMarker } from './tree-map-marker.service';

type TreeStatus = 'critical' | 'warn' | 'good';

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

  layer!: Layer;

  private readonly treeIconMap = {
    good: 'assets/marker/tree_good.png',
    warn: 'assets/marker/tree_warn.png',
    critical: 'assets/marker/tree_critical.png',
  };

  constructor() {}

  ngOnInit() {
    this.layer = createTreeMapMarker(this.marker);
  }
}
