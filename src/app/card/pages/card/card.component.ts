import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CardService } from '@card/services/card.service';
import { CardDetailComponent } from '@card/components/card-info/card-detail/card-detail.component';
import { CardHeaderComponent } from '@card/components/card-info/card-header/card-header.component';
import { CardSkeletonComponent } from '@card/skeleton-loaders/card-skeleton/card-skeleton.component';
import { CombatDetailComponent } from '@card/components/card-info/combat-detail/combat-detail.component';
import { InfoTabsComponent } from '@card/components/card-info/info-tabs/info-tabs.component';
import { CardItemComponent } from '@card/components/card-item/card-item.component';
import { ErrorMessageComponent } from '@shared/components/error-message/error-message.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapChevronLeft } from '@ng-icons/bootstrap-icons';
import { getColor } from '@card/utils/card.utils';

@Component({
  selector: 'app-card',
  imports: [
    CardDetailComponent,
    CardHeaderComponent,
    CardSkeletonComponent,
    CombatDetailComponent,
    InfoTabsComponent,
    CardItemComponent,
    ErrorMessageComponent,
    NgIcon,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  providers: [
    provideIcons({
      bootstrapChevronLeft,
    }),
  ],
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

  getColor(): string {
    return getColor(this.cardService.card()!);
  }

  ngOnDestroy(): void {
    this.cardService.card.set(null);
  }
}
