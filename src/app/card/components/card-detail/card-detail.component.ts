import { Component, effect, input, OnInit } from '@angular/core';
import { Card } from '@card/interfaces/card.interface';
import { CardDetailItemComponent } from '../card-detail-item/card-detail-item.component';
import { provideIcons } from '@ng-icons/core';
import {
  bootstrapPalette,
  bootstrapStars,
  bootstrapHeart,
  bootstrapBoxSeam,
  bootstrapListOl,
  bootstrapCalendar3,
  bootstrapTags,
  bootstrapJournal,
} from '@ng-icons/bootstrap-icons';
import { CardDetailItem } from '@card/interfaces/card-detail-item.interface';
import { generateCardDetails } from '@card/factories/card-detail.factory';

@Component({
  selector: 'app-card-detail',
  imports: [CardDetailItemComponent],
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.css',
  providers: [
    provideIcons({
      bootstrapPalette,
      bootstrapStars,
      bootstrapHeart,
      bootstrapBoxSeam,
      bootstrapListOl,
      bootstrapCalendar3,
      bootstrapTags,
      bootstrapJournal,
    }),
  ],
})
export class CardDetailComponent implements OnInit {
  card = input<Card | null>();
  details: CardDetailItem[] = [];

  constructor() {
    this.buildCardDetailItems();
  }

  ngOnInit(): void {}

  buildCardDetailItems(): void {
    effect(() => {
      if (!this.card()) {
        this.details = [];
        return;
      }
      this.details = generateCardDetails(this.card()!);
    });
  }
}
