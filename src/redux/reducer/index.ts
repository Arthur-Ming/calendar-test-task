import { combineReducers } from 'redux';
import calendar from './calendar';
import events from './events';
import search from './search';

const rootReducer = combineReducers({
  calendar,
  events,
  search,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
