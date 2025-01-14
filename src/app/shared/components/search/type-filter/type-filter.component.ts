import { Component, computed, inject, input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { EnergyTypeComponent } from '@shared/components/energy-type/energy-type.component';
import {
  CardType,
  EnergyType,
  Filter,
} from '@shared/interfaces/search.interface';

@Component({
  selector: 'app-type-filter',
  imports: [ReactiveFormsModule, EnergyTypeComponent, NgIcon],
  templateUrl: './type-filter.component.html',
  styleUrl: './type-filter.component.css',
})
export class TypeFilterComponent implements OnInit {
  fb = inject(FormBuilder);
  options = input.required<Filter>();
  formGroup = input.required<FormGroup>();
  values = input.required<EnergyType[] | CardType[]>();
  formArray = computed(() => {
    this.formGroup().addControl(
      this.options().control!,
      this.fb.array(this.values().map(() => this.fb.control(false)))
    );
    return this.formGroup().get(this.options().control!) as FormArray;
  });

  ngOnInit(): void {
    this.formArray();
  }

  getControl(index: number): FormControl {
    return this.formArray().at(index) as FormControl;
  }

  getSelectedTypes(): EnergyType[] | CardType[] {
    return this.values().filter((_, index) => this.formArray().at(index).value);
  }

  buildParam(): string | undefined {
    const selectedFilter: string[] = this.getSelectedTypes().map(
      (value) => value.name
    );
    let typeQuery: string = '';
    if (selectedFilter.length === 0) return;
    if (selectedFilter.length === 1)
      return `(${
        this.options().searchParam
      }:${selectedFilter[0].toLocaleLowerCase()})`;

    for (let index = 0; index < selectedFilter.length; index++) {
      if (index === selectedFilter.length - 1) {
        typeQuery += `${this.options().searchParam}:${selectedFilter[
          index
        ].toLocaleLowerCase()}`;
      } else {
        typeQuery += `${this.options().searchParam}:${selectedFilter[
          index
        ].toLocaleLowerCase()} OR `;
      }
    }
    return `(${typeQuery})`;
  }

  isCardType(item: EnergyType | CardType): item is CardType {
    return 'icon' in item;
  }
}
