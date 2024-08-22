import React, { useEffect, useState } from 'react';
import { DateRangePickerProps } from '../../types/DateRangePicker.type';
import StyledCalendarView from './CalendarView.style';

const CalendarView = ({ predefinedRanges, onChange }: DateRangePickerProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Helper function to check if a date is a weekend
  const isWeekend = (date: Date) => {
    const day = date.getUTCDay();
    return day === 0 || day === 6; // Sunday = 0, Saturday = 6
  };

  // Normalize date to remove the time component and ensure UTC
  const normalizeDate = (date: Date) => {
    const normalized = new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
    );
    return normalized;
  };

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    const normalizedDate = normalizeDate(date);
    if (isWeekend(normalizedDate)) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(normalizedDate);
      setEndDate(null);
    } else {
      if (normalizedDate > startDate) {
        setEndDate(normalizedDate);
      } else {
        setEndDate(startDate);
        setStartDate(normalizedDate);
      }
    }
  };

  // Calculate weekends correctly in the range
  const getWeekendDatesInRange = (start: Date, end: Date) => {
    const weekends: string[] = [];
    let currentDate = normalizeDate(new Date(start));

    while (currentDate <= end) {
      if (isWeekend(currentDate)) {
        weekends.push(currentDate.toISOString().split('T')[0]);
      }
      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
      currentDate = normalizeDate(currentDate); // Re-normalize after date increment
    }

    return weekends;
  };

  // Effect to handle changes in startDate and endDate
  useEffect(() => {
    if (startDate && endDate) {
      const weekends = getWeekendDatesInRange(startDate, endDate);
      console.log('Selected Dates:', startDate, endDate);
      console.log('Weekend Dates:', weekends);
      onChange(
        [
          startDate.toISOString().split('T')[0],
          endDate.toISOString().split('T')[0],
        ],
        weekends,
      );
    }
  }, [startDate, endDate]);

  // Handle predefined range selection
  const handlePredefinedRangeSelect = (range: [Date, Date]) => {
    setStartDate(normalizeDate(range[0]));
    setEndDate(normalizeDate(range[1]));
  };

  // Generate days for the current month
  const generateDaysInMonth = (year: number, month: number) => {
    const days = [];
    const date = new Date(Date.UTC(year, month, 1));
    while (date.getUTCMonth() === month) {
      days.push(new Date(date));
      date.setUTCDate(date.getUTCDate() + 1);
    }
    return days;
  };

  // Handle change in month and year
  const handleMonthChange = (offset: number) => {
    const newDate = new Date(Date.UTC(currentYear, currentMonth + offset, 1));
    setCurrentMonth(newDate.getUTCMonth());
    setCurrentYear(newDate.getUTCFullYear());
  };

  const handleYearChange = (offset: number) => {
    setCurrentYear((prevYear) => prevYear + offset);
  };

  // Generate days for the current month
  const days = generateDaysInMonth(currentYear, currentMonth);

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
            {new Date(Date.UTC(currentYear, currentMonth)).toLocaleString(
              'default',
              {
                month: 'long',
                timeZone: 'UTC',
              },
            )}
          </span>
          <button onClick={() => handleMonthChange(1)}>{'>'}</button>
        </div>
      </div>
      <div className="calendar-grid">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => handleDateSelect(day)}
            className={`calendar-day ${isWeekend(day) ? 'weekend' : ''} ${startDate && endDate && day >= startDate && day <= endDate ? 'selected' : ''}`}
            disabled={isWeekend(day)}
          >
            {day.getUTCDate()}
          </button>
        ))}
      </div>
      {predefinedRanges && (
        <div className="predefined-ranges">
          <div className="predefined-ranges-button-wrapper">
            {predefinedRanges.map((range, index) => (
              <button
                key={index}
                onClick={() => handlePredefinedRangeSelect(range.range)}
              >
                {range.label}
              </button>
            ))}
          </div>
          <button className="ok-button">OK</button>
        </div>
      )}
    </StyledCalendarView>
  );
};

export default CalendarView;
