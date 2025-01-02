import { CardDetailItem } from '@card/interfaces/card-detail-item.interface';
import { Card } from '@card/interfaces/card.interface';

export function generateCardDetails(card: Card | null): CardDetailItem[] {
  if (!card) return [];
  return [
    {
      type: 'Type',
      value: card.types?.[0] ?? undefined,
      color: 'fire',
      element: card.types?.[0]?.toLocaleLowerCase() ?? undefined,
    },
    {
      type: 'Weakness',
      value: card.weaknesses?.[0]
        ? `${card.weaknesses[0].type} ${card.weaknesses[0].value}`
        : undefined,
      color: 'fire',
      element: card.weaknesses?.[0]?.type?.toLocaleLowerCase() ?? undefined,
    },
    {
      type: 'Resistances',
      value: card.resistances?.[0]
        ? `${card.resistances[0].type} ${card.resistances[0].value}`
        : undefined,
      color: 'fire',
      element: card.resistances?.[0]?.type?.toLocaleLowerCase() ?? undefined,
    },
    {
      type: 'Retreat',
      value: card.retreatCost?.[0]
        ? `${card.retreatCost[0]} × ${card.retreatCost.length}`
        : undefined,
      color: 'fire',
      element: card.retreatCost?.[0]?.toLocaleLowerCase() ?? undefined,
    },
    {
      type: 'Hit points',
      value: card.hp ?? undefined,
      color: 'fire',
      icon: 'bootstrapHeart',
    },
    {
      type: 'Rarity',
      value: card.rarity ?? undefined,
      color: 'fire',
      icon: 'bootstrapStars',
    },
    {
      type: 'Expansion',
      value: card.set.name ?? undefined,
      color: 'fire',
      icon: 'bootstrapBoxSeam',
    },
    {
      type: 'Series',
      value: card.set.series ?? undefined,
      color: 'fire',
      icon: 'bootstrapTags',
    },
    {
      type: 'Card number',
      value: card.number
        ? `${card.number} / ${card.set.printedTotal}`
        : undefined,
      color: 'fire',
      icon: 'bootstrapListOl',
    },
    {
      type: 'Release date',
      value: card.set.releaseDate ?? undefined,
      color: 'fire',
      icon: 'bootstrapCalendar3',
    },
    {
      type: 'National dex number',
      value: card.nationalPokedexNumbers?.[0] ?? undefined,
      color: 'fire',
      icon: 'bootstrapJournal',
    },
    {
      type: 'Artist',
      value: card.artist ?? undefined,
      color: 'fire',
      icon: 'bootstrapPalette',
    },
  ];
}
