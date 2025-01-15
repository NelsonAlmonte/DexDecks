import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CardListComponent } from '@card/components/card-list/card-list.component';
import { Card } from '@card/interfaces/card.interface';
import { CardService } from '@card/services/card.service';
import { PaginationService } from '@shared/services/pagination.service';
@Component({
  selector: 'app-cards',
  imports: [CardListComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent implements OnInit, OnDestroy {
  cardService = inject(CardService);
  paginationService = inject(PaginationService);
  page = 1;

  ngOnInit(): void {
    this.getCards();
  }

  getCards(): void {
    const paginationState = this.paginationService.getState('feed');
    if (paginationState) {
      this.cardService.cards.set(paginationState.result as Card[]);
      this.page = paginationState.page;
    } else {
      this.cardService.fetchCards(this.page);
    }
  }

  getMoreCards(): void {
    this.page++;
    this.cardService.fetchCards(this.page);
  }

  ngOnDestroy(): void {
    this.paginationService.setState('feed', {
      page: this.page,
      result: this.cardService.cards(),
    });
  }
}
