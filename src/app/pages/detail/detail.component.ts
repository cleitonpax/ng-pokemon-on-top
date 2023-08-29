import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { DetailState } from 'src/app/store/reducers/detail.reducer';
import { Observable } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Store } from '@ngrx/store';
import { getDetailAction } from 'src/app/store/actions/detail.actions';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  private name: string | null = null;
  detail$?: Observable<DetailState>;

  constructor(
    private route: ActivatedRoute, 
    private api: PokemonService,
    private store: Store<{ detail: DetailState }>
    ) {
    this.detail$ = this.store.select('detail');
    this.name = this.route.snapshot.paramMap.get('name');
    this.getDetail();
  }

  getPokemonAvatar(id: number): string {
    return this.api.getPokemonAvatarById(id);
  }

  private getDetail() {
    if (this.name !== null) {
      this.store.dispatch(getDetailAction({ name: this.name }));
    }
  }
}
