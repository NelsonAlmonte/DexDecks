import { Ability, Attack, Card } from '@card/interfaces/card.interface';
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
      icon: 'bootstrapLightning',
    },
    {
      type: 'attack',
      value: card.attacks && card.attacks.length > 0 ? card.attacks : undefined,
      text: card.attacks && card.attacks.length > 1 ? 'attacks' : 'attack',
      icon: 'bootstrapFire',
    },
    {
      type: 'rule',
      value: card.rules && card.rules.length > 0 ? card.rules : undefined,
      text: card.rules && card.rules.length > 1 ? 'rules' : 'rule',
      icon: 'bootstrapBook',
    },
  ];
}

export function isAttack(item: Attack | Ability | string): item is Attack {
  return (
    typeof item === 'object' &&
    'name' in item &&
    'cost' in item &&
    'convertedEnergyCost' in item
  );
}

export function isAbility(item: Attack | Ability | string): item is Ability {
  return (
    typeof item === 'object' &&
    'name' in item &&
    'text' in item &&
    'type' in item
  );
}

export function isRule(item: Attack | Ability | string): item is string {
  return typeof item === 'string';
}
