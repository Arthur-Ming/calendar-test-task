export interface ICalendarDay {
  dayOfMonth: number;
  month: number;
  year: number;
  date: string;
}

export interface IEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  participantsNames: string[];
}

export interface IEventWithFormatedDate extends IEvent {
  formatedDate: string;
}

export interface IAction {
  type: string;
}

export interface IGetDaysAction extends IAction {
  days: ICalendarDay[];
}

export interface ISetDateAction extends IAction {
  month: number;
  year: number;
  day: number | null;
}

export interface ISelectCellAction extends IAction {
  selectedCell: string;
}

export interface ILoadEventsAction extends IAction {
  data?: IEvent[];
  error?: unknown;
}

export interface IAddEventAction extends IAction {
  date: string;
  data?: IEvent;
  error?: null | unknown;
}

export interface ISelectSearchValue extends IAction {
  selectedEvent: IEvent | null;
}

export interface ISetTooltipPathAction extends IAction {
  path: string | null;
}
