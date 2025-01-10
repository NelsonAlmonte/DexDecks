import {
  Component,
  inject,
  OnInit,
  QueryList,
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
import {
  Filter,
  EnergyType,
  CardType,
} from '@shared/interfaces/search.interface';
import { energyTypes, cardTypes } from '@shared/data/types.data';
import { provideIcons } from '@ng-icons/core';
import {
  bootstrapCircle,
  bootstrapLightningCharge,
  bootstrapPersonWalking,
} from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-search-form',
  imports: [ReactiveFormsModule, TypeFilterComponent, SearchFilterComponent],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css',
  providers: [
    provideIcons({
      bootstrapCircle,
      bootstrapPersonWalking,
      bootstrapLightningCharge,
    }),
  ],
})
export class SearchFormComponent implements OnInit {
  router = inject(Router);
  fb = inject(FormBuilder);
  searchForm = new FormGroup({
    name: new FormControl(''),
    set: new FormControl(''),
    energyTypes: new FormGroup({}),
    cardTypes: new FormGroup({}),
  });
  energyTypes: EnergyType[] = energyTypes;
  cardTypes: CardType[] = cardTypes;
  @ViewChildren(TypeFilterComponent)
  typeFilters!: QueryList<TypeFilterComponent>;
  @ViewChildren(SearchFilterComponent)
  searchFilters!: QueryList<SearchFilterComponent>;

  ngOnInit(): void {}

  formControl(control: string): FormControl {
    return this.searchForm.get(control) as FormControl;
  }

  formGroup(group: string): FormGroup {
    return this.searchForm.get(group) as FormGroup;
  }

  buildFilter(options: Filter): Filter {
    const { name, control, param, endpoint, filter } = options;
    return { name, control, param, endpoint, filter };
  }

  doSearch(): void {
    const typeFilters = this.typeFilters
      .map((filter) => filter.buildParam())
      .join(' ')
      .trim();

    const searchFilters = this.searchFilters
      .map((filter) => filter.buildParam())
      .join(' ')
      .trim();

    const query = `${searchFilters} ${typeFilters}`;
    console.log(query);
    if (!query) return;
    const encondedQuery = encodeURIComponent(query);
    this.router.navigate(['/search'], { queryParams: { q: encondedQuery } });
  }
}
