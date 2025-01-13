import {
  Component,
  ElementRef,
  forwardRef,
  inject,
  input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { Card, Set } from '@card/interfaces/card.interface';
import { CardService } from '@card/services/card.service';
import { Filter } from '@shared/interfaces/search.interface';
import { Dropdown, DropdownInterface, DropdownOptions } from 'flowbite';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchFilterComponent),
      multi: true,
    },
  ],
})
export class SearchFilterComponent implements OnInit, ControlValueAccessor {
  fb = inject(FormBuilder);
  cardService = inject(CardService);
  formControl = input.required<FormControl>();
  options = input.required<Filter>();
  value: string = '';
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  @ViewChild('dropdown') dropdown!: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    this.handleValueChanges();
  }

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  handleValueChanges(): void {
    const isSearchable = this.options().isSearchable;

    this.formControl()
      .valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        if (value) {
          isSearchable ? this.doSearch(value) : this.doFilter(value);
          this.setupDropdown().show();
        } else {
          this.setupDropdown().hide();
        }
      });
  }

  doSearch(value: string): void {
    const param = encodeURIComponent(`${this.options().param}:"${value}*"`);
    this.cardService.search(this.options().endpoint, param);
  }

  doFilter(value: string): void {
    if (!this.cardService.filter().length) {
      this.cardService.search(this.options().endpoint);
    }

    const filteredValues = this.cardService
      .filter()
      .filter((filterValue) =>
        (filterValue as string).toLowerCase().includes(value.toLowerCase())
      ) as string[];

    this.cardService.filter.set(filteredValues);
  }

  onSelection(event: Event): void {
    const element = event.target as HTMLAnchorElement;
    this.formControl().patchValue(element.innerText, { emitEvent: false });
    this.setupDropdown().hide();
  }

  setupDropdown(): DropdownInterface {
    const targetEl = this.dropdown.nativeElement;
    const triggerEl = this.input.nativeElement;

    const options: DropdownOptions = {
      placement: 'bottom-start',
      onHide: () => {
        this.cardService.filter.set([]);
      },
    };

    const dropdown: DropdownInterface = new Dropdown(
      targetEl,
      triggerEl,
      options
    );

    return dropdown;
  }

  buildParam(): string | undefined {
    const searchValue = this.formControl().value;
    if (!searchValue) return;
    return `${this.options().filter}:"${searchValue}*"`;
  }

  isString(item: Card | Set | string): item is string {
    return typeof item === 'string';
  }
}
