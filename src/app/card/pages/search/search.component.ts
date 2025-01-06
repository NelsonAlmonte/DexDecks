import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardListComponent } from '@card/components/card-list/card-list.component';
import { CardService } from '@card/services/card.service';

@Component({
  selector: 'app-search',
  imports: [CardListComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  route = inject(ActivatedRoute);
  cardService = inject(CardService);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.cardService.searchCards(params['q']);
    });
  }
}
