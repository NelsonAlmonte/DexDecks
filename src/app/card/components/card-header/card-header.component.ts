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
  card = input.required<Card>();
  class = computed(() => {
    const color = this.card().types
      ? this.card().types[0].toLowerCase()
      : 'colorless';
    return `hover:text-${color}-700 hover:underline hover:decoration-${color}-700 cursor-pointer`;
  });

  goToSearch(param: string, value: string): void {
    const query = `${param}"${value}"`;
    this.router.navigate(['/search'], { queryParams: { q: query } });
  }
}
