import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from 'pokenode-ts';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Store } from '@ngrx/store';
import { getDetailAction } from 'src/app/store/actions/detail.actions';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {

  pokemon$?: Observable<Pokemon>;

  constructor(
    private route: ActivatedRoute, 
    private api: PokemonService,
    private store: Store<{ detail: Pokemon }>
    ) {
    this.pokemon$ = this.store.select('detail');

    const name = this.route.snapshot.paramMap.get('name');

    if (name !== null) {
      this.getDetail(name);
    }
  }

  private getDetail(name: string) {
    this.store.dispatch(getDetailAction({ name }));
  }

  getPokemonAvatar(url: string): string {
    return this.api.getPokemonAvatar(url);
  }
}
