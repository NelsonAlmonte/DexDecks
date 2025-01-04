import { Routes } from '@angular/router';
import { CardComponent } from '@card/pages/card/card.component';
import { CardsComponent } from '@card/pages/cards/cards.component';
import { SearchComponent } from '@card/pages/search/search.component';

export const routes: Routes = [
  {
    path: '',
    component: CardsComponent,
  },
  {
    path: 'cards',
    component: CardsComponent,
  },
  {
    path: 'card/:id',
    component: CardComponent,
  },
  {
    path: 'search/:params',
    component: SearchComponent,
  },
];
