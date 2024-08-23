import styled from '@emotion/styled';

const StyledCalendarDay = styled.button`
  &.calendar-day {
    width: 20px;
    height: 20px;
    padding: 6px;
    box-sizing: content-box;
    border-radius: 50%;
    border: 1px solid #e9e9e9;
    cursor: pointer;
    background-color: transparent;
    margin: 0 auto;
  }

  &.calendar-day:hover {
    background-color: #e0e0e0;
  }

  &.calendar-day.selecting {
    background-color: #e4fafa;
  }

  &.calendar-day.selected {
    background-color: #12787b;
    color: #fff;
    font-weight: 600;
    &.weekend {
      color: #ccc;
    }
  }

  &.calendar-day.weekend {
    background-color: #fcfcfc;
    cursor: not-allowed;
    color: #ccc;
  }
`;

export default StyledCalendarDay;
