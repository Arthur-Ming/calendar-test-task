import { RootState } from '../store';
import { ISearchState } from '../reducer/search';

export const selectedEventSelector = (state: RootState) =>
  (<ISearchState>state.search).selectedEvent;
