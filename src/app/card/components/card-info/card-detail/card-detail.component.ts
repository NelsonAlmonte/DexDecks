import { Component, computed, input } from '@angular/core';
import { Card } from '@card/interfaces/card.interface';
import { CardDetailItemComponent } from '@card/components/card-info/card-detail-item/card-detail-item.component';
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
  bootstrapJournalBookmarkFill,
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
      bootstrapJournalBookmarkFill,
    }),
  ],
})
export class CardDetailComponent {
  card = input.required<Card | null>();
  details = computed<CardDetailItem[]>(() => {
    if (!this.card()) return [];
    return generateCardDetails(this.card());
  });
}
