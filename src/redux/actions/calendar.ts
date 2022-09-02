import { GET_DAYS, SET_MONTH } from '../constants';
import { Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../store';
import CalendarDays from '../../utils/CalendarDays';
import { calendarMonthSelector, calendarYearSelector } from '../selectors';
import { IGetDaysAction, ISetMonthAction } from '../../interfaces';

const getNowDate = (): { year: number; month: number; day: number } => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return {
    year,
    month,
    day,
  };
};

export const setMonth = (year: number, month: number): ISetMonthAction => ({
  type: SET_MONTH,
  month,
  year,
});

export const getDays =
  (year: number | null, month: number | null) =>
  (dispatch: Dispatch<IGetDaysAction | ISetMonthAction>) => {
    if (year === null || month === null) {
      const { year, month } = getNowDate();
      dispatch(setMonth(year, month));
      return;
    }
    const days = new CalendarDays(year, month).creat();
    dispatch({ type: GET_DAYS, days });
  };

export const getNextMonth =
  () => (dispatch: Dispatch<ISetMonthAction>, getState: () => RootState) => {
    const state = getState();

    const currentMonth = calendarMonthSelector(state);
    const currentYear = calendarYearSelector(state);

    if (currentMonth !== null && currentYear !== null) {
      const date = new Date(currentYear, currentMonth + 1);
      dispatch(setMonth(date.getFullYear(), date.getMonth()));
    }
  };

export const getPrevMonth =
  () => (dispatch: Dispatch<ISetMonthAction>, getState: () => RootState) => {
    const state = getState();

    const currentMonth = calendarMonthSelector(state);
    const currentYear = calendarYearSelector(state);

    if (currentMonth !== null && currentYear !== null) {
      const date = new Date(currentYear, currentMonth - 1);
      dispatch(setMonth(date.getFullYear(), date.getMonth()));
    }
  };

export const getCurrentMonth = () => (dispatch: Dispatch<ISetMonthAction>) => {
  const { year, month } = getNowDate();
  dispatch(setMonth(year, month));
};
