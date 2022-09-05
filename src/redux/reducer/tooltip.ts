import { SET_TOOLTIP_PATH } from '../constants';
import { createReducer } from '@reduxjs/toolkit';
import { ISetTooltipPathAction } from '../../interfaces';

export interface ITooltipState {
  path: string | null;
}

const initialState: ITooltipState = {
  path: null,
};

export default createReducer(initialState, (builder) => {
  builder.addCase(SET_TOOLTIP_PATH, (state, action) => {
    const { path } = <ISetTooltipPathAction>action;
    state.path = path;
  });
});
