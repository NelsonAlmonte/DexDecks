import { Component } from '@angular/core';

@Component({
  selector: 'app-search-filter-skeleton',
  imports: [],
  templateUrl: './search-filter-skeleton.component.html',
  styleUrl: './search-filter-skeleton.component.css',
})
export class SearchFilterSkeletonComponent {
  iterations = Array.from({ length: 10 });
}
