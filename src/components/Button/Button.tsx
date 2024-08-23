import React from 'react';
import { ButtonProps } from '../../types/components/button.type';
import StyledButton from './Button.style';

const Button = ({ onClick, label }: ButtonProps) => {
  return <StyledButton onClick={onClick}>{label}</StyledButton>;
};

export default Button;
