import { Component } from '@angular/core';
import { bootstrapSearch } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-no-results',
  imports: [NgIcon],
  templateUrl: './no-results.component.html',
  styleUrl: './no-results.component.css',
  providers: [
    provideIcons({
      bootstrapSearch,
    }),
  ],
})
export class NoResultsComponent {}
