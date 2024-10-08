import styled from '@emotion/styled';

const StyledCalendarView = styled.div`
  margin-top: 10px;
  &.calendar-container {
    padding: 16px;
    width: 300px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  .header-wrapper {
    display: flex;
    gap: 0.5rem;
    justify-content: space-between;
    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      gap: 0.5rem;

      .selected-month,
      .selected-year {
        padding: 5px;
      }
    }
  }

  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
    text-align: center;
  }

  .predefined-ranges {
    margin-top: 16px;
    display: flex;
    gap: 1rem;
  }
`;

export default StyledCalendarView;
