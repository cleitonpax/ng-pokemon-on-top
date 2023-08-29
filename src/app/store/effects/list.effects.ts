import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GET_LIST_ACTION, GET_LIST_ACTION_ERROR, GET_LIST_ACTION_SUCCESS, GetListActionPayload } from '../actions/list.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { NamedAPIResourceList } from 'pokenode-ts';
import { PokemonService } from 'src/app/services/pokemon.service';
import { of } from 'rxjs';

@Injectable()
export class ListEffects {

  loadList$ = createEffect(() => this.actions$.pipe(
    ofType(GET_LIST_ACTION),
    mergeMap((action: GetListActionPayload) => this.api.listPokemonSpecies(action.page, action.limit)
      .pipe(
        map((payload: NamedAPIResourceList) => {
          return ({
            type: GET_LIST_ACTION_SUCCESS, payload: {
              ...payload,
              loading: false,
              error: null
            }
          })
        }),
        catchError(({ message }) => of({
          type: GET_LIST_ACTION_ERROR, payload: {
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