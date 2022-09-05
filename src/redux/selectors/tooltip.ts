import { RootState } from '../store';
import { ITooltipState } from '../reducer/tooltip';

export const tooltipPathSelector = (state: RootState) => (<ITooltipState>state.tooltip).path;
