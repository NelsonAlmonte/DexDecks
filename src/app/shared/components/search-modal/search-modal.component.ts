import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './search-modal.component.html',
  styleUrl: './search-modal.component.css',
})
export class SearchModalComponent {
  router = inject(Router);
  searchForm = new FormGroup({
    cardName: new FormControl(''),
  });

  doSearch(): void {
    console.log(this.searchForm.value.cardName);
    const searchValue = `name:${this.searchForm.value.cardName}*`;
    this.router.navigate(['/search', searchValue]);
  }
}
