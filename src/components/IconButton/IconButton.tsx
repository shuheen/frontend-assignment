import React from 'react';
import StyledIconButton from './IconButton.style';
import { IconButtonProps } from '../../types/components/icon-button.type';

const IconButton = ({
  icon: Icon,
  disabled,
  onClick,
  classNames,
  rounded = 'small',
  size = 'medium',
}: IconButtonProps) => {
  return (
    <StyledIconButton
      disabled={disabled}
      onClick={onClick}
      className={`${classNames} ${size} ${`rounded-${rounded}`} icon-button`}
    >
      <Icon />
    </StyledIconButton>
  );
};

export default IconButton;
