import { FormControl, FormGroup } from '@angular/forms';
import { SearchFilter } from '@shared/interfaces/search.interface';

export function generateFilters(formGroup: FormGroup): SearchFilter[] {
  return [
    {
      filter: {
        labelName: 'Set name',
        endpointParam: 'name',
        endpoint: 'sets',
        searchParam: 'set.name',
        isSearchable: true,
      },
      formControl: formGroup.get('set') as FormControl,
      formControlName: 'set',
    },
    {
      filter: {
        labelName: 'Subtype',
        endpointParam: 'name',
        endpoint: 'subtypes',
        searchParam: 'subtypes',
        isSearchable: false,
      },
      formControl: formGroup.get('subtype') as FormControl,
      formControlName: 'subtype',
    },
    {
      filter: {
        labelName: 'Rarity',
        endpointParam: 'name',
        endpoint: 'rarities',
        searchParam: 'rarity',
        isSearchable: false,
      },
      formControl: formGroup.get('rarity') as FormControl,
      formControlName: 'rarity',
    },
    {
      filter: {
        labelName: 'Artist',
        searchParam: 'artist',
        isSearchable: true,
      },
      formControl: formGroup.get('artist') as FormControl,
      formControlName: 'artist',
    },
  ];
}
