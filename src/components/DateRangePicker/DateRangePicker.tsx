import React, { useRef, useState, useEffect } from 'react';
import StyledDateRangePicker from './DateRangePicker.style';
import { createPortal } from 'react-dom';
import { DateRangePickerProps } from '../../types/DateRangePicker.type';
import CalendarView from '../CalendarView/CalendarView';

const DateRangePicker = ({
  predefinedRanges,
  onChange,
}: DateRangePickerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  // State to retain the selected date range
  const [selectedRange, setSelectedRange] = useState<
    [Date | null, Date | null]
  >([null, null]);

  useEffect(() => {
    if (pickerRef.current) {
      const rect = pickerRef.current.getBoundingClientRect();
      setPosition({ top: rect.bottom, left: rect.left });
    }
  }, []);

  const handleDatePickerToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleDateChange = (range: [string, string], weekends: string[]) => {
    // Convert the string range to Date objects for internal use if needed
    setSelectedRange([new Date(range[0]), new Date(range[1])]);
    onChange(range, weekends);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        calendarRef.current &&
        !pickerRef.current.contains(event.target as Node) &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <StyledDateRangePicker ref={pickerRef}>
      <input
        type="text"
        readOnly
        className="date-range-input"
        placeholder="Start Date - End Date"
        value={
          selectedRange[0] && selectedRange[1]
            ? `${selectedRange[0]?.toLocaleDateString()} - ${selectedRange[1]?.toLocaleDateString()}`
            : ''
        }
        onFocus={handleDatePickerToggle}
      />
      {isOpen &&
        createPortal(
          <div
            ref={calendarRef}
            style={{
              position: 'absolute',
              top: position.top,
              left: position.left,
              zIndex: 1000,
            }}
          >
            <CalendarView
              predefinedRanges={predefinedRanges}
              onChange={handleDateChange}
              selectedRange={selectedRange} // Pass the selected range to the CalendarView
            />
          </div>,
          document.body,
        )}
    </StyledDateRangePicker>
  );
};

export default DateRangePicker;
