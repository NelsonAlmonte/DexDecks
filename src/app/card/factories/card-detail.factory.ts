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
          ? card.types[0].toLowerCase()
          : 'colorless',
      element: card.types?.[0]?.toLowerCase() ?? undefined,
      param: card.types?.[0] ? `types:${card.types[0]}` : undefined,
    },
    {
      type: 'Weakness',
      value: card.weaknesses?.[0]
        ? `${card.weaknesses[0].type} ${card.weaknesses[0].value}`
        : undefined,
      color:
        card.supertype === 'Pokémon'
          ? card.types[0].toLowerCase()
          : 'colorless',
      element: card.weaknesses?.[0]?.type?.toLowerCase() ?? undefined,
      param: `weaknesses.type:${card.weaknesses?.[0].type}`,
    },
    {
      type: 'Resistances',
      value: card.resistances?.[0]
        ? `${card.resistances[0].type} ${card.resistances[0].value}`
        : undefined,
      color:
        card.supertype === 'Pokémon'
          ? card.types[0].toLowerCase()
          : 'colorless',
      element: card.resistances?.[0]?.type?.toLowerCase() ?? undefined,
      param: `resistances.type:${card.resistances?.[0].type}`,
    },
    {
      type: 'Retreat',
      value: card.retreatCost?.[0]
        ? `${card.retreatCost[0]} ×${card.retreatCost.length}`
        : undefined,
      color:
        card.supertype === 'Pokémon'
          ? card.types[0].toLowerCase()
          : 'colorless',
      element: card.retreatCost?.[0]?.toLowerCase() ?? undefined,
      param: `retreatCost:${card.retreatCost?.[0]}`,
    },
    {
      type: 'Hit points',
      value: card.hp ?? undefined,
      color:
        card.supertype === 'Pokémon'
          ? card.types[0].toLowerCase()
          : 'colorless',
      icon: 'bootstrapHeart',
      param: `hp:${card.hp}`,
    },
    {
      type: 'Rarity',
      value: card.rarity ?? undefined,
      color:
        card.supertype === 'Pokémon'
          ? card.types[0].toLowerCase()
          : 'colorless',
      icon: 'bootstrapStars',
      param: `rarity:"${card.rarity}"`,
    },
    {
      type: 'Set',
      value: card.set.name ?? undefined,
      color:
        card.supertype === 'Pokémon'
          ? card.types[0].toLowerCase()
          : 'colorless',
      icon: 'bootstrapBoxSeam',
      param: `set.name:"${card.set.name}"`,
    },
    {
      type: 'Series',
      value: card.set.series ?? undefined,
      color:
        card.supertype === 'Pokémon'
          ? card.types[0].toLowerCase()
          : 'colorless',
      icon: 'bootstrapTags',
      param: `set.series:"${card.set.series}"`,
    },
    {
      type: 'Card number',
      value: card.number
        ? `${card.number} / ${card.set.printedTotal}`
        : undefined,
      color:
        card.supertype === 'Pokémon'
          ? card.types[0].toLowerCase()
          : 'colorless',
      icon: 'bootstrapListOl',
    },
    {
      type: 'Release date',
      value: card.set.releaseDate ?? undefined,
      color:
        card.supertype === 'Pokémon'
          ? card.types[0].toLowerCase()
          : 'colorless',
      icon: 'bootstrapCalendar3',
    },
    {
      type: 'National dex number',
      value: card.nationalPokedexNumbers?.[0] ?? undefined,
      color:
        card.supertype === 'Pokémon'
          ? card.types[0].toLowerCase()
          : 'colorless',
      icon: 'bootstrapJournal',
      param: `nationalPokedexNumbers:${card.nationalPokedexNumbers?.[0]}`,
    },
    {
      type: 'Artist',
      value: card.artist ?? undefined,
      color:
        card.supertype === 'Pokémon'
          ? card.types[0].toLowerCase()
          : 'colorless',
      icon: 'bootstrapPalette',
      param: `artist:"${card.artist}"`,
    },
  ];
}
