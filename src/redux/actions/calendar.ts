import { GET_DAYS, SELECT_CELL, SET_DATE, UNSELECT_CELL } from '../constants';
import { Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../store';
import CalendarDays from '../../utils/CalendarDays';
import { calendarMonthSelector, calendarYearSelector } from '../selectors/calendar';
import { IAction, IGetDaysAction, ISelectCellAction, ISetDateAction } from '../../interfaces';
import toFormateDate from '../../utils/toFormateDate';

const getNowDate = (): { year: number; month: number; day: number; dateISO: string } => {
  const date = new Date();

  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    dateISO: toFormateDate(date),
  };
};

export const setDate = (
  year: number,
  month: number,
  day: number | null = null
): ISetDateAction => ({
  type: SET_DATE,
  month,
  year,
  day,
});

export const getDays =
  (year: number | null, month: number | null) =>
  (dispatch: Dispatch<ISelectCellAction | IGetDaysAction | ISetDateAction>) => {
    if (year === null || month === null) {
      const { year, month, day, dateISO } = getNowDate();
      dispatch(setDate(year, month, day));
      dispatch(selectCell(dateISO));
      return;
    }
    const days = new CalendarDays(year, month).creat();
    dispatch({ type: GET_DAYS, days });
  };

export const getNextMonth =
  () => (dispatch: Dispatch<ISetDateAction | IAction>, getState: () => RootState) => {
    const state = getState();

    const currentMonth = calendarMonthSelector(state);
    const currentYear = calendarYearSelector(state);

    if (currentMonth !== null && currentYear !== null) {
      const date = new Date(currentYear, currentMonth + 1);
      dispatch(setDate(date.getFullYear(), date.getMonth()));
      dispatch(unSelectCell());
    }
  };

export const getPrevMonth =
  () => (dispatch: Dispatch<ISetDateAction | IAction>, getState: () => RootState) => {
    const state = getState();

    const currentMonth = calendarMonthSelector(state);
    const currentYear = calendarYearSelector(state);

    if (currentMonth !== null && currentYear !== null) {
      const date = new Date(currentYear, currentMonth - 1);
      dispatch(setDate(date.getFullYear(), date.getMonth()));
      dispatch(unSelectCell());
    }
  };

export const getCurrentMonth = () => (dispatch: Dispatch<ISetDateAction | IAction>) => {
  const { year, month, day, dateISO } = getNowDate();
  dispatch(setDate(year, month, day));
  dispatch(selectCell(dateISO));
};

export const selectCell = (selectedCell: string): ISelectCellAction => ({
  type: SELECT_CELL,
  selectedCell,
});

export const unSelectCell = () => ({
  type: UNSELECT_CELL,
});
