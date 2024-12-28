import { Component, inject, OnInit } from '@angular/core';
import { CardService } from '@card/services/card.service';
import { CardItemComponent } from '@card/components/card-item/card-item.component';

@Component({
  selector: 'app-card-list',
  imports: [CardItemComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css',
})
export class CardListComponent implements OnInit {
  cardService: CardService = inject(CardService);
  INITIAL_PAGE_SIZE = 10;

  ngOnInit(): void {
    this.getCards();
  }

  getCards() {
    this.cardService.fetchCards(this.INITIAL_PAGE_SIZE);
  }

  getMoreCards() {
    const pageSize = this.cardService.cards().length + this.INITIAL_PAGE_SIZE;
    this.cardService.fetchCards(pageSize);
  }
}
