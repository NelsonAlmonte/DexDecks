import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Accordion, AccordionItem, AccordionOptions } from 'flowbite';
import { SearchFilterComponent } from '@shared/components/search/search-filter/search-filter.component';
import { SearchFilter } from '@shared/interfaces/search.interface';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-more-filters',
  imports: [ReactiveFormsModule, SearchFilterComponent, NgIcon],
  templateUrl: './more-filters.component.html',
  styleUrl: './more-filters.component.css',
})
export class MoreFiltersComponent implements AfterViewInit {
  filters = input.required<SearchFilter[]>();
  formGroup = input.required<FormGroup>();
  @ViewChild('moreFilters') moreFilters!: ElementRef<HTMLElement>;
  @ViewChild('moreFiltersHeading') moreFiltersHeading!: ElementRef<HTMLElement>;
  @ViewChild('moreFiltersBody') moreFiltersBody!: ElementRef<HTMLElement>;
  @ViewChildren(SearchFilterComponent)
  searchFilters!: QueryList<SearchFilterComponent>;

  ngAfterViewInit(): void {
    this.setupAccordion();
  }

  setupAccordion(): void {
    const accordionEl = this.moreFilters.nativeElement;
    const accordionItem: AccordionItem[] = [
      {
        id: this.moreFiltersHeading.nativeElement.id,
        triggerEl: this.moreFiltersHeading.nativeElement,
        targetEl: this.moreFiltersBody.nativeElement,
        active: false,
      },
    ];

    const options: AccordionOptions = {
      alwaysOpen: false,
      activeClasses: 'bg-white',
      onOpen(accordion, item) {
        item.triggerEl.children[0].classList.remove('rounded-b-2xl');
      },
      onClose(accordion, item) {
        item.triggerEl.children[0].classList.add('rounded-b-2xl');
      },
    };

    new Accordion(accordionEl, accordionItem, options);
  }

  buildParam(): string {
    return this.searchFilters
      .map((filter) => filter.buildParam())
      .join(' ')
      .trim();
  }
}
