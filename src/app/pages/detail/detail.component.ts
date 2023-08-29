import { Observable, catchError } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Pokemon } from 'pokenode-ts';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {  
  
  public pokemon$?: Observable<Pokemon>;

  constructor(private route: ActivatedRoute, private api: PokemonService) {
    
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== null) {

      this.pokemon$ = this.api.getPokemonByName(id);

      this.pokemon$.pipe(
        catchError(async (error) => console.error(error))
      ).subscribe(
        (pokemon) => console.log(pokemon),
      );
    }
  }

  public getPokemonAvatar(url: string): string {
    return this.api.getPokemonAvatar(url);
  }
}
