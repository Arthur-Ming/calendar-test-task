import { createSelector } from 'reselect';
import { RootState } from './store';

import { ICalendarState } from './reducer/calendar';
import { IEventsState } from './reducer/events';
import { ISearchState } from './reducer/search';

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

export const eventsListSelector = createSelector(eventsSelector, (events) =>
  Object.values(events).map((event) => {
    const date = new Date(event.date).toLocaleDateString('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const [day, month] = date.split(' ');
    return {
      ...event,
      formatedDate: `${day} ${month}`,
    };
  })
);

export const selectedEventSelector = (state: RootState) =>
  (<ISearchState>state.search).selectedEvent;
