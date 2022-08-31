export default class CalendarDays {
  constructor(year, month) {
    this.year = year;
    this.month = month;
    this.date = new Date(year, month);
  }

  getLastDayOfMonth(year, month) {
    const date = new Date(year, month + 1, 0);
    return date.getDate();
  }

  creatCalendarSlice(start, end, month) {
    return Array.from(Array(end - start), (_, index) => {
      const d = new Date(Date.UTC(this.year, month, start + index + 1));
      return {
        dayOfMonth: d.getDate(),
        month: d.getMonth(),
        year: d.getFullYear(),
        date: d.toISOString().split('T')[0],
      };
    });
  }

  daysIn() {
    const start = 0;
    const end = this.getLastDayOfMonth(this.year, this.month);
    return this.creatCalendarSlice(start, end, this.month);
  }

  daysBefore() {
    const end = this.getLastDayOfMonth(this.year, this.month - 1);
    const start = end - (new Date(this.year, this.month, 1).getDay() || 7) + 1;
    return this.creatCalendarSlice(start, end, this.month - 1);
  }

  daysAfter() {
    const dayOfWeek = new Date(this.year, this.month + 1, 1).getDay();
    const end = dayOfWeek == 0 ? 1 : dayOfWeek == 1 ? 0 : 8 - dayOfWeek;
    const start = 0;
    return this.creatCalendarSlice(start, end, this.month + 1);
  }

  creat() {
    return [...this.daysBefore(), ...this.daysIn(), ...this.daysAfter()];
  }
}
