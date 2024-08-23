import React, { useEffect, useState } from 'react';
import { CalendarViewProps } from '../../types/components/date-range-picker';
import StyledCalendarView from './CalendarView.style';
import Button from '../Button/Button';
import CalendarDay from './CalendarDay/CalendarDay';
import MonthYearSelector from '../MonthYearSelector/MonthYearSelector';
import {
  formatDate,
  getDaysInMonth,
  getWeekendDatesInRange,
  isWeekend,
} from '../../utils/date';

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

  const days = getDaysInMonth(currentYear, currentMonth);

  return (
    <StyledCalendarView className="calendar-container">
      <div className="header-wrapper">
        <MonthYearSelector
          handleNext={() => handleYearChange(1)}
          handlePrevious={() => handleYearChange(-1)}
          mainText={currentYear}
          classNames="calendar-header"
        />
        <MonthYearSelector
          handleNext={() => handleMonthChange(1)}
          handlePrevious={() => handleMonthChange(-1)}
          classNames="calendar-header"
          mainText={new Date(currentYear, currentMonth).toLocaleString(
            'default',
            {
              month: 'long',
            },
          )}
        />
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
