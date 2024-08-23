import { IconType } from 'react-icons/lib/iconBase';
import { ButtonProps } from './button.type';

export interface IconButtonProps extends Omit<ButtonProps, 'label'> {
  icon: React.ComponentType;
  rounded?: 'small' | 'medium' | 'full';
  size?: 'small' | 'medium' | 'large';
}
