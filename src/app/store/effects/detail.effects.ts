import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GET_DETAIL_ACTION, GET_DETAIL_ACTION_ERROR, GET_DETAIL_ACTION_SUCCESS, GetDetailActionPayload } from '../actions/detail.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Pokemon } from 'pokenode-ts';
import { PokemonService } from 'src/app/services/pokemon.service';
import { of } from 'rxjs';

@Injectable()
export class DetailEffects {

  loadDetail$ = createEffect(() => this.actions$.pipe(
    ofType(GET_DETAIL_ACTION),
    mergeMap((action: GetDetailActionPayload) => this.api.getPokemonByName(action.name)
      .pipe(
        map((payload: Pokemon) => ({
          type: GET_DETAIL_ACTION_SUCCESS, payload: {
            ...payload,
            loading: false,
            error: null
          }
        })),
        catchError(({ message }) => of({
          type: GET_DETAIL_ACTION_ERROR, payload: {
            loading: false,
            error: message
          }
        }))
      ))
  )
  );

  constructor(
    private actions$: Actions,
    private api: PokemonService
  ) { }
}