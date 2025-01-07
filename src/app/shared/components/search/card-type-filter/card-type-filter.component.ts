import { Component, computed, inject, input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { cardTypes } from '@shared/data/types.data';
import { CardType } from '@shared/interfaces/search.interface';

@Component({
  selector: 'app-card-type-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './card-type-filter.component.html',
  styleUrl: './card-type-filter.component.css',
})
export class CardTypeFilterComponent implements OnInit {
  fb = inject(FormBuilder);
  formGroup = input.required<FormGroup>();
  typesFormArray = computed(() => {
    this.formGroup().addControl(
      'cardTypes',
      this.fb.array(cardTypes.map(() => this.fb.control(false)))
    );
    return this.formGroup().get('cardTypes') as FormArray;
  });
  cardTypes: CardType[] = cardTypes;

  ngOnInit(): void {
    this.typesFormArray();
  }

  getControl(index: number) {
    return this.typesFormArray().at(index) as FormControl;
  }

  getSelectedTypes(): CardType[] {
    return this.cardTypes.filter(
      (_, index) => this.typesFormArray().at(index).value
    );
  }

  buildCardTypeParam(): string | undefined {
    const selectedTypes: string[] = this.getSelectedTypes().map(
      (value) => value.name
    );
    let typeQuery: string = '';
    if (selectedTypes.length === 0) return;
    if (selectedTypes.length === 1)
      return `(supertypes:${selectedTypes[0].toLocaleLowerCase()})`;

    for (let index = 0; index < selectedTypes.length; index++) {
      if (index === selectedTypes.length - 1) {
        typeQuery += `supertypes:${selectedTypes[index].toLocaleLowerCase()}`;
      } else {
        typeQuery += `supertypes:${selectedTypes[
          index
        ].toLocaleLowerCase()} OR `;
      }
    }
    return `(${typeQuery})`;
  }
}
