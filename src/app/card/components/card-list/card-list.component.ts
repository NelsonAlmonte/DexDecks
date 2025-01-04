import { Component, input } from '@angular/core';
import { CardItemComponent } from '@card/components/card-item/card-item.component';
import { Card } from '@card/interfaces/card.interface';

@Component({
  selector: 'app-card-list',
  imports: [CardItemComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css',
})
export class CardListComponent {
  cards = input<Card[]>();
}
