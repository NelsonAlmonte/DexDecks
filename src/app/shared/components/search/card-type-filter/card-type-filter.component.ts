import { Component, computed, input } from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { cardType } from '@shared/interfaces/search.interface';

@Component({
  selector: 'app-card-type-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './card-type-filter.component.html',
  styleUrl: './card-type-filter.component.css',
})
export class CardTypeFilterComponent {
  cardType = input<cardType>();
  cardTypeIndex = input<number>();
  cardTypesFormArray = input<FormArray>();
  control = computed(() => {
    return this.cardTypesFormArray()!.at(this.cardTypeIndex()!) as FormControl;
  });
}
