import React, { useEffect, useState } from 'react';
import { DateRangePickerProps } from '../../types/DateRangePicker.type';
import StyledCalendarView from './CalendarView.style';

interface CalendarViewProps extends DateRangePickerProps {
  selectedRange: [Date | null, Date | null];
}

const CalendarView = ({
  predefinedRanges,
  onChange,
  selectedRange,
}: CalendarViewProps) => {
  const [startDate, setStartDate] = useState<Date | null>(selectedRange[0]);
  const [endDate, setEndDate] = useState<Date | null>(selectedRange[1]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

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
          startDate.toISOString().split('T')[0], // Convert to string
          endDate.toISOString().split('T')[0], // Convert to string
        ],
        weekends,
      );
    }
  }, [startDate, endDate, onChange]);

  const getWeekendDatesInRange = (start: Date, end: Date) => {
    const weekends = [];
    const currentDate = new Date(start);
    while (currentDate <= end) {
      if (isWeekend(currentDate)) {
        weekends.push(currentDate.toISOString().split('T')[0]);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return weekends;
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
          <button
            key={index}
            onClick={() => handleDateSelect(day)}
            className={`calendar-day ${isWeekend(day) ? 'weekend' : ''} ${
              startDate && endDate && day >= startDate && day <= endDate
                ? 'selected'
                : ''
            }`}
            disabled={isWeekend(day)}
          >
            {day.getDate()}
          </button>
        ))}
      </div>
      {predefinedRanges && (
        <div className="predefined-ranges">
          {predefinedRanges.map((range, index) => (
            <button
              key={index}
              onClick={() => {
                setStartDate(range.range[0]);
                setEndDate(range.range[1]);
                onChange(
                  [
                    range.range[0].toISOString().split('T')[0], // Convert to string
                    range.range[1].toISOString().split('T')[0], // Convert to string
                  ],
                  getWeekendDatesInRange(range.range[0], range.range[1]),
                );
              }}
            >
              {range.label}
            </button>
          ))}
        </div>
      )}
    </StyledCalendarView>
  );
};

export default CalendarView;
