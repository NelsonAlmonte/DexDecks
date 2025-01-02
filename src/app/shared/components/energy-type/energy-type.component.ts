import { Component, input } from '@angular/core';

@Component({
  selector: 'app-energy-type',
  imports: [],
  templateUrl: './energy-type.component.html',
  styleUrl: './energy-type.component.css',
})
export class EnergyTypeComponent {
  type = input<string>();
}
