export type DateRangePickerProps = {
  predefinedRanges?: { label: string; range: [Date, Date] }[];
  onChange: (selectedRange: [string, string], weekendDates: string[]) => void;
};

export interface CalendarViewProps extends DateRangePickerProps {
  selectedRange: [Date | null, Date | null];
  initialMonth: number;
  initialYear: number;
}
