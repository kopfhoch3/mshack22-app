import { Component, Input, OnInit } from '@angular/core';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { TreeStatus } from '../tree-map-marker/tree-map-marker.component';

export interface PoiPopupData {
  treeFamily: string;
  status: TreeStatus;
  imageUrl: string;
  icon?: IconName;
}

export const examplePopupTrash: PoiPopupData = {
  treeFamily: 'Müll',
  status: 'good',
  imageUrl: '/assets/IMG_7867.jpg',
  icon: 'trash-can',
};

@Component({
  selector: 'app-poi-popup',
  templateUrl: './poi-popup.component.html',
  styleUrls: ['./poi-popup.component.scss'],
})
export class PoiPopupComponent implements OnInit {
  @Input() data!: PoiPopupData;

  constructor() {}

  ngOnInit() {}
}
