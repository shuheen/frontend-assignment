import React from 'react';
import StyledCalendarDay from './CalendarDay.style';
import { CalendarDayProps } from '../../types/components/calendar-day';

const CalendarDay = ({
  label,
  onClick,
  disabled,
  classNames,
}: CalendarDayProps) => {
  return (
    <StyledCalendarDay
      onClick={onClick}
      className={classNames}
      disabled={disabled}
    >
      {label}
    </StyledCalendarDay>
  );
};

export default CalendarDay;
