import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Card, Response, Set } from '@card/interfaces/card.interface';
import { SearchConfig } from '@shared/interfaces/search.interface';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  http = inject(HttpClient);
  cards = signal<Card[]>([]);
  card = signal<Card | null>(null);
  searchResults = signal<Record<string, Card[]>>({});
  filter = signal<Card[] | Set[] | string[]>([]);
  isLoading = signal<Boolean>(true);
  hasError = signal<Boolean>(false);
  PAGE_SIZE = 12;

  fetchCards(page: number, pageSize: number = this.PAGE_SIZE): void {
    this.isLoading.set(true);
    this.hasError.set(false);

    const observable = this.http.get<Response<Card[]>>(
      `https://api.pokemontcg.io/v2/cards`,
      {
        params: { page: page, pageSize: pageSize },
      }
    );

    this.catchErrors(observable).subscribe((response) => {
      if (response) {
        console.log(response);
        this.cards.update((values) => {
          return [...values, ...response.data];
        });
        this.isLoading.set(false);
      } else {
        this.hasError.set(true);
      }
    });
  }

  fetchCard(id: string): void {
    this.isLoading.set(true);
    this.card.set(null);
    this.hasError.set(false);

    const observable = this.http.get<Response<Card>>(
      `https://api.pokemontcg.io/v2/cards/${id}`
    );

    this.catchErrors(observable).subscribe((response) => {
      if (response) {
        console.log(response);
        this.card.set(response.data);
        this.isLoading.set(false);
      } else {
        this.isLoading.set(false);
        this.hasError.set(true);
      }
    });
  }

  searchCards(config: SearchConfig): void {
    this.isLoading.set(true);
    this.hasError.set(false);

    const observable = this.http.get<Response<Card[]>>(
      `https://api.pokemontcg.io/v2/cards`,
      {
        params: {
          q: config.params,
          page: config.page.toString(),
          pageSize: config.pageSize.toString(),
        },
      }
    );

    this.catchErrors(observable).subscribe((response) => {
      if (response) {
        console.log(config.type, response);
        this.searchResults.update((results) => ({
          ...results,
          [config.type]: results[config.type]
            ? [...results[config.type], ...response.data]
            : response.data,
        }));
        this.isLoading.set(false);
      } else {
        this.hasError.set(true);
      }
    });
  }

  search(endpoint: string, param?: string): void {
    this.isLoading.set(true);
    this.hasError.set(false);
    this.filter.set([]);

    const observable = this.http.get<Response<Card[] | Set[] | string[]>>(
      `https://api.pokemontcg.io/v2/${endpoint}?q=${param}&pageSize=10`
    );

    this.catchErrors(observable).subscribe((response) => {
      if (response) {
        console.log(response);
        this.filter.set(response.data);
        this.isLoading.set(false);
      } else {
        this.hasError.set(true);
      }
    });
  }

  catchErrors<T>(observable: Observable<T>): Observable<T | null> {
    return observable.pipe(
      catchError((error) => {
        console.log('error in catcherror', error);
        this.isLoading.set(false);
        this.hasError.set(true);
        return of(null);
      })
    );
  }
}
