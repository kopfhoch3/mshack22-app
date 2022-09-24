import { Component, OnInit } from '@angular/core';
import { IconName } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-map-filter',
  templateUrl: './map-filter.component.html',
  styleUrls: ['./map-filter.component.scss'],
})
export class MapFilterComponent implements OnInit {
  readonly filter: { icon: IconName; name: string }[] = [
    { icon: 'faucet', name: 'water' },
    { icon: 'trash-can', name: 'waste' },
    { icon: 'gift', name: 'gift' },
    { icon: 'tree', name: 'tree' },
    { icon: 'cart-shopping', name: 'shop' },
  ];

  constructor() {}

  ngOnInit() {}
}
