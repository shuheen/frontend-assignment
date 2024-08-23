const isWeekend = (date: Date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};
const getWeekendDatesInRange = (start: Date, end: Date) => {
  const weekends = [];
  const currentDate = new Date(start);
  while (currentDate <= end) {
    if (isWeekend(currentDate)) {
      weekends.push(formatDate(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return weekends;
};

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getDaysInMonth = (year: number, month: number) => {
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0);
  const days = [];

  const startDay = start.getDay();
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }

  for (let day = 1; day <= end.getDate(); day++) {
    days.push(new Date(year, month, day));
  }

  const endDay = end.getDay();
  for (let i = endDay; i < 6; i++) {
    days.push(null);
  }

  return days;
};

export { getWeekendDatesInRange, getDaysInMonth, formatDate, isWeekend };
