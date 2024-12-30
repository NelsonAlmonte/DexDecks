import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Card, Response } from '@card/interfaces/card.interface';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  cards = signal<Card[]>([]);
  card = signal<Card | null>(null);

  constructor(private http: HttpClient) {}

  // fetchCards() {
  //   return this.http.get<Response>(
  //     `https://api.pokemontcg.io/v2/cards?pageSize=10`
  //   );
  // }

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
}
