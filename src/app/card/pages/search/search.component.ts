import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CardListComponent } from '@card/components/card-list/card-list.component';
import { Card } from '@card/interfaces/card.interface';
import { CardService } from '@card/services/card.service';
import { NoResultsComponent } from '@shared/components/search/no-results/no-results.component';
import { Pagination } from '@shared/interfaces/pagination.interface';
import { PaginationService } from '@shared/services/pagination.service';
import { pairwise, startWith } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [CardListComponent, NoResultsComponent],
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
    this.route.queryParams
      .pipe(startWith({ q: '' } as Params), pairwise())
      .subscribe((params) => {
        const [oldParam, newParam] = params;

        console.log('old', oldParam);
        console.log('new', newParam);
        this.params = newParam['q'];

        const paginationState = this.paginationService.getState('search');
        if (paginationState && !oldParam['q']) {
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
    console.log('searchcards');
    this.cardService.searchCards(this.params, this.page);
  }

  getMoreCards(): void {
    this.page++;
    this.cardService.searchCards(this.params, this.page);
  }

  resetSearch(): void {
    this.page = 1;
    this.cardService.searchResults.set([]);
    this.paginationService.resetState('search');
  }

  loadExistingSearch(paginationState: Pagination) {
    this.cardService.searchResults.set(paginationState.result as Card[]);
    this.page = paginationState.page;
  }

  ngOnDestroy(): void {
    this.paginationService.setState('search', {
      page: this.page,
      result: this.cardService.searchResults(),
    });
  }
}
