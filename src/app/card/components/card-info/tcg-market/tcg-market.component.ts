import { Component, input, OnInit } from '@angular/core';
import { Card, TcgPlayer, TcgPrices } from '@card/interfaces/card.interface';

@Component({
  selector: 'app-tcg-market',
  imports: [],
  templateUrl: './tcg-market.component.html',
  styleUrl: './tcg-market.component.css',
})
export class TcgMarketComponent implements OnInit {
  card = input.required<Card>();
  markets: any[] = [];
  bar: any[] = [];

  ngOnInit(): void {
    this.foo();
  }

  foo(): void {
    const tcgMarket = this.card().tcgplayer;
    const cardMarket = this.card().cardmarket;

    this.bar = [
      {
        type: 'normal',
        values: {
          low: 0.05,
          mid: 0.2,
          high: 1.42,
          market: 0.14,
        },
      },
      {
        type: 'reverseHolofoil',
        values: {
          low: 0.19,
          mid: 0.34,
          high: 0.99,
          market: 0.32,
        },
      },
    ];

    const baz: any = [];
    const tcgMarketKeys = Object.keys(tcgMarket?.prices!);

    for (let index = 0; index < tcgMarketKeys.length; index++) {
      baz[index]['type'] = tcgMarketKeys[index];
      baz[index]['values'] =
        tcgMarket?.prices[tcgMarketKeys[index] as keyof TcgPrices];
    }

    // for (const element of tcgMarketKeys) {
    //   baz[element] = tcgMarket?.prices![element as keyof TcgPrices];
    // }
    console.log(baz);

    this.markets = [
      {
        type: 'tcgplayer',
        text: 'TCP Player',
        value: tcgMarket,
      },
      {
        type: 'cardmarket',
        text: 'CardMarket',
        value: cardMarket,
      },
    ];
  }
}
