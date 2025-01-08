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
  imports: [ReactiveFormsModule, TypeFilterComponent],
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
    energyTypes: new FormGroup({}),
    cardTypes: new FormGroup({}),
  });
  energyTypes: EnergyType[] = energyTypes;
  cardTypes: CardType[] = cardTypes;
  @ViewChildren(TypeFilterComponent)
  typeFilters!: QueryList<TypeFilterComponent>;

  ngOnInit(): void {}

  formGroup(group: string): FormGroup {
    return this.searchForm.get(group) as FormGroup;
  }

  buildNameParam(): string | undefined {
    const nameQuery = this.searchForm.value.name;
    if (!nameQuery) return;
    return `name:${nameQuery}*`;
  }

  buildFilter(name: string, control: string, param: string): Filter {
    return {
      name: name,
      control: control,
      param: param,
    };
  }

  doSearch(): void {
    const params = this.typeFilters
      .map((filter) => filter.buildParam())
      .join(' ')
      .trim();
    if (!params) return;
    const encondedQuery = encodeURIComponent(params);
    this.router.navigate(['/search'], { queryParams: { q: encondedQuery } });
  }
}
