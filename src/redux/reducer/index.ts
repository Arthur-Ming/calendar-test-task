import { combineReducers } from 'redux';
import calendar from './calendar';
import events from './events';
import search from './search';
import tooltip from './tooltip';

const rootReducer = combineReducers({
  calendar,
  events,
  search,
  tooltip,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
