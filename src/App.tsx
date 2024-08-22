import React from 'react';
import WeekdayDateRangePicker from './components/DateRangePicker/DateRangePicker';
import './App.css';
function App() {
  // Function to calculate date range
  const calculateDateRange = (days: number): [Date, Date] => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 1); // Yesterday
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - days); // End date minus days
    return [startDate, endDate];
  };

  // Dynamic predefined ranges
  const predefinedRanges = [
    { label: 'Last 7 Days', range: calculateDateRange(7) },
    { label: 'Last 30 Days', range: calculateDateRange(30) },
  ];

  const handleDateChange = (
    selectedRange: [string, string],
    weekendDates: string[],
  ) => {
    console.log('Selected Range:', selectedRange);
    console.log('Weekend Dates:', weekendDates);
  };

  return (
    <div className="App">
      <div className="app-container">
        <h1>Date Range Picker</h1>
        <WeekdayDateRangePicker
          predefinedRanges={predefinedRanges}
          onChange={handleDateChange}
        />
      </div>
    </div>
  );
}

export default App;
