import { Component, OnInit } from '@angular/core';
import {CardModel} from '../card/cardmodel.class';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent {
  sampleCards: CardModel[] = [
    new CardModel(23, 'Plantcare', 247),
    new CardModel(123, 'Test', 127),
    new CardModel(47, 'Information', 19),
    new CardModel(11, 'Test', 11)
  ];
}
