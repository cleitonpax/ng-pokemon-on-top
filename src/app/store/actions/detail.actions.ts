import { createAction, props } from '@ngrx/store';

export const GET_DETAIL_ACTION = '[Detail] Fetch';
export const GET_DETAIL_ACTION_SUCCESS = '[Detail] Fetch Success';
export const GET_DETAIL_ACTION_ERROR = '[Detail] Fetch Error';

export interface GetDetailActionPayload {
  name: string;
}

export const getDetailAction = createAction(
  GET_DETAIL_ACTION, 
  props<GetDetailActionPayload>()
);
export const getDetailActionSuccess = createAction(GET_DETAIL_ACTION_SUCCESS);
export const getDetailActionError = createAction(GET_DETAIL_ACTION_ERROR);