import { SELECT_EVENT } from '../constants';
import { createReducer } from '@reduxjs/toolkit';
import { IEvent, ISelectSearchValue } from '../../interfaces';

export interface ISearchState {
  selectedEvent: IEvent | null;
}

const initialState: ISearchState = {
  selectedEvent: null,
};

export default createReducer(initialState, (builder) => {
  builder.addCase(SELECT_EVENT, (state, action) => {
    const { selectedEvent } = <ISelectSearchValue>action;
    state.selectedEvent = selectedEvent;
  });
});
