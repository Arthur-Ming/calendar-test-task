import { RootState } from '../store';
import { ICalendarState } from '../reducer/calendar';

export const calendarDaysSelector = (state: RootState) => (<ICalendarState>state.calendar).days;
export const calendarDaySelector = (state: RootState) => (<ICalendarState>state.calendar).day;
export const calendarMonthSelector = (state: RootState) => (<ICalendarState>state.calendar).month;
export const calendarYearSelector = (state: RootState) => (<ICalendarState>state.calendar).year;
export const calendarSelectedDaySelector = (state: RootState) =>
  (<ICalendarState>state.calendar).selectedCell;

export const isCurrentDateSelector = (state: RootState, date?: string) => {
  const _date = date ? new Date(date) : new Date();
  return (
    calendarDaySelector(state) === _date.getDate() &&
    calendarMonthSelector(state) === _date.getMonth() &&
    calendarYearSelector(state) === _date.getFullYear()
  );
};
