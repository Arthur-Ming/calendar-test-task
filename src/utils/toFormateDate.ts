function toFormateDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return new Date(Date.UTC(year, month, day)).toISOString().split('T')[0];
}

export default toFormateDate;
