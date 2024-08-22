import React, { useRef, useState, useEffect } from 'react';
import StyledDateRangePicker from './DateRangePicker.style';
import { createPortal } from 'react-dom';
import { DateRangePickerProps } from '../../types/DateRangePicker.type';
import CalendarView from '../CalendarView/CalendarView';

const DateRangePicker = ({
  predefinedRanges,
  onChange,
}: DateRangePickerProps) => {
  const pickerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    if (pickerRef.current) {
      const rect = pickerRef.current.getBoundingClientRect();
      setPosition({ top: rect.bottom, left: rect.left });
    }
  }, []);

  return (
    <StyledDateRangePicker ref={pickerRef}>
      <input
        type="text"
        readOnly
        className="date-range-input"
        placeholder="Start Date - End Date"
      />
      {createPortal(
        <div
          style={{
            position: 'absolute',
            top: position.top,
            left: position.left,
          }}
        >
          <CalendarView
            predefinedRanges={predefinedRanges}
            onChange={onChange}
          />
        </div>,
        document.body,
      )}
    </StyledDateRangePicker>
  );
};

export default DateRangePicker;
