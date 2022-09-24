import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  NgZone,
} from '@angular/core';
import {
  circle,
  divIcon,
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
import { Tree } from '../model/tree';

export type TreeStatus = 'critical' | 'warn' | 'good';

export interface TreeMapMarker extends MapMarker {
  readonly status: TreeStatus;
  readonly treeFamily: string;
}

const divMarkerIcon = divIcon({
  className: 'test',
  html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M439.6 391.6l-68.98-79.59h15.2c25.59 0 39.5-29.17 23.19-48.48l-60.86-71.51h10.77c21.28 0 32.9-22.5 19.28-37.31l-134.9-146.5C238.3 2.796 231.2 0 224 0S209.7 2.799 204.7 8.236L69.93 154.7C56.34 169.5 67.93 192 89.21 192h10.73L39.03 263.5C22.72 282.9 36.62 312 62.22 312h15.2l-68.98 79.59c-18.1 21.91-3.811 56.4 24.69 56.4L208 447.1V496c0 8.844 7.269 16 16.11 16S240 504.8 240 496v-48l174.8 .0133C443.4 448 458.5 413.4 439.6 391.6zM414.8 415.1L240 416v-57.38l43.31-43.31c6.25-6.25 6.25-16.38 0-22.62s-16.38-6.25-22.62 0L240 313.4V176c0-8.844-7.157-16.01-16-16.01S208 167.2 208 176v80.01L188.8 230.4C183.5 223.3 173.5 221.9 166.4 227.2C159.3 232.5 157.9 242.5 163.2 249.6L208 309.3v106.7l-175.1 .0039c-.1934-.127-.7109-.8008-.8379-1.717c-.0957-.6934 .0469-1.115 .5938-1.748l114.9-132.6l-80.48-.002l102.2-120H108.5l115.5-125.6l115.6 125.6h-60.7l102.1 120H300.6l114.9 132.6c.457 .5273 .6562 .918 .5469 1.701C415.8 415.2 415.3 415.9 414.8 415.1z"/></svg>',
  iconSize: [30, 30],
});

@Component({
  selector: 'app-tree-map-marker',
  templateUrl: './tree-map-marker.component.html',
  styleUrls: ['./tree-map-marker.component.scss'],
})
export class TreeMapMarkerComponent implements OnInit {
  @Input()
  marker!: TreeMapMarker;

  @Output()
  showEmitter = new EventEmitter<TreeMapMarker>();

  layer!: Layer;

  private readonly treeIconMap = {
    good: 'assets/marker/tree_good.png',
    warn: 'assets/marker/tree_warn.png',
    critical: 'assets/marker/tree_critical.png',
  };

  constructor(private readonly ngZone: NgZone) {}

  ngOnInit() {
    this.layer = marker(
      {
        lat: this.marker.lat,
        lng: this.marker.lng,
      },
      {
        icon: divMarkerIcon,
      }
    ).on('click', () => {
      this.ngZone.run(() => {
        this.showEmitter.next(this.marker);
      });
    });
  }
}
