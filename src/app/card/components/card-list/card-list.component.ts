import { Component, inject, input } from '@angular/core';
import { CardItemComponent } from '@card/components/card-item/card-item.component';
import { Card } from '@card/interfaces/card.interface';
import { CardService } from '@card/services/card.service';
import { CardsSkeletonComponent } from '@card/skeleton-loaders/cards-skeleton/cards-skeleton.component';

@Component({
  selector: 'app-card-list',
  imports: [CardItemComponent, CardsSkeletonComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css',
})
export class CardListComponent {
  cardService = inject(CardService);
  cards = input.required<Card[]>();
}
