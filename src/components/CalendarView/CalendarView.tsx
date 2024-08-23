import React, { useEffect, useState } from 'react';
import { CalendarViewProps } from '../../types/components/date-range-picker';
import StyledCalendarView from './CalendarView.style';
import Button from '../Button/Button';
import CalendarDay from '../CalendarDay/CalendarDay';

const CalendarView = ({
  predefinedRanges,
  onChange,
  selectedRange,
  initialMonth,
  initialYear,
}: CalendarViewProps) => {
  const [startDate, setStartDate] = useState<Date | null>(selectedRange[0]);
  const [endDate, setEndDate] = useState<Date | null>(selectedRange[1]);
  const [currentMonth, setCurrentMonth] = useState(initialMonth);
  const [currentYear, setCurrentYear] = useState(initialYear);

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const handleDateSelect = (date: Date) => {
    if (isWeekend(date)) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (date > startDate) {
        setEndDate(date);
      } else {
        setEndDate(startDate);
        setStartDate(date);
      }
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      const weekends = getWeekendDatesInRange(startDate, endDate);
      onChange(
        [
          formatDate(startDate), // Format date without affecting timezone
          formatDate(endDate), // Format date without affecting timezone
        ],
        weekends,
      );
    }
  }, [startDate, endDate]);

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

  const handleMonthChange = (offset: number) => {
    const newDate = new Date(currentYear, currentMonth + offset, 1);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
  };

  const handleYearChange = (offset: number) => {
    setCurrentYear((prevYear) => prevYear + offset);
  };

  const days = Array.from(
    { length: 31 },
    (_, i) => new Date(currentYear, currentMonth, i + 1),
  );

  return (
    <StyledCalendarView className="calendar-container">
      <div className="header-wrapper">
        <div className="calendar-header">
          <button onClick={() => handleYearChange(-1)}>{'<'}</button>
          <span className="selected-year">{currentYear}</span>
          <button onClick={() => handleYearChange(1)}>{'>'}</button>
        </div>
        <div className="calendar-header">
          <button onClick={() => handleMonthChange(-1)}>{'<'}</button>
          <span className="selected-month">
            {new Date(currentYear, currentMonth).toLocaleString('default', {
              month: 'long',
            })}
          </span>
          <button onClick={() => handleMonthChange(1)}>{'>'}</button>
        </div>
      </div>
      <div className="calendar-grid">
        {days.map((day, index) => (
          <CalendarDay
            key={index}
            onClick={() => handleDateSelect(day)}
            classNames={`calendar-day ${isWeekend(day) ? 'weekend' : ''} ${
              startDate &&
              endDate &&
              formatDate(day) >= formatDate(startDate) &&
              day <= endDate
                ? 'selected'
                : ''
            }`}
            disabled={isWeekend(day)}
            label={day.getDate().toString()}
          />
        ))}
      </div>
      {predefinedRanges && (
        <div className="predefined-ranges">
          {predefinedRanges.map((range, index) => (
            <Button
              key={index}
              onClick={() => {
                setStartDate(range.range[0]);
                setEndDate(range.range[1]);
                onChange(
                  [formatDate(range.range[0]), formatDate(range.range[1])],
                  getWeekendDatesInRange(range.range[0], range.range[1]),
                );
              }}
              label={range.label}
            />
          ))}
        </div>
      )}
    </StyledCalendarView>
  );
};

export default CalendarView;
