import { createSelector } from 'reselect';
import { RootState } from '../store';

import { IEventsState } from '../reducer/events';

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

export const userEventLoadingSelector = (state: RootState, { date }: { date: string }) =>
  (<IEventsState>state.events).userEventLoading[date];

export const userEventErrorSelector = (state: RootState, { date }: { date: string }) =>
  (<IEventsState>state.events).userEventError[date];
