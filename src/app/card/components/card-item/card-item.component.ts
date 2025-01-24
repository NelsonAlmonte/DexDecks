import { Component, inject, input } from '@angular/core';
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
export class CardItemComponent {
  router = inject(Router);
  cardService = inject(CardService);
  lightbox = inject(Lightbox);
  lightboxConfig = inject(LightboxConfig);
  card = input.required<Card>();
  allowNavigation = input<Boolean>(true);

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
