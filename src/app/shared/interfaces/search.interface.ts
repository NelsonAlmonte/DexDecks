import { FormControl } from '@angular/forms';

export interface SearchFilter {
  filter: Filter;
  formControl: FormControl;
  formControlName: string;
}

export interface Filter {
  labelName: string;
  control?: string;
  endpointParam?: string;
  endpoint?: string;
  searchParam?: string;
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

export interface SearchConfig {
  type: string;
  params: string;
  page: number;
  pageSize: number;
}
