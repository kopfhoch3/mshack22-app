import { Component, OnInit } from '@angular/core';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  FilterToggleMap,
  MapFilterService,
  PoiType,
} from '../services/map-filter.service';

@Component({
  selector: 'app-map-filter',
  templateUrl: './map-filter.component.html',
  styleUrls: ['./map-filter.component.scss'],
})
export class MapFilterComponent implements OnInit {
  readonly filter: { icon: IconName; name: PoiType }[] = [
    { icon: 'faucet', name: 'water' },
    { icon: 'trash-can', name: 'waste' },
    { icon: 'gift', name: 'gift' },
    { icon: 'tree', name: 'tree' },
    { icon: 'cart-shopping', name: 'shop' },
  ];

  filterMap$!: Observable<FilterToggleMap>;

  constructor(private readonly mapFilterService: MapFilterService) {}

  ngOnInit() {
    this.filterMap$ = this.mapFilterService.getFilter$();
  }

  patchFilter(poiType: PoiType, filterMap: FilterToggleMap) {
    const filter = {};
    filter[poiType] = !filterMap[poiType];
    this.mapFilterService.patchFilter(filter);
  }

  filterClass(name: string, inactive: boolean) {
    const filter = {};
    filter[name] = true;
    return {
      ...filter,
      inactive,
    };
  }
}
