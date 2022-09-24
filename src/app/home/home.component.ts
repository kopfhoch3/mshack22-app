import { Component, OnInit } from '@angular/core';
import {CardModel} from "../card/cardmodel.class";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  sampleCardData: CardModel[] = [
    new CardModel(23, "Plantcare", 247),
    new CardModel(23, "Plantcare", 247),
    new CardModel(23, "Plantcare", 247),
    new CardModel(23, "Plantcare", 247)
  ];
}
