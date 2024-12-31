import { Card } from '@card/interfaces/card.interface';
import { CombatDetail } from '@card/interfaces/combat-detail.interface';

export function generateCombatDetails(card: Card | null): CombatDetail[] {
  if (!card) return [];

  return [
    {
      type: 'ability',
      value:
        card.abilities && card.abilities.length > 0
          ? card.abilities
          : undefined,
      text:
        card.abilities && card.abilities.length > 1 ? 'abilities' : 'ability',
    },
    {
      type: 'attack',
      value: card.attacks && card.attacks.length > 0 ? card.attacks : undefined,
      text: card.attacks && card.attacks.length > 1 ? 'attacks' : 'attack',
    },
    {
      type: 'rule',
      value: card.rules && card.rules.length > 0 ? card.rules : undefined,
      text: card.rules && card.rules.length > 1 ? 'rules' : 'rule',
    },
  ];
}
