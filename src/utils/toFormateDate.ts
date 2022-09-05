function toFormateDate(date: Date) {
  return new Date(date).toISOString().split('T')[0];
}

export default toFormateDate;
