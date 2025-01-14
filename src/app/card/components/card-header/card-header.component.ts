import { Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from '@card/interfaces/card.interface';

@Component({
  selector: 'app-card-header',
  imports: [],
  templateUrl: './card-header.component.html',
  styleUrl: './card-header.component.css',
})
export class CardHeaderComponent {
  router = inject(Router);
  card = input.required<Card | null>();
  class = computed(() => {
    return `hover:text-${this.card()?.types?.[0]?.toLowerCase()}-700 hover:underline hover:decoration-${this.card()?.types?.[0]?.toLowerCase()}-700 cursor-pointer`;
  });

  goToSearch(param: string, value: string): void {
    const encodedQuery = encodeURIComponent(`${param}"${value}"`);
    this.router.navigate(['/search'], { queryParams: { q: encodedQuery } });
  }
}
