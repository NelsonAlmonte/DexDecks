import { Component } from '@angular/core';

@Component({
  selector: 'app-card-skeleton',
  imports: [],
  templateUrl: './card-skeleton.component.html',
  styleUrl: './card-skeleton.component.css',
})
export class CardSkeletonComponent {
  iterations = Array.from({ length: 12 });
}