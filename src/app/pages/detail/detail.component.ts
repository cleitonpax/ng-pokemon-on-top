import { ActivatedRoute } from '@angular/router';
import { Characteristic } from 'pokenode-ts';
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
    this.route.paramMap.subscribe(params => {
      this.name = params.get('name');
      window.scrollTo(0, 0);
      this.getDetail();
    });

    const detailState$ = this.store.select('detail');
    
    if (detailState$ !== null) {
      this.detail$ = detailState$;
    }
  }

  getPokemonAvatar(id: number): string {
    return this.api.getPokemonAvatarById(id);
  }

  getCharacteristic(characteristic: Characteristic | null): string {
    if (!characteristic || characteristic.descriptions.length === 0) {
      return '';
    }
  
    const en = characteristic.descriptions.find((description) => description.language.name === 'en');
    return en?.description || '';
  }

  private getDetail() {
    if (this.name !== null) {
      this.store.dispatch(getDetailAction({ name: this.name }));
    }
  }
}