import { Component, Input, OnInit } from '@angular/core';
import { TreeStatus } from '../tree-map-marker/tree-map-marker.component';

export interface PoiPopupData{
  treeFamily: string;
  status: TreeStatus;
  imageUrl: string;
}

export const examplePopup: PoiPopupData = {treeFamily: 'Ahorn', status: 'good', imageUrl: ''};

@Component({
  selector: 'app-poi-popup',
  templateUrl: './poi-popup.component.html',
  styleUrls: ['./poi-popup.component.scss'],
})
export class PoiPopupComponent implements OnInit {

  @Input() data!: PoiPopupData;

  constructor() { }

  ngOnInit() {}

}
