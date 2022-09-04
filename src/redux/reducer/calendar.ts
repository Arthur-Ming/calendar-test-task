import { GET_DAYS, SELECT_CELL, UNSELECT_CELL, SET_MONTH } from '../constants';
import { AnyAction, createReducer } from '@reduxjs/toolkit';
import { ICalendarDay, IGetDaysAction, ISetMonthAction } from '../../interfaces';

export interface ICalendarState {
  month: number | null;
  year: number | null;
  days: ICalendarDay[];
  selectedCell: string | null;
}

const initialState: ICalendarState = {
  month: null,
  year: null,
  days: [],
  selectedCell: null,
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
    })
    .addCase(SELECT_CELL, (state, action) => {
      const { selectedCell } = <AnyAction>action;
      state.selectedCell = selectedCell;
    })
    .addCase(UNSELECT_CELL, (state) => {
      state.selectedCell = null;
    });
});
