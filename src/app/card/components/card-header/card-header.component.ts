import { Component, input } from '@angular/core';
import { Card } from '@card/interfaces/card.interface';

@Component({
  selector: 'app-card-header',
  imports: [],
  templateUrl: './card-header.component.html',
  styleUrl: './card-header.component.css',
})
export class CardHeaderComponent {
  card = input<Card | null>();
}
