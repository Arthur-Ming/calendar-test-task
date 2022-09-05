import {
  ADD_EVENT,
  DELETE_EVENT,
  EDIT_EVENT,
  FAILURE,
  LOAD_EVENTS,
  REQUEST,
  SELECT_EVENT,
  SUCCESS,
} from '../constants';
import { Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { eventsLoadedSelector, eventsLoadingSelector } from '../selectors/events';
import api from '../../mock/api';
import { IAddEventAction, IEvent, ILoadEventsAction, ISelectSearchValue } from '../../interfaces';
import { selectedEventSelector } from '../selectors/search';

export const loadEvents =
  () => async (dispatch: Dispatch<ILoadEventsAction>, getState: () => RootState) => {
    const state = getState();
    const loading = eventsLoadingSelector(state);
    const loaded = eventsLoadedSelector(state);

    if (loading || loaded) return;

    dispatch({ type: LOAD_EVENTS + REQUEST });

    try {
      const data = await api.get();
      dispatch({ type: LOAD_EVENTS + SUCCESS, data });
    } catch (error: unknown) {
      dispatch({ type: LOAD_EVENTS + FAILURE, error });
    }
  };

export const addEvent =
  ({ title, date, description, participantsNames }: Omit<IEvent, 'id'>) =>
  async (dispatch: Dispatch<IAddEventAction>) => {
    dispatch({ type: ADD_EVENT + REQUEST, date });

    try {
      const data = await api.post({ title, date, description, participantsNames });
      dispatch({ type: ADD_EVENT + SUCCESS, date, data });
    } catch (error: unknown) {
      dispatch({ type: ADD_EVENT + FAILURE, error, date });
    }
  };

export const editEvent =
  (eventId: string, date: string, newDescription: string) =>
  async (dispatch: Dispatch<IAddEventAction>) => {
    dispatch({ type: EDIT_EVENT + REQUEST, date });

    try {
      const data = await api.put(eventId, newDescription);
      dispatch({ type: EDIT_EVENT + SUCCESS, date, data });
    } catch (error: unknown) {
      dispatch({ type: EDIT_EVENT + FAILURE, error, date });
    }
  };

export const deleteEvent =
  (eventId: string, date: string) =>
  async (dispatch: Dispatch<IAddEventAction | ISelectSearchValue>, getState: () => RootState) => {
    dispatch({ type: DELETE_EVENT + REQUEST, date });
    const state = getState();

    try {
      await api.delete(eventId);
      dispatch({ type: DELETE_EVENT + SUCCESS, date });
      date === selectedEventSelector(state)?.date &&
        dispatch({ type: SELECT_EVENT, selectedEvent: null });
    } catch (error: unknown) {
      dispatch({ type: DELETE_EVENT + FAILURE, error, date });
    }
  };
