import { Component, input, OnInit } from '@angular/core';
import {
  Card,
  CardMarket,
  CardMarketPrices,
  TcgPlayer,
  TcgPriceDetails,
  TcgPrices,
} from '@card/interfaces/card.interface';
import {
  CardMarketDetails,
  CardMarketPricesType,
  Market,
  TCGMarketDetails,
} from '@card/interfaces/market.interface';
import { getColor } from '@card/utils/card.utils';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapBoxArrowUpRight } from '@ng-icons/bootstrap-icons';
import { NoResultsComponent } from '@shared/components/search/no-results/no-results.component';

@Component({
  selector: 'app-market-info',
  imports: [NoResultsComponent, NgIcon],
  templateUrl: './market-info.component.html',
  styleUrl: './market-info.component.css',
  providers: [
    provideIcons({
      bootstrapBoxArrowUpRight,
    }),
  ],
})
export class MarketInfoComponent implements OnInit {
  card = input.required<Card>();
  markets: Market[] = [];

  ngOnInit(): void {
    this.handleMarkets();
  }

  handleTcgMarket(tcgMarket: TcgPlayer): TCGMarketDetails[] {
    return Object.keys(tcgMarket.prices).map((key) => {
      return {
        type: key,
        formatedType: this.formatCardType(key),
        prices: tcgMarket.prices[key as keyof TcgPrices] as TcgPriceDetails,
      };
    });
  }

  handleCardMarket(cardMarket: CardMarket): CardMarketDetails[] {
    const cardMarketPricesType: CardMarketPricesType = {
      normal: ['lowPrice', 'avg1', 'avg7', 'avg30'],
      reverseHolo: [
        'reverseHoloLow',
        'reverseHoloAvg1',
        'reverseHoloAvg7',
        'reverseHoloAvg30',
      ],
    };

    return Object.keys(cardMarketPricesType).map((key) => {
      return {
        type: key,
        formatedType: this.formatCardType(key),
        prices: Object.fromEntries(
          cardMarketPricesType[key as keyof CardMarketPricesType].map(
            (type) => [type, cardMarket.prices[type as keyof CardMarketPrices]]
          )
        ) as CardMarketPrices,
      };
    });
  }

  handleMarkets(): void {
    const tcgMarket = this.card().tcgplayer;
    const cardMarket = this.card().cardmarket;
    if (tcgMarket) {
      this.markets.push({
        type: 'tcgplayer',
        text: 'TCG Player',
        color: getColor(this.card()),
        currencySign: '$',
        url: tcgMarket.url,
        value: this.handleTcgMarket(tcgMarket),
      });
    }
    if (cardMarket) {
      this.markets.push({
        type: 'cardmarket',
        text: 'CardMarket',
        color: getColor(this.card()),
        currencySign: '€',
        url: cardMarket.url,
        value: this.handleCardMarket(cardMarket),
      });
    }
  }

  formatCardType(input: string): string {
    return input
      .replace(/reverseHolofoil/g, 'Reverse Holofoil')
      .replace(/1stEditionHolofoil/g, '1st Edition Holofoil')
      .replace(/1stEditionNormal/g, '1st Edition Normal')
      .replace(/reverseHolo/g, 'Reverse Holo');
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
