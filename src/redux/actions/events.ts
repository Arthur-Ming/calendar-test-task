import { FAILURE, LOAD_EVENTS, REQUEST, SUCCESS } from '../constants';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { eventsLoadedSelector, eventsLoadingSelector } from '../selectors';
import api from '../../mock/api';
import { ILoadEventsAction } from '../../interfaces';

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
