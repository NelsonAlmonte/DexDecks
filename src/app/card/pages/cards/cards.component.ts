import { Component, inject } from '@angular/core';
import { CardListComponent } from '@card/components/card-list/card-list.component';
import { CardService } from '@card/services/card.service';

@Component({
  selector: 'app-cards',
  imports: [CardListComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent {
  cardService = inject(CardService);
  CARDS_TO_GET = 10;

  getMoreCards(): void {
    const pageSize = this.cardService.cards().length + this.CARDS_TO_GET;
    this.cardService.fetchCards(pageSize);
  }
}
