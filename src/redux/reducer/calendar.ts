import { GET_DAYS, SELECT_CELL, UNSELECT_CELL, SET_DATE } from '../constants';
import { createReducer } from '@reduxjs/toolkit';
import { ICalendarDay, IGetDaysAction, ISelectCellAction, ISetDateAction } from '../../interfaces';

export interface ICalendarState {
  month: number | null;
  year: number | null;
  day: number | null;
  days: ICalendarDay[];
  selectedCell: string | null;
}

const initialState: ICalendarState = {
  month: null,
  year: null,
  day: null,
  days: [],
  selectedCell: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(GET_DAYS, (state, action) => {
      const { days } = <IGetDaysAction>action;
      state.days = days;
    })
    .addCase(SET_DATE, (state, action) => {
      const { month, year, day } = <ISetDateAction>action;
      state.month = month;
      state.year = year;
      state.day = day;
    })
    .addCase(SELECT_CELL, (state, action) => {
      const { selectedCell } = <ISelectCellAction>action;
      state.selectedCell = selectedCell;
    })
    .addCase(UNSELECT_CELL, (state) => {
      state.selectedCell = null;
    });
});
