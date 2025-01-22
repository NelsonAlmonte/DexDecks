import { Card } from '@card/interfaces/card.interface';
import { RelatedCard } from '@card/interfaces/related-card.interface';
import { getColor } from '@card/utils/card.utils';

export function generateRelatedCards(card: Card): RelatedCard[] {
  return [
    {
      type: 'set',
      searchParam: 'set.name:',
      searchValue: card.set.name,
      page: 1,
      text: `More cards from ${card.set.name}`,
      textColor:
        card.supertype === 'Pokémon'
          ? card.types[0].toLowerCase()
          : 'colorless',
    },
    {
      type: 'similar',
      searchParam: 'name:',
      searchValue: card.name,
      page: 1,
      text: `Similar cards to ${card.name}`,
      textColor: getColor(card),
    },
  ];
}
