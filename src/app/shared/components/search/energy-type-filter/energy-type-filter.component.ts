import { Component, computed, input } from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { EnergyTypeComponent } from '@shared/components/energy-type/energy-type.component';

@Component({
  selector: 'app-energy-type-filter',
  imports: [ReactiveFormsModule, EnergyTypeComponent],
  templateUrl: './energy-type-filter.component.html',
  styleUrl: './energy-type-filter.component.css',
})
export class EnergyTypeFilterComponent {
  type = input<string>();
  typeIndex = input<number>();
  typesFormArray = input<FormArray>();
  control = computed(() => {
    return this.typesFormArray()!.at(this.typeIndex()!) as FormControl;
  });
}
