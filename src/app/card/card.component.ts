import {Component, Input, OnInit} from '@angular/core';
import {CardModel} from './cardmodel.class';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() data: CardModel;

  constructor() { }

  public formatToTimeExtension(): string {
    if (this.data == null) {
      return "";
    }

    if (this.data.creationTime <= 0) {
      return "0 mins"
    }
    else if (this.data.creationTime > 0 && this.data.creationTime < 60) {
      return this.data.creationTime + " mins";
    }
    else { // this.data.creationTime > 60
      let hours = this.data.creationTime % 60;
      return hours + " h";
    }
  }
}
