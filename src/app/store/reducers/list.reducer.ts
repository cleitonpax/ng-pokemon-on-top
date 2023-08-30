import { createReducer, on } from '@ngrx/store';
import { getListAction, getListActionError, getListActionSuccess } from '../actions/list.actions';

import { NamedAPIResourceList } from 'pokenode-ts';
import { TypedAction } from '@ngrx/store/src/models';

export type ListReducerType = TypedAction<string> & {
  type: string;
  payload: ListState;
};
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
  on(getListActionSuccess, (state, data) => {
    const { payload } = data as ListReducerType;
    return {
      ...payload,
      loading: false,
      error: null
    };
  }),
  on(getListActionError, (state, data) => {
    const { payload } = data as ListReducerType;
    return {
      ...state,
      loading: false,
      error: payload.error
    };
  }),
);
