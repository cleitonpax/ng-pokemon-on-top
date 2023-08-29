import { createReducer, on } from '@ngrx/store';
import { getDetailAction, getDetailActionError, getDetailActionSuccess } from '../actions/detail.actions';

import { Pokemon } from 'pokenode-ts';

export interface DetailState extends Pokemon {
  loading: boolean;
  error: string | null;
}

export const initialState: DetailState = {
  loading: false,
  error: null,
} as DetailState;

export const detailReducer = createReducer(
  initialState,
  on(getDetailAction, (state) => {
    return {
      ...state,
      loading: true,
      error: null
    };
  }),
  on(getDetailActionSuccess, (state, data: any) => {
    return {
      ...data.payload,
      loading: false,
      error: null
    }
  }),
  on(getDetailActionError, (state, data: any) => {
    return {
      ...state,
      loading: false,
      error: data.payload.error
    };
  }),
);