import { Characteristic, EvolutionChain, PokemonSpecies } from 'pokenode-ts';
import { createReducer, on } from '@ngrx/store';
import {
  getDetailAction,
  getDetailActionError,
  getDetailActionSuccess,
  getDetailCharacteristicActionSuccess,
  getDetailEvolutionActionSuccess
} from '../actions/detail.actions';

import { TypedAction } from '@ngrx/store/src/models';

export type DetailReducerType = DetailState & TypedAction<string> & { 
  type: string; 
  payload: DetailState;
}

export interface DetailState extends PokemonSpecies {
  loading: boolean;
  error: string | null;
  evolution: EvolutionChain | null;
  characteristic: Characteristic | null;
}

export const initialState: DetailState = {
  loading: false,
  error: null,
  evolution: null,
  characteristic: null,
} as DetailState;

export const detailReducer = createReducer(
  initialState,
  on(getDetailAction, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
      evolution: null,
      characteristic: null,
    };
  }),
  on(getDetailActionSuccess, (state, data) => {
    const { payload } = data as DetailReducerType;
    return {
      ...payload,
      loading: true,
      error: null,
      evolution: null,
      characteristic: null,
    }
  }),
  on(getDetailCharacteristicActionSuccess, (state, data) => {
    const { payload } = data as DetailReducerType;
    return {
      ...payload,
      loading: false,
      error: null,
    }
  }),
  on(getDetailEvolutionActionSuccess, (state, data) => {
    const { payload } = data as DetailReducerType;
    return {
      ...payload,
      loading: false,
      error: null,
    }
  }),
  on(getDetailActionError, (state, data) => {
    const { payload } = data as DetailReducerType;
    return {
      ...state,
      loading: false,
      error: payload.error,
      evolution: null,
      characteristic: null,
    };
  }),
);