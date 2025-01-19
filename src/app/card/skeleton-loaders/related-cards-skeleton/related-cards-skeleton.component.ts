import { Component } from '@angular/core';

@Component({
  selector: 'app-related-cards-skeleton',
  imports: [],
  templateUrl: './related-cards-skeleton.component.html',
  styleUrl: './related-cards-skeleton.component.css',
})
export class RelatedCardsSkeletonComponent {
  iterations = Array.from({ length: 6 });
}
