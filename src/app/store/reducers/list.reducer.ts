import { createReducer, on } from '@ngrx/store';
import { getListAction, getListActionSuccess } from '../actions/list.actions';

import { NamedAPIResourceList } from 'pokenode-ts';

export const initialState: NamedAPIResourceList = {} as NamedAPIResourceList;

export const listReducer = createReducer(
  initialState,
  on(getListAction, (state) => state),
  on(getListActionSuccess, (state, data: any) => {
    return {
      ...state,
      ...data.payload
    }
  }),
);