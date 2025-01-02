import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { CardDetailItem } from '@card/interfaces/card-detail-item.interface';
import { NgIcon } from '@ng-icons/core';
import { EnergyTypeComponent } from '@shared/components/energy-type/energy-type.component';

@Component({
  selector: 'app-card-detail-item',
  imports: [NgIcon, CommonModule, EnergyTypeComponent],
  templateUrl: './card-detail-item.component.html',
  styleUrl: './card-detail-item.component.css',
})
export class CardDetailItemComponent {
  detail = input<CardDetailItem>();
}
