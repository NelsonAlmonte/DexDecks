import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-card-detail-item',
  imports: [NgIcon, CommonModule],
  templateUrl: './card-detail-item.component.html',
  styleUrl: './card-detail-item.component.css',
})
export class CardDetailItemComponent {
  type = input<string>('');
  value = input<string | number | undefined>();
  color = input<string>('');
  icon = input<string | undefined>();
  element = input<string | undefined>();
}
