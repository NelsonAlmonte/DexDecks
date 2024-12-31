import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  input,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Card } from '@card/interfaces/card.interface';
import { Accordion } from 'flowbite';
import type {
  AccordionInterface,
  AccordionItem,
  AccordionOptions,
} from 'flowbite';
import { CombatDetailItemComponent } from '@card/components/combat-detail-item/combat-detail-item.component';
import { CombatDetail } from '@card/interfaces/combat-detail.interface';
import { generateCombatDetails } from '@card/factories/combat-detail.factory';

@Component({
  selector: 'app-combat-detail',
  imports: [CombatDetailItemComponent],
  templateUrl: './combat-detail.component.html',
  styleUrl: './combat-detail.component.css',
})
export class CombatDetailComponent implements AfterViewInit {
  card = input<Card | null>();
  details = computed<CombatDetail[]>(() => {
    if (!this.card()) return [];
    return generateCombatDetails(this.card()!);
  });
  @ViewChild('combatDetails')
  combatDetails!: ElementRef<HTMLElement>;
  // TODO: Bug?
  @ViewChildren('combatDetailItem')
  combatDetailItem!: QueryList<CombatDetailItemComponent>;

  ngAfterViewInit(): void {
    this.setupAccordion();
  }

  setupAccordion(): void {
    const accordionEl = this.combatDetails.nativeElement;
    const accordionItems: AccordionItem[] = [];

    this.combatDetailItem.forEach((el, index) => {
      accordionItems.push({
        id: el.combatHeading.nativeElement.id,
        triggerEl: el.combatHeading.nativeElement,
        targetEl: el.combatBody.nativeElement,
        active: index === 0 ? true : false,
      });
    });
    console.log(accordionItems);
    const options: AccordionOptions = {
      alwaysOpen: true,
      activeClasses: 'text-gray-900 dark:text-white',
      inactiveClasses: 'text-gray-500 dark:text-gray-400',
    };

    new Accordion(accordionEl, accordionItems, options);
  }
}
