import {
  LOAD_EVENTS,
  SUCCESS,
  FAILURE,
  REQUEST,
  ADD_EVENT,
  EDIT_EVENT,
  DELETE_EVENT,
} from '../constants';
import { AnyAction, createReducer } from '@reduxjs/toolkit';
import { IEvent, ILoadEventsAction } from '../../interfaces';
import arrToMapByDate from '../../utils/arrToMapByDate';

export interface IEventsState {
  loading: boolean;
  loaded: boolean;
  error: null | unknown;
  entities: {
    [key: string]: IEvent;
  };

  userEventLoading: { [key: string]: boolean };
  userEventError: { [key: string]: unknown };
}

const initialState: IEventsState = {
  loading: false,
  loaded: false,
  error: null,
  entities: {},

  userEventLoading: {},
  userEventError: {},
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
    })
    .addCase(ADD_EVENT + REQUEST, (state, action) => {
      const { date } = <AnyAction>action;
      state.userEventLoading[date] = true;
      state.userEventError[date] = null;
    })
    .addCase(ADD_EVENT + SUCCESS, (state, action) => {
      const { date, data } = <AnyAction>action;
      state.userEventLoading[date] = false;
      state.entities[date] = data;
    })
    .addCase(ADD_EVENT + FAILURE, (state, action) => {
      const { error, date } = <AnyAction>action;
      state.userEventError[date] = error;
      state.userEventLoading[date] = false;
    })
    .addCase(EDIT_EVENT + REQUEST, (state, action) => {
      const { date } = <AnyAction>action;
      state.userEventLoading[date] = true;
      state.userEventError[date] = null;
    })
    .addCase(EDIT_EVENT + SUCCESS, (state, action) => {
      const { date, data } = <AnyAction>action;
      state.userEventLoading[date] = false;
      state.entities[date] = data;
    })
    .addCase(EDIT_EVENT + FAILURE, (state, action) => {
      const { error, date } = <AnyAction>action;
      state.userEventError[date] = error;
      state.userEventLoading[date] = false;
    })
    .addCase(DELETE_EVENT + REQUEST, (state, action) => {
      const { date } = <AnyAction>action;
      state.userEventLoading[date] = true;
      state.userEventError[date] = null;
    })
    .addCase(DELETE_EVENT + SUCCESS, (state, action) => {
      const { date } = <AnyAction>action;
      state.userEventLoading[date] = false;
      delete state.entities[date];
    })
    .addCase(DELETE_EVENT + FAILURE, (state, action) => {
      const { error, date } = <AnyAction>action;
      state.userEventError[date] = error;
      state.userEventLoading[date] = false;
    });
});
