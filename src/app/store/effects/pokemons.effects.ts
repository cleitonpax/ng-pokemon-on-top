import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GET_LIST_ACTION, GET_LIST_ACTION_SUCCESS, GetListActionPayload } from '../actions/pokemons.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { NamedAPIResourceList } from 'pokenode-ts';
import { PokemonService } from 'src/app/services/pokemon.service';

@Injectable()
export class PokemonsEffects {

  loadMovies$ = createEffect(() => this.actions$.pipe(
    ofType(GET_LIST_ACTION),
    mergeMap((action: GetListActionPayload) => this.api.listPokemons(action.page, action.limit)
      .pipe(
        map((payload: NamedAPIResourceList) => ({ type: GET_LIST_ACTION_SUCCESS, payload })),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private api: PokemonService
  ) {}
}