import { Component } from '@angular/core';
import { CardListComponent } from '@card/components/card-list/card-list.component';

@Component({
  selector: 'app-cards',
  imports: [CardListComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent {}
