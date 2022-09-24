import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { LeafletDirective } from '@asymmetrik/ngx-leaflet';
import { Position } from '@capacitor/geolocation';
import { ViewDidEnter } from '@ionic/angular';
import * as L from 'leaflet';
import { LatLng, latLng, Map, tileLayer } from 'leaflet';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DeviceInformationService } from '../device-information.service';
import { MapMarker } from '../map-marker/map-marker.component';
import {
  examplePopupTrash,
  PoiPopupData,
} from '../poi-popup/poi-popup.component';
import { Tree } from '../model/tree';
import { TreeService } from '../services/tree.service';
import { TreeMapMarker } from '../tree-map-marker/tree-map-marker.component';
import { Point } from '../model/point';
import { PoiService } from '../services/poi.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements ViewDidEnter {
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

  showFilter = false;
  showTree?: TreeMapMarker;
  showTrash?: PoiPopupData;

  center$ = new BehaviorSubject([51.95219038758362, 7.638897986978916]);
  position$!: Observable<MapMarker>;
  treesMarker$!: Observable<TreeMapMarker[]>;
  points$!: Observable<Point[]>;

  constructor(
    private readonly deviceInformationService: DeviceInformationService,
    private readonly treeService: TreeService,
    private readonly pointService: PoiService,
    private readonly ngZone: NgZone
  ) {}

  public loadMarkers(leafletMap: L.Map) {
    console.log('Ready');

    const trashMarkerIcon = L.divIcon({
      className: 'test test-trash',
      html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M144 400C144 408.8 136.8 416 128 416C119.2 416 112 408.8 112 400V176C112 167.2 119.2 160 128 160C136.8 160 144 167.2 144 176V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V176C208 167.2 215.2 160 224 160C232.8 160 240 167.2 240 176V400zM336 400C336 408.8 328.8 416 320 416C311.2 416 304 408.8 304 400V176C304 167.2 311.2 160 320 160C328.8 160 336 167.2 336 176V400zM310.1 22.56L336.9 64H432C440.8 64 448 71.16 448 80C448 88.84 440.8 96 432 96H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V96H16C7.164 96 0 88.84 0 80C0 71.16 7.164 64 16 64H111.1L137 22.56C145.8 8.526 161.2 0 177.7 0H270.3C286.8 0 302.2 8.526 310.1 22.56V22.56zM148.9 64H299.1L283.8 39.52C280.9 34.84 275.8 32 270.3 32H177.7C172.2 32 167.1 34.84 164.2 39.52L148.9 64zM64 432C64 458.5 85.49 480 112 480H336C362.5 480 384 458.5 384 432V96H64V432z"/></svg>',
      iconSize: [30, 30],
    });

    const giftMarkerIcon = L.divIcon({
      className: 'test',
      html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 101L294.8 38.97C309.9 14.73 336.5 0 365.1 0H368C412.2 0 448 35.82 448 80C448 98.01 442 114.6 432 128H464C490.5 128 512 149.5 512 176V240C512 260.9 498.6 278.7 480 285.3V448C480 483.3 451.3 512 416 512H96C60.65 512 32 483.3 32 448V285.3C13.36 278.7 0 260.9 0 240V176C0 149.5 21.49 128 48 128H79.99C69.95 114.6 64 98.01 64 80C64 35.82 99.82 0 144 0H146.9C175.5 0 202.1 14.73 217.2 38.97L256 101zM365.1 32C347.5 32 331.2 41.04 321.9 55.93L276.9 128H368C394.5 128 416 106.5 416 80C416 53.49 394.5 32 368 32H365.1zM235.1 128L190.1 55.93C180.8 41.04 164.5 32 146.9 32H144C117.5 32 96 53.49 96 80C96 106.5 117.5 128 144 128H235.1zM48 160C39.16 160 32 167.2 32 176V240C32 248.8 39.16 256 48 256H240V160H48zM272 256H464C472.8 256 480 248.8 480 240V176C480 167.2 472.8 160 464 160H272V256zM240 288H64V448C64 465.7 78.33 480 96 480H240V288zM272 480H416C433.7 480 448 465.7 448 448V288H272V480z"/></svg>',
      iconSize: [30, 30],
    });

    this.position$ = this.deviceInformationService
      .getCurrentLocation()
      .pipe(map((p) => ({ lat: p.coords.latitude, lng: p.coords.longitude })));

    this.treesMarker$ = this.center$.pipe(
      switchMap((p) => this.treeService.getByRadius$(p[0], p[1], 1000)),
      map((trees) =>
        trees.map((t) => ({
          lat: t.location.y,
          lng: t.location.x,
          status: 'good',
          treeFamily: t.treeFamily,
        }))
      )
    );

    this.center$
      .pipe(switchMap((p) => this.pointService.getAll$()))
      .subscribe((trees) => {
        trees.forEach((tree) => {
          const icon =
            tree.type === 'wastecare' ? trashMarkerIcon : giftMarkerIcon;
          const m = L.marker(
            {
              lat: tree.location.y,
              lng: tree.location.x,
            },
            {
              icon,
            }
          );
          m.on('click', () => {
            this.ngZone.run(() => {
              this.showTrash = examplePopupTrash;
            });
          });
          m.addTo(leafletMap);
        });
      });
  }

  ionViewDidEnter(): void {
    setTimeout(() => this.map.getMap().invalidateSize(), 100);
  }

  toggleShowFilter() {
    this.showFilter = !this.showFilter;
  }

  setShowOverMap(tree: TreeMapMarker) {
    this.showTree = tree;
  }

  centerChange(latLng2: LatLng) {
    this.center$.next([latLng2.lng, latLng2.lat]);
  }

  poiDataFromTree(tree: TreeMapMarker) {
    return <PoiPopupData>{
      imageUrl: '/assets/IMG_6612.jpg',
      status: 'good',
      treeFamily: tree.treeFamily,
    };
  }
}
