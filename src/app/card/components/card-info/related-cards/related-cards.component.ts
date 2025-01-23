import {
  Component,
  computed,
  inject,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from '@card/services/card.service';
import { CardItemComponent } from '@card/components/card-item/card-item.component';
import { RelatedCardsSkeletonComponent } from '@card/skeleton-loaders/related-cards-skeleton/related-cards-skeleton.component';
import { generateRelatedCards } from '@card/factories/related-card.factory';
import { Card } from '@card/interfaces/card.interface';
import { SearchConfig } from '@shared/interfaces/search.interface';
import { ErrorMessageComponent } from '@shared/components/error-message/error-message.component';

@Component({
  selector: 'app-related-cards',
  imports: [
    RelatedCardsSkeletonComponent,
    CardItemComponent,
    ErrorMessageComponent,
  ],
  templateUrl: './related-cards.component.html',
  styleUrl: './related-cards.component.css',
})
export class RelatedCardsComponent implements OnInit, OnDestroy {
  router = inject(Router);
  cardService = inject(CardService);
  card = input.required<Card>();
  relatedCards = computed(() => {
    if (!this.card()) return [];
    return generateRelatedCards(this.card());
  });
  PAGE = 1;
  PAGE_SIZE = 6;

  ngOnInit(): void {
    this.searchRelatedCards();
  }

  searchRelatedCards(): void {
    for (const relatedCard of this.relatedCards()) {
      const param = `${relatedCard.searchParam}"${relatedCard.searchValue}"`;
      const searchConfig: SearchConfig = {
        type: relatedCard.type,
        params: param,
        page: this.PAGE,
        pageSize: this.PAGE_SIZE,
      };
      this.cardService.searchCards(searchConfig);
    }
  }

  ngOnDestroy(): void {
    for (const relatedCard of this.relatedCards()) {
      this.cardService.searchResults.set({ [relatedCard.type]: [] });
    }
  }
}
