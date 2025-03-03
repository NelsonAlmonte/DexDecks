import {
  Component,
  inject,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TypeFilterComponent } from '@shared/components/search/type-filter/type-filter.component';
import { SearchFilterComponent } from '@shared/components/search/search-filter/search-filter.component';
import { MoreFiltersComponent } from '@shared/components/search/more-filters/more-filters.component';
import {
  Filter,
  EnergyType,
  CardType,
  SearchFilter,
} from '@shared/interfaces/search.interface';
import { energyTypes, cardTypes } from '@shared/data/types.data';
import { provideIcons } from '@ng-icons/core';
import {
  bootstrapCircle,
  bootstrapFunnel,
  bootstrapLightningCharge,
  bootstrapPersonWalking,
} from '@ng-icons/bootstrap-icons';
import { generateFilters } from '@shared/factories/search.factory';
import { PaginationService } from '@shared/services/pagination.service';
import { CardService } from '@card/services/card.service';

@Component({
  selector: 'app-search-form',
  imports: [
    ReactiveFormsModule,
    TypeFilterComponent,
    SearchFilterComponent,
    MoreFiltersComponent,
  ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css',
  providers: [
    provideIcons({
      bootstrapCircle,
      bootstrapPersonWalking,
      bootstrapLightningCharge,
      bootstrapFunnel,
    }),
  ],
})
export class SearchFormComponent {
  cardService = inject(CardService);
  paginationService = inject(PaginationService);
  router = inject(Router);
  fb = inject(FormBuilder);
  searchForm = new FormGroup({
    name: new FormControl(''),
    moreFilters: new FormGroup({
      set: new FormControl(''),
      subtype: new FormControl(''),
      rarity: new FormControl(''),
      artist: new FormControl(''),
    }),
    energyTypes: new FormGroup({}),
    cardTypes: new FormGroup({}),
  });
  energyTypes: EnergyType[] = energyTypes;
  cardTypes: CardType[] = cardTypes;
  @ViewChildren(TypeFilterComponent)
  typeFilters!: QueryList<TypeFilterComponent>;
  @ViewChild(MoreFiltersComponent) searchFilters!: MoreFiltersComponent;
  filters: SearchFilter[] = generateFilters(this.formGroup('moreFilters'));

  formControl(control: string): FormControl {
    return this.searchForm.get(control) as FormControl;
  }

  formGroup(group: string): FormGroup {
    return this.searchForm.get(group) as FormGroup;
  }

  buildFilter(options: Filter): Filter {
    const {
      labelName,
      control,
      endpointParam,
      endpoint,
      searchParam,
      isSearchable,
    } = options;
    return {
      labelName,
      control,
      endpointParam,
      endpoint,
      searchParam,
      isSearchable,
    };
  }

  doSearch(): void {
    const nameFilter = this.searchForm.get('name')!.value
      ? `name:${this.searchForm.get('name')!.value}* `
      : '';
    const typeFilters = this.typeFilters
      .map((filter) => filter.buildParam())
      .join(' ')
      .trim();

    const query = `${nameFilter}${this.searchFilters.buildParam()} ${typeFilters}`;
    if (!query) return;
    this.router.navigate(['/search'], { queryParams: { q: query } });
  }
}
