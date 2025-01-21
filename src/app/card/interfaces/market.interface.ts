import { CardMarketPrices, TcgPriceDetails } from './card.interface';

export interface Market {
  type: string;
  text: string;
  value: TCGMarket[] | CardMarket[] | undefined;
}

export interface TCGMarket {
  type: string;
  prices: TcgPriceDetails;
}

export interface CardMarket {
  type: string;
  prices: CardMarketPrices;
}

export interface CardMarketPricesType {
  normal: string[];
  reverseHolo: string[];
}
