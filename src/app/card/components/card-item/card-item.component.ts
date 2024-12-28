import { Component, inject, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from '@card/interfaces/card.interfae';
import { CardService } from '@card/services/card.service';

@Component({
  selector: 'app-card-item',
  imports: [],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css',
})
export class CardItemComponent implements OnInit {
  cardService = inject(CardService);
  card = input<Card>();
  transformStyle: string = '';
  zIndex: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  // TODO: Mover esto a una directiva?
  onMouseMove(event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    this.transformStyle = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
    this.zIndex = 'z-40';
  }

  onMouseLeave(): void {
    this.transformStyle = 'rotateX(0deg) rotateY(0deg)';
    this.zIndex = 'z-0';
  }

  goToCard(id: string | undefined): void {
    this.router.navigate(['/card', this.card()?.id]);
  }
}
