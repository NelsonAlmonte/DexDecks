import { Component } from '@angular/core';
import {
  bootstrapArrowClockwise,
  bootstrapXOctagon,
} from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-no-results',
  imports: [NgIcon],
  templateUrl: './no-results.component.html',
  styleUrl: './no-results.component.css',
  providers: [
    provideIcons({
      bootstrapArrowClockwise,
      bootstrapXOctagon,
    }),
  ],
})
export class NoResultsComponent {}
