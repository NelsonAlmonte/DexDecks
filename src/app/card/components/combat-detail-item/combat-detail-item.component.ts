import { JsonPipe } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  input,
  ViewChild,
} from '@angular/core';
import { Ability, Attack } from '@card/interfaces/card.interface';
import { CombatDetail } from '@card/interfaces/combat-detail.interface';

@Component({
  selector: 'app-combat-detail-item',
  imports: [JsonPipe],
  templateUrl: './combat-detail-item.component.html',
  styleUrl: './combat-detail-item.component.css',
})
export class CombatDetailItemComponent {
  detail = input<CombatDetail>();
  foo = computed(() => {
    const detail = this.detail();
    if (!detail?.value) return [];
    return detail.value as any[];
  });
  @ViewChild('combatHeading') combatHeading!: ElementRef<HTMLElement>;
  @ViewChild('combatBody') combatBody!: ElementRef<HTMLElement>;
}
