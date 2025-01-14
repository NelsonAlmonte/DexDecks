import { Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { CardDetailItem } from '@card/interfaces/card-detail-item.interface';
import { NgIcon } from '@ng-icons/core';
import { EnergyTypeComponent } from '@shared/components/energy-type/energy-type.component';

@Component({
  selector: 'app-card-detail-item',
  imports: [NgIcon, EnergyTypeComponent],
  templateUrl: './card-detail-item.component.html',
  styleUrl: './card-detail-item.component.css',
})
export class CardDetailItemComponent {
  router = inject(Router);
  detail = input.required<CardDetailItem>();
  param = computed(() => {
    const detail = this.detail();
    if (detail.param) {
      const color = detail.color;
      return `hover:text-${color}-700 hover:underline hover:decoration-${color}-700 cursor-pointer`;
    }
    return '';
  });

  goToSearch(param: string | undefined): void {
    if (!param) return;
    const encodedQuery = encodeURIComponent(param);
    this.router.navigate(['/search'], { queryParams: { q: encodedQuery } });
  }
}
