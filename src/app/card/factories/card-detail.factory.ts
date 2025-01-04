import { CardDetailItem } from '@card/interfaces/card-detail-item.interface';
import { Card } from '@card/interfaces/card.interface';

export function generateCardDetails(card: Card | null): CardDetailItem[] {
  if (!card) return [];
  return [
    {
      type: 'Type',
      value: card.types?.[0] ?? undefined,
      color:
        card.supertype === 'Pokémon'
          ? card.types[0].toLocaleLowerCase()
          : 'colorless',
      element: card.types?.[0]?.toLocaleLowerCase() ?? undefined,
    },
    {
      type: 'Weakness',
      value: card.weaknesses?.[0]
        ? `${card.weaknesses[0].type} ${card.weaknesses[0].value}`
        : undefined,
      color:
        card.supertype === 'Pokémon'
          ? card.types[0].toLocaleLowerCase()
          : 'colorless',
      element: card.weaknesses?.[0]?.type?.toLocaleLowerCase() ?? undefined,
    },
    {
      type: 'Resistances',
      value: card.resistances?.[0]
        ? `${card.resistances[0].type} ${card.resistances[0].value}`
        : undefined,
      color:
        card.supertype === 'Pokémon'
          ? card.types[0].toLocaleLowerCase()
          : 'colorless',
      element: card.resistances?.[0]?.type?.toLocaleLowerCase() ?? undefined,
    },
    {
      type: 'Retreat',
      value: card.retreatCost?.[0]
        ? `${card.retreatCost[0]} × ${card.retreatCost.length}`
        : undefined,
      color:
        card.supertype === 'Pokémon'
          ? card.types[0].toLocaleLowerCase()
          : 'colorless',
      element: card.retreatCost?.[0]?.toLocaleLowerCase() ?? undefined,
    },
    {
      type: 'Hit points',
      value: card.hp ?? undefined,
      color:
        card.supertype === 'Pokémon'
          ? card.types[0].toLocaleLowerCase()
          : 'colorless',
      icon: 'bootstrapHeart',
    },
    {
      type: 'Rarity',
      value: card.rarity ?? undefined,
      color:
        card.supertype === 'Pokémon'
          ? card.types[0].toLocaleLowerCase()
          : 'colorless',
      icon: 'bootstrapStars',
    },
    {
      type: 'Expansion',
      value: card.set.name ?? undefined,
      color:
        card.supertype === 'Pokémon'
          ? card.types[0].toLocaleLowerCase()
          : 'colorless',
      icon: 'bootstrapBoxSeam',
    },
    {
      type: 'Series',
      value: card.set.series ?? undefined,
      color:
        card.supertype === 'Pokémon'
          ? card.types[0].toLocaleLowerCase()
          : 'colorless',
      icon: 'bootstrapTags',
    },
    {
      type: 'Card number',
      value: card.number
        ? `${card.number} / ${card.set.printedTotal}`
        : undefined,
      color:
        card.supertype === 'Pokémon'
          ? card.types[0].toLocaleLowerCase()
          : 'colorless',
      icon: 'bootstrapListOl',
    },
    {
      type: 'Release date',
      value: card.set.releaseDate ?? undefined,
      color:
        card.supertype === 'Pokémon'
          ? card.types[0].toLocaleLowerCase()
          : 'colorless',
      icon: 'bootstrapCalendar3',
    },
    {
      type: 'National dex number',
      value: card.nationalPokedexNumbers?.[0] ?? undefined,
      color:
        card.supertype === 'Pokémon'
          ? card.types[0].toLocaleLowerCase()
          : 'colorless',
      icon: 'bootstrapJournal',
    },
    {
      type: 'Artist',
      value: card.artist ?? undefined,
      color:
        card.supertype === 'Pokémon'
          ? card.types[0].toLocaleLowerCase()
          : 'colorless',
      icon: 'bootstrapPalette',
    },
  ];
}
