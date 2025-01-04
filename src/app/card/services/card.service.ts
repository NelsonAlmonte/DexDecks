import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Card, Response } from '@card/interfaces/card.interface';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  http = inject(HttpClient);
  cards = signal<Card[]>([]);
  card = signal<Card | null>(null);
  searchResults = signal<Card[]>([]);

  constructor() {
    this.fetchCards(10);
  }

  fetchCards(pageSize: number) {
    return this.http
      .get<Response<Card[]>>(
        `https://api.pokemontcg.io/v2/cards?pageSize=${pageSize}`
      )
      .subscribe((response) => {
        console.log(response.data);
        this.cards.set(response.data);
      });
  }

  fetchCard(id: string) {
    return this.http
      .get<Response<Card>>(`https://api.pokemontcg.io/v2/cards/${id}`)
      .subscribe((response) => {
        console.log(response);
        this.card.set(response.data);
      });
  }

  searchCards(params: string) {
    return this.http
      .get<Response<Card[]>>(`https://api.pokemontcg.io/v2/cards?q=${params}`)
      .subscribe((response) => {
        console.log(response);
        this.searchResults.set(response.data);
      });
  }
}
