import React from 'react';
import StyledMonthYearSelector from './MonthYearSelector.style';
import Button from '../Button/Button';
import { MonthYearSelectorProps } from '../../types/components/month-year-selector';

const MonthYearSelector = ({
  handlePrevious,
  handleNext,
  classNames,
  nextText,
  previousText,
  mainText,
}: MonthYearSelectorProps) => {
  return (
    <StyledMonthYearSelector className={classNames}>
      <Button onClick={handlePrevious} label={previousText}></Button>
      <span className="selected-year">{mainText}</span>
      <Button onClick={handleNext} label={nextText}></Button>
    </StyledMonthYearSelector>
  );
};

export default MonthYearSelector;
