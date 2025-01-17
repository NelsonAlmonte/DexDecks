import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CardListComponent } from '@card/components/card-list/card-list.component';
import { Card } from '@card/interfaces/card.interface';
import { CardService } from '@card/services/card.service';
import { NoResultsComponent } from '@shared/components/search/no-results/no-results.component';
import { Pagination } from '@shared/interfaces/pagination.interface';
import { PaginationService } from '@shared/services/pagination.service';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { pairwise, startWith } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [CardListComponent, NoResultsComponent, InfiniteScrollDirective],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit, OnDestroy {
  route = inject(ActivatedRoute);
  cardService = inject(CardService);
  paginationService = inject(PaginationService);
  params = '';
  page = 1;

  ngOnInit(): void {
    this.handleQueryParamsChanges();
  }

  handleQueryParamsChanges(): void {
    this.route.queryParams
      .pipe(startWith({ q: '' } as Params), pairwise())
      .subscribe((params) => {
        const [oldParam, newParam] = params;

        this.params = newParam['q'];

        const paginationState = this.paginationService.getState('search');
        if (paginationState && paginationState.params === this.params) {
          this.loadExistingSearch(paginationState);
          return;
        }

        if (oldParam['q'] !== newParam['q']) {
          this.resetSearch();
          this.params = newParam['q'];
          this.searchCards();
        }
      });
  }

  searchCards(): void {
    this.cardService.searchCards(this.params, this.page, 'general');
  }

  getMoreCards(): void {
    this.page++;
    this.searchCards();
  }

  resetSearch(): void {
    this.page = 1;
    this.cardService.searchResults.set({ general: [] });
    this.paginationService.resetState('search');
  }

  loadExistingSearch(paginationState: Pagination) {
    this.cardService.searchResults.set({
      ...this.cardService.searchResults(),
      general: paginationState.result as Card[],
    });
    this.cardService.searchResults;
    this.page = paginationState.page;
  }

  ngOnDestroy(): void {
    this.paginationService.setState('search', {
      page: this.page,
      params: this.params,
      result: this.cardService.searchResults()['general'],
    });
  }
}
