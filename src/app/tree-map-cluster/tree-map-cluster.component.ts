import { Component, Input, OnInit } from '@angular/core';
import { Layer } from 'leaflet';
import { TreeMapMarker } from '../tree-map-marker/tree-map-marker.component';
import { createTreeMapMarker } from '../tree-map-marker/tree-map-marker.service';

@Component({
  selector: 'app-tree-map-cluster',
  templateUrl: './tree-map-cluster.component.html',
  styleUrls: ['./tree-map-cluster.component.scss'],
})
export class TreeMapClusterComponent implements OnInit {
  @Input() marker!: TreeMapMarker[];

  layers!: Layer[];

  constructor() {}

  ngOnInit() {
    this.layers = this.marker.map(createTreeMapMarker);
  }
}
