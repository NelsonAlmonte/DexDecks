import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardListComponent } from '@card/components/card-list/card-list.component';
import { Card } from '@card/interfaces/card.interface';
import { CardService } from '@card/services/card.service';
import { NoResultsComponent } from '@shared/components/search/no-results/no-results.component';
import { PaginationService } from '@shared/services/pagination.service';

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
    this.route.queryParams.subscribe((params) => {
      // TODO: Detectar el cambio en params para ver si reinicio la paginacion o no
      this.resetSearch();
      this.params = params['q'];
      this.searchCards();
    });
  }

  searchCards(): void {
    console.log('searchcards');
    const paginationState = this.paginationService.getState('search');

    if (paginationState) {
      this.cardService.searchResults.set(paginationState.result as Card[]);
      this.page = paginationState.page;
    } else {
      this.paginationService.resetState('search');
      this.cardService.searchCards(this.params, this.page);
    }
  }

  getMoreCards(): void {
    this.page++;
    this.cardService.searchCards(this.params, this.page);
  }

  resetSearch(): void {
    this.page = 1;
    this.cardService.searchResults.set([]);
    console.log('resetsearcjh');
    this.paginationService.resetState('search');
  }

  ngOnDestroy(): void {
    this.paginationService.setState('search', {
      page: this.page,
      result: this.cardService.searchResults(),
    });
  }
}
