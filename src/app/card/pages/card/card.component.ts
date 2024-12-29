import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardDetailItemComponent } from '@card/components/card-detail-item/card-detail-item.component';
import { CardService } from '@card/services/card.service';
import { provideIcons } from '@ng-icons/core';
import {
  bootstrapPalette,
  bootstrapStars,
  bootstrapHeart,
  bootstrapArrowUpRightSquare,
  bootstrapLayersHalf,
  bootstrapTag,
  bootstrapBoxSeam,
  bootstrapListOl,
} from '@ng-icons/bootstrap-icons';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [RouterLink, CardDetailItemComponent, LowerCasePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  providers: [
    provideIcons({
      bootstrapPalette,
      bootstrapStars,
      bootstrapHeart,
      bootstrapArrowUpRightSquare,
      bootstrapLayersHalf,
      bootstrapTag,
      bootstrapBoxSeam,
      bootstrapListOl,
    }),
  ],
})
export class CardComponent implements OnInit {
  cardService = inject(CardService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.cardService.fetchCard(id!);
  }
}
