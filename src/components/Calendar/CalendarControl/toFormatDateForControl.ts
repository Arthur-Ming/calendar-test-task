const toFormatDateForControl = (year: number | null, month: number | null) => {
  if (year === null || month === null) return null;
  const date = new Date(year, month).toLocaleDateString('ru', {
    year: 'numeric',
    month: 'long',
  });
  const [currentMonth, currentYear] = date.split(' ');
  return `${currentMonth[0].toUpperCase()}${currentMonth.slice(1)} ${currentYear}`;
};

export default toFormatDateForControl;
