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
import type { AccordionItem, AccordionOptions } from 'flowbite';
import { CombatDetailItemComponent } from '@card/components/card-info/combat-detail-item/combat-detail-item.component';
import { CombatDetail } from '@card/interfaces/combat-detail.interface';
import { generateCombatDetails } from '@card/factories/combat-detail.factory';
import { provideIcons } from '@ng-icons/core';
import {
  bootstrapLightning,
  bootstrapFire,
  bootstrapBook,
} from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-combat-detail',
  imports: [CombatDetailItemComponent],
  templateUrl: './combat-detail.component.html',
  styleUrl: './combat-detail.component.css',
  providers: [
    provideIcons({
      bootstrapLightning,
      bootstrapFire,
      bootstrapBook,
    }),
  ],
})
export class CombatDetailComponent implements AfterViewInit {
  card = input<Card | null>();
  details = computed<CombatDetail[]>(() => {
    if (!this.card()) return [];
    return generateCombatDetails(this.card()!).filter(
      (e) => e.value !== undefined
    );
  });
  @ViewChild('combatDetails')
  combatDetails!: ElementRef<HTMLElement>;
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

    const options: AccordionOptions = {
      alwaysOpen: true,
      activeClasses: 'text-gray-900 dark:text-white',
      inactiveClasses: 'text-gray-500 dark:text-gray-400',
      onOpen(accordion, item) {
        item.triggerEl.children[0].classList.remove('rounded-b-2xl');
        item.triggerEl.children[0].classList.remove('shadow-sm');
      },
      onClose(accordion, item) {
        item.triggerEl.children[0].classList.add('rounded-b-2xl');
        item.triggerEl.children[0].classList.add('shadow-sm');
      },
    };

    new Accordion(accordionEl, accordionItems, options);
  }
}
