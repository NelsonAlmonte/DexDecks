import { FormControl } from '@angular/forms';

export interface SearchFilter {
  filter: Filter;
  formControl: FormControl;
  formControlName: string;
}

export interface Filter {
  name: string;
  control?: string;
  param: string;
  endpoint: string;
  filter?: string;
  isSearchable?: boolean;
}

export interface EnergyType {
  name: string;
  color: string;
}

export interface CardType {
  name: string;
  color: string;
  icon: string;
}
