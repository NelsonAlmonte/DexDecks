import { Component, inject, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from '@card/interfaces/card.interface';
import { CardService } from '@card/services/card.service';
import { bootstrapZoomIn } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { getColor } from '@card/utils/card.utils';
import {
  IAlbum,
  Lightbox,
  LightboxConfig,
  LightboxModule,
} from '@pierresh/ngx-lightbox';

@Component({
  selector: 'app-card-item',
  imports: [NgIcon, LightboxModule],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css',
  providers: [
    provideIcons({
      bootstrapZoomIn,
    }),
  ],
})
export class CardItemComponent implements OnInit {
  router = inject(Router);
  cardService = inject(CardService);
  lightbox = inject(Lightbox);
  lightboxConfig = inject(LightboxConfig);
  card = input.required<Card>();
  allowNavigation = input<Boolean>(true);
  transformStyle: string = '';
  zIndex: string = '';

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

  goToCard(): void {
    if (!this.allowNavigation()) return;
    this.router.navigate(['/card', this.card().id]);
  }

  getColor(): string {
    return getColor(this.card());
  }

  viewImage(event: Event): void {
    event.stopPropagation();
    this.lightboxConfig.fadeDuration = 0.1;
    this.lightboxConfig.resizeDuration = 0;
    const album: IAlbum[] = [
      {
        src: this.card().images.large,
        thumb: this.card().images.small,
        caption: this.card().name,
      },
    ];
    this.lightbox.open(album, 0);
  }
}
