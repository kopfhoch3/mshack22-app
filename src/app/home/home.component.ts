import { Component, OnInit } from '@angular/core';
import {CardModel} from "../card/cardmodel.class";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  sampleCardData: CardModel[] = [
    new CardModel(123, 'Plant Care', 127, 'assets/bild1.jpg'),
    new CardModel(47, 'Waste Care', 19, 'assets/bild2.png'),
    new CardModel(11, 'Waste Care', 11, 'assets/bild3.png'),
  ];
}
