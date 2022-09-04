import { ADD_EVENT, EDIT_EVENT, FAILURE, LOAD_EVENTS, REQUEST, SUCCESS } from '../constants';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { eventsLoadedSelector, eventsLoadingSelector } from '../selectors';
import api from '../../mock/api';
import { IEvent, ILoadEventsAction } from '../../interfaces';

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
  async (dispatch: Dispatch<AnyAction>) => {
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
  async (dispatch: Dispatch<AnyAction>) => {
    dispatch({ type: EDIT_EVENT + REQUEST, date });

    try {
      const data = await api.put(eventId, newDescription);
      dispatch({ type: EDIT_EVENT + SUCCESS, date, data });
    } catch (error: unknown) {
      console.log(error);
      dispatch({ type: EDIT_EVENT + FAILURE, error, date });
    }
  };
