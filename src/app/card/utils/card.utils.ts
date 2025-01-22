import { Card } from '@card/interfaces/card.interface';

export function getColor(card: Card): string {
  return card.supertype === 'Pokémon'
    ? card.types[0].toLowerCase()
    : 'colorless';
}
