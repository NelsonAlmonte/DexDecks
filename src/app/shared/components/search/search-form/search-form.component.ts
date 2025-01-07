import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EnergyTypeFilterComponent } from '@shared/components/search/energy-type-filter/energy-type-filter.component';
import { CardTypeFilterComponent } from '@shared/components/search/card-type-filter/card-type-filter.component';
import { cardTypes, types } from '@shared/data/types.data';
import { CardType } from '@shared/interfaces/search.interface';

@Component({
  selector: 'app-search-form',
  imports: [
    ReactiveFormsModule,
    EnergyTypeFilterComponent,
    CardTypeFilterComponent,
  ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css',
})
export class SearchFormComponent implements OnInit {
  router = inject(Router);
  fb = inject(FormBuilder);
  searchForm = new FormGroup({
    name: new FormControl(''),
    types: new FormGroup({}),
    cardTypes: new FormGroup({}),
  });
  types: string[] = types;
  cardTypes: CardType[] = cardTypes;
  @ViewChild('energyTypeFilter')
  energyTypeFilter!: EnergyTypeFilterComponent;
  @ViewChild('cardTypeFilter')
  cardTypeFilter!: CardTypeFilterComponent;

  ngOnInit(): void {}

  formGroup(group: string): FormGroup {
    return this.searchForm.get(group) as FormGroup;
  }

  buildNameParam(): string | undefined {
    const nameQuery = this.searchForm.value.name;
    if (!nameQuery) return;
    return `name:${nameQuery}*`;
  }

  doSearch(): void {
    console.log(this.energyTypeFilter.buildTypeParam());
    console.log(this.cardTypeFilter.buildCardTypeParam());

    // const params = [this.buildNameParam(), this.buildTypeParam()];
    // const filteredParams = params.filter((value) => value != undefined);
    // if (filteredParams.length === 0) return;

    // const encondedQuery = encodeURIComponent(
    //   this.buildSearchQuery(filteredParams)!
    // );
    // this.router.navigate(['/search'], { queryParams: { q: encondedQuery } });
  }
}
