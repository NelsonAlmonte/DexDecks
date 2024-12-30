export interface Response<T> {
  data: T;
}

export interface Card {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp: string;
  types: string[];
  evolvesFrom?: string;
  evolvesTo?: string;
  abilities?: Ability[];
  attacks?: Attack[];
  rules?: string[];
  weaknesses?: Weakness[];
  resistances?: Resistances[];
  retreatCost?: string[];
  convertedRetreatCost?: number;
  set: SetInfo;
  number: string;
  artist: string;
  rarity: string;
  flavorText?: string;
  nationalPokedexNumbers?: number[];
  legalities: Legalities;
  images: CardImages;
  tcgplayer?: TcgPlayer;
  cardmarket?: CardMarket;
}

export interface Ability {
  name: string;
  text: string;
  type: string;
}

export interface Attack {
  name: string;
  cost: string[];
  convertedEnergyCost: number;
  damage: string;
  text: string;
}

export interface Weakness {
  type: string;
  value: string;
}

export interface Resistances {
  type: string;
  value: string;
}

export interface SetInfo {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: Legalities;
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: SetImages;
}

export interface Legalities {
  unlimited: string;
  standard: string;
  expanded: string;
}

export interface SetImages {
  symbol: string;
  logo: string;
}

export interface CardImages {
  small: string;
  large: string;
}

export interface TcgPlayer {
  url: string;
  updatedAt: string;
  prices: TcgPrices;
}

export interface TcgPrices {
  normal?: TcgPriceDetails;
  reverseHolofoil?: TcgPriceDetails;
}

export interface TcgPriceDetails {
  low: number;
  mid: number;
  high: number;
  market: number;
  directLow?: number;
}

export interface CardMarket {
  url: string;
  updatedAt: string;
  prices: CardMarketPrices;
}

export interface CardMarketPrices {
  averageSellPrice?: number;
  lowPrice?: number;
  trendPrice?: number;
  germanProLow?: number | null;
  suggestedPrice?: number | null;
  reverseHoloSell?: number | null;
  reverseHoloLow?: number | null;
  reverseHoloTrend?: number | null;
  lowPriceExPlus?: number;
  avg1?: number;
  avg7?: number;
  avg30?: number;
  reverseHoloAvg1?: number | null;
  reverseHoloAvg7?: number | null;
  reverseHoloAvg30?: number | null;
}
