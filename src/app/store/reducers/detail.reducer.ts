import { createReducer, on } from '@ngrx/store';
import { getDetailAction, getDetailActionSuccess } from '../actions/detail.actions';

import { Pokemon } from 'pokenode-ts';

export const initialState: Pokemon = {} as Pokemon;

export const detailReducer = createReducer(
  initialState,
  on(getDetailAction, (state) => state),
  on(getDetailActionSuccess, (state, data: any) => {
    return {
      ...state,
      ...data.payload
    }
  }),
);