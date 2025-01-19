import { Component, ElementRef, input, ViewChild } from '@angular/core';
import { CombatDetail } from '@card/interfaces/combat-detail.interface';
import {
  isAbility,
  isAttack,
  isRule,
} from '@card/factories/combat-detail.factory';
import { NgIcon } from '@ng-icons/core';
import { EnergyTypeComponent } from '@shared/components/energy-type/energy-type.component';

@Component({
  selector: 'app-combat-detail-item',
  imports: [NgIcon, EnergyTypeComponent],
  templateUrl: './combat-detail-item.component.html',
  styleUrl: './combat-detail-item.component.css',
})
export class CombatDetailItemComponent {
  detail = input<CombatDetail>();
  @ViewChild('combatHeading') combatHeading!: ElementRef<HTMLElement>;
  @ViewChild('combatBody') combatBody!: ElementRef<HTMLElement>;
  isAbility = isAbility;
  isAttack = isAttack;
  isRule = isRule;
}
