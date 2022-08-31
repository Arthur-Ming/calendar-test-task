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

export interface IAction {
  type: string;
}

export interface IGetDaysAction extends IAction {
  days: ICalendarDay[];
}

export interface ISetMonthAction extends IAction {
  month: number;
  year: number;
}

export interface ILoadEventsAction extends IAction {
  data?: IEvent[];
  error?: unknown;
}
