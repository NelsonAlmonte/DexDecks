import { CardDetailItem } from '@card/interfaces/card-detail-item.interface';
import { Card, Legalities } from '@card/interfaces/card.interface';
import { getColor } from '@card/utils/card.utils';

export function generateCardDetails(card: Card | null): CardDetailItem[] {
  if (!card) return [];
  const cardDetailItems: CardDetailItem[] = [
    {
      type: 'Type',
      value: card.types?.[0] ?? undefined,
      color: getColor(card),
      element: card.types?.[0]?.toLowerCase() ?? undefined,
      param: card.types?.[0] ? `types:${card.types[0]}` : undefined,
    },
    {
      type: 'Weakness',
      value: card.weaknesses?.[0]
        ? `${card.weaknesses[0].type} ${card.weaknesses[0].value}`
        : undefined,
      color: getColor(card),
      element: card.weaknesses?.[0]?.type?.toLowerCase() ?? undefined,
      param: `weaknesses.type:${card.weaknesses?.[0].type}`,
    },
    {
      type: 'Resistances',
      value: card.resistances?.[0]
        ? `${card.resistances[0].type} ${card.resistances[0].value}`
        : undefined,
      color: getColor(card),
      element: card.resistances?.[0]?.type?.toLowerCase() ?? undefined,
      param: `resistances.type:${card.resistances?.[0].type}`,
    },
    {
      type: 'Retreat',
      value: card.retreatCost?.[0]
        ? `${card.retreatCost[0]} ×${card.retreatCost.length}`
        : undefined,
      color: getColor(card),
      element: card.retreatCost?.[0]?.toLowerCase() ?? undefined,
      param: `retreatCost:${card.retreatCost?.[0]}`,
    },
    {
      type: 'Hit points',
      value: card.hp ?? undefined,
      color: getColor(card),
      icon: 'bootstrapHeart',
      param: `hp:${card.hp}`,
    },
    {
      type: 'Rarity',
      value: card.rarity ?? undefined,
      color: getColor(card),
      icon: 'bootstrapStars',
      param: `rarity:"${card.rarity}"`,
    },
    {
      type: 'Set',
      value: card.set.name ?? undefined,
      color: getColor(card),
      icon: 'bootstrapBoxSeam',
      param: `set.name:"${card.set.name}"`,
    },
    {
      type: 'Series',
      value: card.set.series ?? undefined,
      color: getColor(card),
      icon: 'bootstrapTags',
      param: `set.series:"${card.set.series}"`,
    },
    {
      type: 'Card number',
      value: card.number
        ? `${card.number} / ${card.set.printedTotal}`
        : undefined,
      color: getColor(card),
      icon: 'bootstrapListOl',
    },
    {
      type: 'Release date',
      value: card.set.releaseDate ?? undefined,
      color: getColor(card),
      icon: 'bootstrapCalendar3',
    },
    {
      type: 'National dex number',
      value: card.nationalPokedexNumbers?.[0] ?? undefined,
      color: getColor(card),
      icon: 'bootstrapJournal',
      param: `nationalPokedexNumbers:${card.nationalPokedexNumbers?.[0]}`,
    },
    {
      type: 'Artist',
      value: card.artist ?? undefined,
      color: getColor(card),
      icon: 'bootstrapPalette',
      param: `artist:"${card.artist}"`,
    },
  ];
  getLegalities(card).forEach((cardDetailItem: CardDetailItem) => {
    cardDetailItems.push(cardDetailItem);
  });
  return cardDetailItems;
}

export function getLegalities(card: Card): CardDetailItem[] {
  return Object.keys(card.legalities).map((key) => {
    const legalityValue = card.legalities[key as keyof Legalities];
    return {
      type: key,
      value: legalityValue,
      color: getColor(card),
      icon: 'bootstrapJournalBookmarkFill',
      param: `legalities.${key}:"${legalityValue}"`,
    };
  });
}
