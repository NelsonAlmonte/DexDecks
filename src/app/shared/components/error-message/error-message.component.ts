import { Component } from '@angular/core';
import {
  bootstrapArrowClockwise,
  bootstrapXOctagon,
} from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-error-message',
  imports: [NgIcon],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.css',
  providers: [
    provideIcons({
      bootstrapArrowClockwise,
      bootstrapXOctagon,
    }),
  ],
})
export class ErrorMessageComponent {
  reloadPage(): void {
    window.location.reload();
  }
}
