import { Component, input, OnInit } from '@angular/core';
import {
  Card,
  CardMarketPrices,
  TcgPriceDetails,
  TcgPrices,
} from '@card/interfaces/card.interface';
import {
  CardMarket,
  CardMarketPricesType,
  Market,
  TCGMarket,
} from '@card/interfaces/market.interface';

@Component({
  selector: 'app-tcg-market',
  imports: [],
  templateUrl: './tcg-market.component.html',
  styleUrl: './tcg-market.component.css',
})
export class TcgMarketComponent implements OnInit {
  card = input.required<Card>();
  markets: Market[] = [];

  ngOnInit(): void {
    this.foo();
  }

  foo(): void {
    const tcgMarket = this.card().tcgplayer;
    const cardMarket = this.card().cardmarket;

    const tcgMarketPrices: TCGMarket[] = Object.keys(tcgMarket?.prices!).map(
      (key) => {
        return {
          type: key,
          prices: tcgMarket?.prices[key as keyof TcgPrices] as TcgPriceDetails,
        };
      }
    );

    this.markets.push({
      type: 'tcgplayer',
      text: 'TCG Player',
      value: tcgMarketPrices,
    });
    console.log(tcgMarketPrices);

    const cardMarketPricesType: CardMarketPricesType = {
      normal: ['lowPrice', 'avg1', 'avg7', 'avg30'],
      reverseHolo: [
        'reverseHoloLow',
        'reverseHoloAvg1',
        'reverseHoloAvg7',
        'reverseHoloAvg30',
      ],
    };

    const cardMarketPrices: CardMarket[] = Object.keys(
      cardMarketPricesType
    ).map((key) => {
      return {
        type: key,
        prices: Object.fromEntries(
          cardMarketPricesType[key as keyof CardMarketPricesType].map((val) => [
            val,
            cardMarket?.prices[val as keyof CardMarketPrices],
          ])
        ),
      };
    });

    this.markets.push({
      type: 'cardmarket',
      text: 'CardMarket',
      value: cardMarketPrices,
    });
    console.log(cardMarketPrices);
  }

  isTcgPriceDetails(prices: any): prices is TcgPriceDetails {
    return (
      prices &&
      typeof prices.low === 'number' &&
      typeof prices.mid === 'number' &&
      typeof prices.high === 'number' &&
      typeof prices.market === 'number'
    );
  }
}
