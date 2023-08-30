import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Characteristic, EvolutionChain, PokemonSpecies } from 'pokenode-ts';
import { GET_CHARACTERISTIC_ACTION_SUCCESS, GET_DETAIL_ACTION, GET_DETAIL_ACTION_ERROR, GET_DETAIL_ACTION_SUCCESS, GET_EVOLUTION_ACTION_SUCCESS, GetDetailActionPayload } from '../actions/detail.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { of } from 'rxjs';

@Injectable()
export class DetailEffects {

  loadDetail$ = createEffect(() => this.actions$.pipe(
    ofType(GET_DETAIL_ACTION),
    mergeMap((action: GetDetailActionPayload) => this.api.getSpeciesByName(action.name)
      .pipe(
        map((payload: PokemonSpecies) => ({
          type: GET_DETAIL_ACTION_SUCCESS, payload: {
            ...payload,
            loading: true,
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
  ));
  
  loadCharacterisctic$ = createEffect(() => this.actions$.pipe(
    ofType(GET_DETAIL_ACTION_SUCCESS),
    mergeMap((action: any) => { 
      const id = action.payload.evolution_chain.url.split('/').reverse()[1];
      
      return this.api.getCharacteristicsById(id)
      .pipe(
        map((payload: Characteristic) => ({
          type: GET_CHARACTERISTIC_ACTION_SUCCESS, payload: {
            ...action.payload,
            characteristic: payload,
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
      )}
      )
  ));
  
  loadEvolution$ = createEffect(() => this.actions$.pipe(
    ofType(GET_CHARACTERISTIC_ACTION_SUCCESS),
    mergeMap((action: any) => { 
      const id = action.payload.evolution_chain.url.split('/').reverse()[1];
      
      return this.api.getEvolutionById(id)
      .pipe(
        map((payload: EvolutionChain) => ({
          type: GET_EVOLUTION_ACTION_SUCCESS, payload: {
            ...action.payload,
            evolution: payload,
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
      )}
      )
  ));

  constructor(
    private actions$: Actions,
    private api: PokemonService
  ) { }
}