import { JsonPipe } from '@angular/common';
import { Component, computed, inject, input, OnInit } from '@angular/core';
import { Card } from '@card/interfaces/card.interface';
import { CardService } from '@card/services/card.service';

@Component({
  selector: 'app-related-cards',
  imports: [],
  templateUrl: './related-cards.component.html',
  styleUrl: './related-cards.component.css',
})
export class RelatedCardsComponent implements OnInit {
  cardService = inject(CardService);
  card = input.required<Card>();
  searchType = 'set';

  ngOnInit(): void {
    const param = `set.name:"${this.card().set.name}"`;
    const page = 1;
    this.cardService.searchCards(param, page, this.searchType);
  }
}
