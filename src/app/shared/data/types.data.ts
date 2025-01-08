import { EnergyType, CardType } from '@shared/interfaces/search.interface';

export const energyTypes: EnergyType[] = [
  { name: 'Grass', color: 'grass' },
  { name: 'Fire', color: 'fire' },
  { name: 'Water', color: 'water' },
  { name: 'Lightning', color: 'lightning' },
  { name: 'Psychic', color: 'psychic' },
  { name: 'Fighting', color: 'fighting' },
  { name: 'Darkness', color: 'darkness' },
  { name: 'Metal', color: 'metal' },
  { name: 'Colorless', color: 'colorless' },
  { name: 'Fairy', color: 'fairy' },
  { name: 'Dragon', color: 'dragon' },
];

export const cardTypes: CardType[] = [
  {
    name: 'Pokémon',
    color: 'colorless',
    icon: 'bootstrapCircle',
  },
  {
    name: 'Trainer',
    color: 'colorless',
    icon: 'bootstrapPersonWalking',
  },
  {
    name: 'Energy',
    color: 'colorless',
    icon: 'bootstrapLightningCharge',
  },
];
