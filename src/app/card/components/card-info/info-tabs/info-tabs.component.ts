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
import {
  InstanceOptions,
  TabItem,
  Tabs,
  TabsInterface,
  TabsOptions,
} from 'flowbite';
import { RelatedCardsComponent } from '@card/components/card-info/related-cards/related-cards.component';
import { MarketInfoComponent } from '@card/components/card-info/market-info/market-info.component';
import { Card } from '@card/interfaces/card.interface';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapCart2, bootstrapFileImage } from '@ng-icons/bootstrap-icons';
import { getColor } from '@card/utils/card.utils';

@Component({
  selector: 'app-info-tabs',
  imports: [RelatedCardsComponent, MarketInfoComponent, NgIcon],
  templateUrl: './info-tabs.component.html',
  styleUrl: './info-tabs.component.css',
  providers: [
    provideIcons({
      bootstrapFileImage,
      bootstrapCart2,
    }),
  ],
})
export class InfoTabsComponent implements AfterViewInit {
  card = input.required<Card>();
  @ViewChild('infoTabs') infoTabs!: ElementRef<HTMLElement>;
  @ViewChildren('triggerTab') triggerTabs!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('targetTab') targetTabs!: QueryList<ElementRef<HTMLElement>>;

  ngAfterViewInit(): void {
    this.setupTabs();
  }

  setupTabs(): void {
    const tabsEl = this.infoTabs.nativeElement;
    const tabsItems: TabItem[] = [];

    this.triggerTabs.forEach((el, index) => {
      tabsItems.push({
        id: el.nativeElement.id,
        triggerEl: el.nativeElement,
        targetEl: this.targetTabs.get(index)!.nativeElement,
      });
    });

    const options: TabsOptions = {
      activeClasses: `text-gray-900 bg-${this.getColor()}-100 shadow-sm`,
      inactiveClasses: `bg-gray-50 hover:bg-${this.getColor()}-200 text-gray-900 hover:text-gray-900`,
    };

    const instanceOptions: InstanceOptions = {
      id: tabsEl.id,
      override: true,
    };

    const tabs: TabsInterface = new Tabs(
      tabsEl,
      tabsItems,
      options,
      instanceOptions
    );

    tabs.show(this.triggerTabs.first.nativeElement.id);
  }

  getColor(): string {
    return getColor(this.card());
  }
}
