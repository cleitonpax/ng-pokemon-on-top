import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Pokemon } from 'pokenode-ts';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() name?: string;
  pokemon$: Observable<Pokemon> | undefined;

  constructor(private api: PokemonService) { }

  ngOnInit(): void {
    if (this.name) {
      this.pokemon$ = this.api.getPokemonByName(this.name);
    }
  }

  getPokemonAvatar(pokemon: Pokemon | undefined = undefined, fallbackImage = 'assets/icon.svg'): string {
    if (!pokemon || !pokemon.sprites?.other) {
      return fallbackImage;
    }
    return pokemon.sprites.other?.['dream_world']?.front_default 
      ?? pokemon.sprites.other?.['official-artwork']?.front_default 
      ?? fallbackImage;
  }

}
