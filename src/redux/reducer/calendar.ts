import { GET_DAYS, SET_MONTH } from '../constants';
import { createReducer } from '@reduxjs/toolkit';
import { ICalendarDay, IGetDaysAction, ISetMonthAction } from '../../interfaces';

export interface ICalendarState {
  month: number | null;
  year: number | null;
  days: ICalendarDay[];
}

const initialState: ICalendarState = {
  month: null,
  year: null,
  days: [],
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(GET_DAYS, (state, action) => {
      const { days } = <IGetDaysAction>action;
      state.days = days;
    })
    .addCase(SET_MONTH, (state, action) => {
      const { month, year } = <ISetMonthAction>action;
      state.month = month;
      state.year = year;
    });
});
