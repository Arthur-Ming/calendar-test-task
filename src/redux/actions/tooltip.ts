import { SET_TOOLTIP_PATH } from '../constants';

export const setTooltipPath = (path: string | null) => ({
  type: SET_TOOLTIP_PATH,
  path,
});
