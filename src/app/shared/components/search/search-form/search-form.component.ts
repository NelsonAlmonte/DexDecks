import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EnergyTypeFilterComponent } from '@shared/components/search/energy-type-filter/energy-type-filter.component';
import { CardTypeFilterComponent } from '@shared/components/search/card-type-filter/card-type-filter.component';
import { cardTypes, types } from '@shared/data/types.data';
import { cardType } from '@shared/interfaces/search.interface';

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
  searchForm!: FormGroup;
  types: string[] = types;
  cardTypes: cardType[] = cardTypes;

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.searchForm = this.fb.group({
      name: [''],
      types: this.fb.array(types.map(() => this.fb.control(false))),
      cardTypes: this.fb.array(cardTypes.map(() => this.fb.control(false))),
    });
  }

  get typesFormArray(): FormArray {
    return this.searchForm.get('types') as FormArray;
  }

  get cardTypesFormArray(): FormArray {
    return this.searchForm.get('cardTypes') as FormArray;
  }

  getSelectedTypes(): string[] {
    return this.types.filter((_, index) => this.typesFormArray.at(index).value);
  }

  buildTypeParam(): string | undefined {
    const selectedTypes: string[] = this.getSelectedTypes();
    let typeQuery: string = '';
    if (selectedTypes.length === 0) return;
    if (selectedTypes.length === 1)
      return `(types:${selectedTypes[0].toLocaleLowerCase()})`;

    for (let index = 0; index < selectedTypes.length; index++) {
      if (index === selectedTypes.length - 1) {
        typeQuery += `types:${selectedTypes[index].toLocaleLowerCase()}`;
      } else {
        typeQuery += `types:${selectedTypes[index].toLocaleLowerCase()} OR `;
      }
    }
    return `(${typeQuery})`;
  }

  buildNameParam(): string | undefined {
    const nameQuery = this.searchForm.value.name;
    if (!nameQuery) return;
    return `name:${nameQuery}*`;
  }

  buildSearchQuery(params: (string | undefined)[]): string | undefined {
    let searchQuery: string = '';
    if (params.length === 0) return;
    if (params.length === 1) return `${params[0]}`;

    for (let index = 0; index < params.length; index++) {
      if (index === params.length - 1) {
        searchQuery += `${params[index]}`;
      } else {
        searchQuery += `${params[index]} `;
      }
    }
    return searchQuery;
  }

  doSearch(): void {
    const params = [this.buildNameParam(), this.buildTypeParam()];
    const filteredParams = params.filter((value) => value != undefined);
    if (filteredParams.length === 0) return;

    const encondedQuery = encodeURIComponent(
      this.buildSearchQuery(filteredParams)!
    );
    this.router.navigate(['/search'], { queryParams: { q: encondedQuery } });
  }
}
