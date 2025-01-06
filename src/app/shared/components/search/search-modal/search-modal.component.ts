import { Component } from '@angular/core';
import { SearchFormComponent } from '@shared/components/search/search-form/search-form.component';

@Component({
  selector: 'app-search-modal',
  imports: [SearchFormComponent],
  templateUrl: './search-modal.component.html',
  styleUrl: './search-modal.component.css',
})
export class SearchModalComponent {}
