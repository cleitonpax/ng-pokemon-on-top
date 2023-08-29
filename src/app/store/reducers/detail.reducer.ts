import { EvolutionChain, Pokemon, PokemonSpecies } from 'pokenode-ts';
import { createReducer, on } from '@ngrx/store';
import { getDetailAction, getDetailActionError, getDetailActionSuccess, getDetailEvolutionActionSuccess } from '../actions/detail.actions';

export interface DetailState extends PokemonSpecies {
  loading: boolean;
  error: string | null;
  evolution: EvolutionChain | null;
}

export const initialState: DetailState = {
  loading: false,
  error: null,
  evolution: null,
} as DetailState;

export const detailReducer = createReducer(
  initialState,
  on(getDetailAction, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
      evolution: null,
    };
  }),
  on(getDetailActionSuccess, (state, data: any) => {
    return {
      ...data.payload,
      loading: true,
      error: null,
      evolution: null,
    }
  }),
  on(getDetailEvolutionActionSuccess, (state, data: any) => {
    return {
      ...data.payload,
      loading: false,
      error: null,
    }
  }),
  on(getDetailActionError, (state, data: any) => {
    return {
      ...state,
      loading: false,
      error: data.payload.error,
      evolution: null,
    };
  }),
);