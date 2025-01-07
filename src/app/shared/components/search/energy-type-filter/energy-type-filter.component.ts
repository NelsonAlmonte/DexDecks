import { Component, computed, inject, input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { EnergyTypeComponent } from '@shared/components/energy-type/energy-type.component';
import { types } from '@shared/data/types.data';

@Component({
  selector: 'app-energy-type-filter',
  imports: [ReactiveFormsModule, EnergyTypeComponent],
  templateUrl: './energy-type-filter.component.html',
  styleUrl: './energy-type-filter.component.css',
})
export class EnergyTypeFilterComponent implements OnInit {
  fb = inject(FormBuilder);
  formGroup = input.required<FormGroup>();
  typesFormArray = computed(() => {
    this.formGroup().addControl(
      'types',
      this.fb.array(types.map(() => this.fb.control(false)))
    );
    return this.formGroup().get('types') as FormArray;
  });
  types: string[] = types;

  ngOnInit(): void {
    this.typesFormArray();
  }

  getControl(index: number) {
    return this.typesFormArray().at(index) as FormControl;
  }

  getSelectedTypes(): string[] {
    return this.types.filter(
      (_, index) => this.typesFormArray().at(index).value
    );
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
}
