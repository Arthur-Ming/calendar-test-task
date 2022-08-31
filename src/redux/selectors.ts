import { createSelector } from 'reselect';
import { RootState } from './store';

import { ICalendarState } from './reducer/calendar';
import { IEventsState } from './reducer/events';

export const calendarDaysSelector = (state: RootState) => (<ICalendarState>state.calendar).days;
export const calendarMonthSelector = (state: RootState) => (<ICalendarState>state.calendar).month;
export const calendarYearSelector = (state: RootState) => (<ICalendarState>state.calendar).year;

export const calendarDateSelector = (state: RootState) => {
  const year = calendarYearSelector(state);
  const month = calendarMonthSelector(state);
  if (month !== null && year !== null) {
    const date = new Date(year, month).toLocaleDateString('ru', {
      year: 'numeric',
      month: 'long',
    });
    const [currentMonth, currentYear] = date.split(' ');
    return `${currentMonth[0].toUpperCase()}${currentMonth.slice(1)} ${currentYear}`;
  }

  return null;
};

const eventsSelector = (state: RootState) => (<IEventsState>state.events).entities;

export const eventsLoadingSelector = (state: RootState) => (<IEventsState>state.events).loading;
export const eventsLoadedSelector = (state: RootState) => (<IEventsState>state.events).loaded;

export const eventByDateSelector = (state: RootState, { date }: { date: string }) =>
  eventsSelector(state)[date];
