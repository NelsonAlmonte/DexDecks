import { Component } from '@angular/core';

@Component({
  selector: 'app-cards-skeleton',
  imports: [],
  templateUrl: './cards-skeleton.component.html',
  styleUrl: './cards-skeleton.component.css',
})
export class CardsSkeletonComponent {
  iterations = Array.from({ length: 8 });
}
