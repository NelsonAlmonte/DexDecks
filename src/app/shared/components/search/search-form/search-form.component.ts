import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TypeFilterComponent } from '@shared/components/search/type-filter/type-filter.component';
import { SearchFilterComponent } from '@shared/components/search/search-filter/search-filter.component';
import {
  Filter,
  EnergyType,
  CardType,
} from '@shared/interfaces/search.interface';
import { energyTypes, cardTypes } from '@shared/data/types.data';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  bootstrapCircle,
  bootstrapFunnel,
  bootstrapLightningCharge,
  bootstrapPersonWalking,
} from '@ng-icons/bootstrap-icons';
import { Accordion, AccordionItem, AccordionOptions } from 'flowbite';

@Component({
  selector: 'app-search-form',
  imports: [
    ReactiveFormsModule,
    TypeFilterComponent,
    SearchFilterComponent,
    NgIcon,
  ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css',
  providers: [
    provideIcons({
      bootstrapCircle,
      bootstrapPersonWalking,
      bootstrapLightningCharge,
      bootstrapFunnel,
    }),
  ],
})
export class SearchFormComponent implements AfterViewInit {
  router = inject(Router);
  fb = inject(FormBuilder);
  searchForm = new FormGroup({
    name: new FormControl(''),
    set: new FormControl(''),
    subtype: new FormControl(''),
    rarity: new FormControl(''),
    energyTypes: new FormGroup({}),
    cardTypes: new FormGroup({}),
  });
  energyTypes: EnergyType[] = energyTypes;
  cardTypes: CardType[] = cardTypes;
  @ViewChildren(TypeFilterComponent)
  typeFilters!: QueryList<TypeFilterComponent>;
  @ViewChildren(SearchFilterComponent)
  searchFilters!: QueryList<SearchFilterComponent>;
  @ViewChild('moreFilters') moreFilters!: ElementRef<HTMLElement>;
  @ViewChild('moreFiltersHeading') moreFiltersHeading!: ElementRef<HTMLElement>;
  @ViewChild('moreFiltersBody') moreFiltersBody!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    this.setupAccordion();
  }

  formControl(control: string): FormControl {
    return this.searchForm.get(control) as FormControl;
  }

  formGroup(group: string): FormGroup {
    return this.searchForm.get(group) as FormGroup;
  }

  buildFilter(options: Filter): Filter {
    const { name, control, param, endpoint, filter, isSearchable } = options;
    return { name, control, param, endpoint, filter, isSearchable };
  }

  doSearch(): void {
    const typeFilters = this.typeFilters
      .map((filter) => filter.buildParam())
      .join(' ')
      .trim();

    const searchFilters = this.searchFilters
      .map((filter) => filter.buildParam())
      .join(' ')
      .trim();

    const query = `${searchFilters} ${typeFilters}`;
    console.log(query);
    if (!query) return;
    const encondedQuery = encodeURIComponent(query);
    this.router.navigate(['/search'], { queryParams: { q: encondedQuery } });
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
    console.log(accordionItem);

    new Accordion(accordionEl, accordionItem, options);
  }
}
