import { cardType } from '@shared/interfaces/search.interface';

export const types: string[] = [
  'Grass',
  'Fire',
  'Water',
  'Lightning',
  'Psychic',
  'Fighting',
  'Darkness',
  'Metal',
  'Colorless',
  'Fairy',
  'Dragon',
];

// export const cardTypes: string[] = ['Energy', 'Pokémon', 'Trainer'];

export const cardTypes: cardType[] = [
  {
    type: 'Pokémon',
    icon: 'Trainer',
  },
  {
    type: 'Trainer',
    icon: 'Trainer',
  },
  {
    type: 'Energy',
    icon: 'Trainer',
  },
];
