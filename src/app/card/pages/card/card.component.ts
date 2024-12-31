import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardService } from '@card/services/card.service';
import { CardDetailComponent } from '@card/components/card-detail/card-detail.component';
import { CardHeaderComponent } from '@card/components/card-header/card-header.component';
import { CardSkeletonComponent } from '@card/skeleton-loaders/card-skeleton/card-skeleton.component';
import { CombatDetailComponent } from '@card/components/combat-detail/combat-detail.component';

@Component({
  selector: 'app-card',
  imports: [
    RouterLink,
    CardDetailComponent,
    CardHeaderComponent,
    CardSkeletonComponent,
    CombatDetailComponent,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  route = inject(ActivatedRoute);
  cardService = inject(CardService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.cardService.fetchCard(id!);
  }
}
