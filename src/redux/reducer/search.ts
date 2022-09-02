import { SELECT_EVENT } from '../constants';
import { AnyAction, createReducer } from '@reduxjs/toolkit';
import { IEvent } from '../../interfaces';

export interface ISearchState {
  selectedEvent: IEvent | null;
}

const initialState: ISearchState = {
  selectedEvent: null,
};

export default createReducer(initialState, (builder) => {
  builder.addCase(SELECT_EVENT, (state, action) => {
    const { selectedEvent } = <AnyAction>action;
    state.selectedEvent = selectedEvent;
  });
});
