import { LOAD_EVENTS, SUCCESS, FAILURE, REQUEST } from '../constants';
import { createReducer } from '@reduxjs/toolkit';
import { IEvent, ILoadEventsAction } from '../../interfaces';
import arrToMapByDate from '../../utils/arrToMapByDate';

export interface IEventsState {
  loading: boolean;
  loaded: boolean;
  error: null | unknown;
  entities: {
    [key: string]: IEvent;
  };
}

const initialState: IEventsState = {
  loading: false,
  loaded: false,
  error: null,
  entities: {},
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(LOAD_EVENTS + REQUEST, (state) => {
      state.loading = true;
      state.loaded = false;
      state.error = null;
      state.entities = {};
    })
    .addCase(LOAD_EVENTS + SUCCESS, (state, action) => {
      const { data } = <ILoadEventsAction>action;
      state.loading = false;
      state.loaded = true;
      state.error = null;
      data && (state.entities = arrToMapByDate(data));
    })
    .addCase(LOAD_EVENTS + FAILURE, (state, action) => {
      const { error = null } = <ILoadEventsAction>action;
      state.loading = false;
      state.loaded = false;
      state.error = error;
    });
});
