import { Component, inject } from '@angular/core';
import { CardService } from '@card/services/card.service';
import { CardItemComponent } from '@card/components/card-item/card-item.component';

@Component({
  selector: 'app-card-list',
  imports: [CardItemComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css',
})
export class CardListComponent {
  cardService = inject(CardService);
  CARDS_TO_GET = 10;

  getMoreCards() {
    const pageSize = this.cardService.cards().length + this.CARDS_TO_GET;
    this.cardService.fetchCards(pageSize);
  }
}
