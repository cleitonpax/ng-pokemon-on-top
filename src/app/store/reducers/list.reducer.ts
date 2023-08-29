import { createReducer, on } from '@ngrx/store';
import { getListAction, getListActionError, getListActionSuccess } from '../actions/list.actions';

import { NamedAPIResourceList } from 'pokenode-ts';

export interface ListState extends NamedAPIResourceList {
  loading: boolean;
  error: string | null;
}

export const initialState: ListState = {
  loading: false,
  error: null,
} as ListState;

export const listReducer = createReducer(
  initialState,
  on(getListAction, (state) => {
    return {
      ...state,
      loading: true,
      error: null
    };
  }),
  on(getListActionSuccess, (state, data: any) => {
    return {
      ...data.payload,
      loading: false,
      error: null
    };
  }),
  on(getListActionError, (state, data: any) => {
    return {
      ...state,
      loading: false,
      error: data.payload.error
    };
  }),
);
