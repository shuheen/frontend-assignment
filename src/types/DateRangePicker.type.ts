export type DateRangePickerProps = {
  predefinedRanges?: { label: string; range: [Date, Date] }[];
  onChange: (selectedRange: [string, string], weekendDates: string[]) => void;
};
