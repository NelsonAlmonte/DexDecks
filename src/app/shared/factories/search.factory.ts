import { FormControl, FormGroup } from '@angular/forms';
import { SearchFilter } from '@shared/interfaces/search.interface';

export function generateFilters(formGroup: FormGroup): SearchFilter[] {
  return [
    {
      filter: {
        name: 'Set name',
        param: 'name',
        endpoint: 'sets',
        filter: 'set.name',
        isSearchable: true,
      },
      formControl: formGroup.get('set') as FormControl,
      formControlName: 'set',
    },
    {
      filter: {
        name: 'Subtype',
        param: 'name',
        endpoint: 'subtypes',
        filter: 'subtypes',
        isSearchable: false,
      },
      formControl: formGroup.get('subtype') as FormControl,
      formControlName: 'subtype',
    },
    {
      filter: {
        name: 'Rarity',
        param: 'name',
        endpoint: 'rarities',
        filter: 'rarity',
        isSearchable: false,
      },
      formControl: formGroup.get('rarity') as FormControl,
      formControlName: 'rarity',
    },
  ];
}
