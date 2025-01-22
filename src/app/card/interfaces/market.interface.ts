import { CardMarketPrices, TcgPriceDetails } from './card.interface';

export interface Market {
  type: string;
  text: string;
  color: string;
  currencySign: string;
  url: string;
  value: TCGMarketDetails[] | CardMarketDetails[] | undefined;
}

export interface TCGMarketDetails {
  type: string;
  formatedType: string;
  prices: TcgPriceDetails;
}

export interface CardMarketDetails {
  type: string;
  formatedType: string;
  prices: CardMarketPrices;
}

export interface CardMarketPricesType {
  normal: string[];
  reverseHolo: string[];
}
