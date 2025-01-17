import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CardService } from '@card/services/card.service';
import { CardDetailComponent } from '@card/components/card-detail/card-detail.component';
import { CardHeaderComponent } from '@card/components/card-header/card-header.component';
import { CardSkeletonComponent } from '@card/skeleton-loaders/card-skeleton/card-skeleton.component';
import { CombatDetailComponent } from '@card/components/combat-detail/combat-detail.component';
import { RelatedCardsComponent } from '@card/components/related-cards/related-cards.component';

@Component({
  selector: 'app-card',
  imports: [
    CardDetailComponent,
    CardHeaderComponent,
    CardSkeletonComponent,
    CombatDetailComponent,
    RelatedCardsComponent,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit, OnDestroy {
  route = inject(ActivatedRoute);
  location = inject(Location);
  cardService = inject(CardService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.cardService.fetchCard(id!);
  }

  ngOnDestroy(): void {
    this.cardService.card.set(null);
  }
}
