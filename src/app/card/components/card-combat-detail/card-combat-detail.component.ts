import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Tabs } from 'flowbite';
import type { TabsOptions, TabsInterface, TabItem } from 'flowbite';
import type { InstanceOptions } from 'flowbite';

@Component({
  selector: 'app-card-combat-detail',
  imports: [],
  templateUrl: './card-combat-detail.component.html',
  styleUrl: './card-combat-detail.component.css',
})
export class CardCombatDetailComponent implements AfterViewInit {
  @ViewChild('tabsExample')
  tabsExample!: ElementRef<HTMLElement>;
  @ViewChild('profileTabExample')
  profileTabExample!: ElementRef<HTMLElement>;
  @ViewChild('dashboardTabExample')
  dashboardTabExample!: ElementRef<HTMLElement>;
  @ViewChild('profileExample')
  profileExample!: ElementRef<HTMLElement>;
  @ViewChild('dashboardExample')
  dashboardExample!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    this.setupTabs();
  }

  setupTabs(): void {
    // const tabsElement: HTMLElement = this.tabsExample.nativeElement;
    // const tabElements: TabItem[] = [
    //   {
    //     id: 'profile',
    //     triggerEl: this.profileTabExample.nativeElement,
    //     targetEl: this.profileExample.nativeElement,
    //   },
    //   {
    //     id: 'dashboard',
    //     triggerEl: this.dashboardTabExample.nativeElement,
    //     targetEl: this.dashboardExample.nativeElement,
    //   },
    // ];
    // // options with default values
    // const options: TabsOptions = {
    //   defaultTabId: 'profile',
    //   activeClasses: 'text-white bg-blue-600 active',
    //   inactiveClasses:
    //     'hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white',
    // };
    // const tabs: TabsInterface = new Tabs(tabsElement, tabElements, options);
    // tabs.show('profile');
  }
}
