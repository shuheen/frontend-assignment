import React from 'react';
import StyledMonthYearSelector from './MonthYearSelector.style';
import { MonthYearSelectorProps } from '../../types/components/month-year-selector';
import IconButton from '../IconButton/IconButton';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
const MonthYearSelector = ({
  handlePrevious,
  handleNext,
  classNames,
  mainText,
}: MonthYearSelectorProps) => {
  return (
    <StyledMonthYearSelector className={classNames}>
      <IconButton size="small" onClick={handlePrevious} icon={FaChevronLeft} />
      <span className="selected-year">{mainText}</span>
      <IconButton
        size="small"
        onClick={handleNext}
        icon={FaChevronRight}
      ></IconButton>
    </StyledMonthYearSelector>
  );
};

export default MonthYearSelector;
