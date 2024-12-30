import { CardDetailItem } from '@card/interfaces/card-detail-item.interface';
import { Card } from '@card/interfaces/card.interface';

export function generateCardDetails(card: Card | null): CardDetailItem[] {
  if (!card) return [];
  return [
    {
      type: 'Type',
      value: card.types?.[0] ?? undefined,
      color: 'sky',
      element: card.types?.[0]?.toLocaleLowerCase() ?? undefined,
    },
    {
      type: 'Weakness',
      value: card.weaknesses?.[0]
        ? `${card.weaknesses[0].type} ${card.weaknesses[0].value}`
        : undefined,
      color: 'sky',
      element: card.weaknesses?.[0]?.type?.toLocaleLowerCase() ?? undefined,
    },
    {
      type: 'Resistances',
      value: card.resistances?.[0]
        ? `${card.resistances[0].type} ${card.resistances[0].value}`
        : undefined,
      color: 'sky',
      element: card.resistances?.[0]?.type?.toLocaleLowerCase() ?? undefined,
    },
    {
      type: 'Retreat',
      value: card.retreatCost?.[0]
        ? `${card.retreatCost[0]} × ${card.retreatCost.length}`
        : undefined,
      color: 'sky',
      element: card.retreatCost?.[0]?.toLocaleLowerCase() ?? undefined,
    },
    {
      type: 'Hit points',
      value: card.hp ?? undefined,
      color: 'sky',
      icon: 'bootstrapHeart',
    },
    {
      type: 'Rarity',
      value: card.rarity ?? undefined,
      color: 'sky',
      icon: 'bootstrapStars',
    },
    {
      type: 'Expansion',
      value: card.set.name ?? undefined,
      color: 'sky',
      icon: 'bootstrapBoxSeam',
    },
    {
      type: 'Series',
      value: card.set.series ?? undefined,
      color: 'sky',
      icon: 'bootstrapTags',
    },
    {
      type: 'Card number',
      value: card.number
        ? `${card.number} / ${card.set.printedTotal}`
        : undefined,
      color: 'sky',
      icon: 'bootstrapListOl',
    },
    {
      type: 'Release date',
      value: card.set.releaseDate ?? undefined,
      color: 'sky',
      icon: 'bootstrapCalendar3',
    },
    {
      type: 'National dex number',
      value: card.nationalPokedexNumbers?.[0] ?? undefined,
      color: 'sky',
      icon: 'bootstrapJournal',
    },
    {
      type: 'Artist',
      value: card.artist ?? undefined,
      color: 'sky',
      icon: 'bootstrapPalette',
    },
  ];
}
