import { Ability, Attack } from './card.interface';

export interface CombatDetail {
  type: string;
  value: Ability[] | Attack[] | string[] | undefined;
  text: string;
  icon: string;
}
