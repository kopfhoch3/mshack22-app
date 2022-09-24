import { Injectable } from '@angular/core';
import { faFilesMedical } from '@fortawesome/pro-solid-svg-icons';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export type PoiType = 'water' | 'waste' | 'tree' | 'shop' | 'gift';

export type FilterToggleMap = Record<PoiType, boolean>;

@Injectable({
  providedIn: 'root',
})
export class MapFilterService {
  map = new BehaviorSubject(<FilterToggleMap>{
    water: true,
    waste: true,
    tree: true,
    shop: true,
    gift: true,
  });

  constructor() {}

  getFilter$(): Observable<FilterToggleMap> {
    return this.map;
  }

  patchFilter(filterOption: Partial<FilterToggleMap>) {
    const map = this.map.getValue();
    this.map.next({ ...map, ...filterOption });
  }
}
