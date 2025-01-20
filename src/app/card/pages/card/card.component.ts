import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CardService } from '@card/services/card.service';
import { CardDetailComponent } from '@card/components/card-info/card-detail/card-detail.component';
import { CardHeaderComponent } from '@card/components/card-info/card-header/card-header.component';
import { CardSkeletonComponent } from '@card/skeleton-loaders/card-skeleton/card-skeleton.component';
import { CombatDetailComponent } from '@card/components/card-info/combat-detail/combat-detail.component';
import { InfoTabsComponent } from '@card/components/card-info/info-tabs/info-tabs.component';

@Component({
  selector: 'app-card',
  imports: [
    CardDetailComponent,
    CardHeaderComponent,
    CardSkeletonComponent,
    CombatDetailComponent,
    InfoTabsComponent,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit, OnDestroy {
  route = inject(ActivatedRoute);
  location = inject(Location);
  cardService = inject(CardService);

  ngOnInit(): void {
    this.handleParam();
  }

  handleParam(): void {
    this.route.paramMap.subscribe((param) => {
      this.cardService.fetchCard(param.get('id')!);
    });
  }

  ngOnDestroy(): void {
    this.cardService.card.set(null);
  }
}
