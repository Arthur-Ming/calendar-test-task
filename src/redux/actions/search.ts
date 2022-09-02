import { SELECT_EVENT } from '../constants';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { eventByDateSelector } from '../selectors';
import { setMonth } from './calendar';

export const selectSearchValue =
  (value: string | null) => (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    const state = getState();
    if (!value) {
      dispatch({ type: SELECT_EVENT, selectedEvent: null });
      return;
    }

    const event = eventByDateSelector(state, { date: value });

    dispatch({ type: SELECT_EVENT, selectedEvent: event });
    const date = new Date(value);
    dispatch(setMonth(date.getFullYear(), date.getMonth()));
  };
