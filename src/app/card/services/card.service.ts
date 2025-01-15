import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Card, Response, Set } from '@card/interfaces/card.interface';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  http = inject(HttpClient);
  cards = signal<Card[]>([]);
  card = signal<Card | null>(null);
  searchResults = signal<Card[]>([]);
  filter = signal<Card[] | Set[] | string[]>([]);
  isLoading = signal<Boolean>(true);
  PAGE_SIZE = 8;

  fetchCards(page: number, pageSize: number = this.PAGE_SIZE) {
    this.isLoading.set(true);
    return this.http
      .get<Response<Card[]>>(`https://api.pokemontcg.io/v2/cards`, {
        params: { page: page, pageSize: pageSize },
      })
      .subscribe((response) => {
        console.log(response.data);
        this.cards.update((values) => {
          return [...values, ...response.data];
        });
        this.isLoading.set(false);
      });
  }

  fetchCard(id: string) {
    this.isLoading.set(true);
    this.card.set(null);
    return this.http
      .get<Response<Card>>(`https://api.pokemontcg.io/v2/cards/${id}`)
      .subscribe((response) => {
        console.log(response);
        this.card.set(response.data);
        this.isLoading.set(false);
      });
  }

  searchCards(params: string, page: number = 1) {
    this.isLoading.set(true);
    return this.http
      .get<Response<Card[]>>(`https://api.pokemontcg.io/v2/cards`, {
        params: {
          q: params,
          page: page.toString(),
          pageSize: this.PAGE_SIZE.toString(),
        },
      })
      .subscribe((response) => {
        console.log(response);
        if (this.searchResults().length) {
          this.searchResults.update((values) => {
            return [...values, ...response.data];
          });
        } else {
          this.searchResults.set(response.data);
        }
        this.isLoading.set(false);
      });
  }

  search(endpoint: string, param?: string) {
    this.isLoading.set(true);
    this.filter.set([]);
    return this.http
      .get<Response<Card[] | Set[] | string[]>>(
        `https://api.pokemontcg.io/v2/${endpoint}?q=${param}&pageSize=10`
      )
      .subscribe((response) => {
        console.log(response);
        this.filter.set(response.data);
        this.isLoading.set(false);
      });
  }
}
