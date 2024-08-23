import React, { useEffect, useState } from 'react';
import { CalendarViewProps } from '../../types/components/date-range-picker';
import StyledCalendarView from './CalendarView.style';
import Button from '../Button/Button';
import CalendarDay from './CalendarDay/CalendarDay';

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

  useEffect(() => {
    if (
      (selectedRange[0] && !startDate) ||
      (selectedRange[1] && !endDate) ||
      (selectedRange[0] &&
        startDate &&
        selectedRange[0].getTime() !== startDate.getTime()) ||
      (selectedRange[1] &&
        endDate &&
        selectedRange[1].getTime() !== endDate.getTime())
    ) {
      setStartDate(selectedRange[0]);
      setEndDate(selectedRange[1]);

      if (selectedRange[0]) {
        setCurrentMonth(selectedRange[0].getMonth());
        setCurrentYear(selectedRange[0].getFullYear());
      }
    }
  }, [selectedRange]);

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
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth + offset;
      if (newMonth < 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11;
      }
      if (newMonth > 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0;
      }
      return newMonth;
    });
  };

  const handleYearChange = (offset: number) => {
    setCurrentYear((prevYear) => prevYear + offset);
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

  const days = getDaysInMonth(currentYear, currentMonth);

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
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div key={index} className="calendar-day-name">
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <CalendarDay
            key={index}
            onClick={() => day && handleDateSelect(day)}
            classNames={`calendar-day ${day && isWeekend(day) ? 'weekend' : ''} ${
              startDate &&
              !endDate &&
              day &&
              formatDate(day) === formatDate(startDate)
                ? `selecting`
                : ``
            } ${
              startDate &&
              endDate &&
              day &&
              formatDate(day) >= formatDate(startDate) &&
              day <= endDate
                ? 'selected'
                : ''
            }`}
            disabled={day === null || isWeekend(day)}
            label={day ? day.getDate().toString() : ''}
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
                setCurrentMonth(range.range[0].getMonth());
                setCurrentYear(range.range[0].getFullYear());
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
