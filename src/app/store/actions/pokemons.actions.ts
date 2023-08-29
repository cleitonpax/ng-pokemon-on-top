import { createAction, props } from '@ngrx/store';

export const GET_LIST_ACTION = '[Pokemons] Fetch List';
export const GET_LIST_ACTION_SUCCESS = '[Pokemons] Fetch List Success';

export interface GetListActionPayload {
  page: number;
  limit: number;
}

export const getListAction = createAction(
  GET_LIST_ACTION, 
  props<GetListActionPayload>()
);
export const getListActionSuccess = createAction(GET_LIST_ACTION_SUCCESS);