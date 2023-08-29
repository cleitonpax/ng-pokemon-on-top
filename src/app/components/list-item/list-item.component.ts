import { Component, Input } from '@angular/core';

import { NamedAPIResource } from 'pokenode-ts';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() item?: NamedAPIResource;

  isImgLoaded = false;

  constructor(
    private api: PokemonService,
    ) {
  }

  getPokemonAvatar(url: string): string {
    return this.api.getPokemonAvatar(url);
  }
}
