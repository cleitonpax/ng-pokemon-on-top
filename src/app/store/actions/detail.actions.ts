import { createAction, props } from '@ngrx/store';

import { DetailState } from '../reducers/detail.reducer';

export const GET_DETAIL_ACTION = '[Detail] Fetch';
export const GET_DETAIL_ACTION_SUCCESS = '[Detail] Fetch Success';
export const GET_CHARACTERISTIC_ACTION_SUCCESS = '[Detail] Fetch Characteristic Success';
export const GET_EVOLUTION_ACTION_SUCCESS = '[Detail] Fetch Evolution Success';
export const GET_DETAIL_ACTION_ERROR = '[Detail] Fetch Error';

export interface GetDetailActionPayload {
  name: string;
}
export const getDetailAction = createAction(
  GET_DETAIL_ACTION, 
  props<GetDetailActionPayload>()
);
export const getDetailActionSuccess = createAction(
  GET_DETAIL_ACTION_SUCCESS, 
  props<DetailState>()
);
export const getDetailCharacteristicActionSuccess = createAction(
  GET_CHARACTERISTIC_ACTION_SUCCESS, 
  props<DetailState>()
);
export const getDetailEvolutionActionSuccess = createAction(
  GET_EVOLUTION_ACTION_SUCCESS, 
  props<DetailState>()
);
export const getDetailActionError = createAction(GET_DETAIL_ACTION_ERROR);