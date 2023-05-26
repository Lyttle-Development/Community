import styles from './button.module.scss';
import { MouseEvent as ReactMouseEvent } from 'react';
import { SCSSPrimaryColors } from '@lyttledev-dashboard/styles';

export interface ButtonProps {
  disabled?: boolean;
  text?: string;
  onClick?: (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  classNameDisabled?: string;
  color?: SCSSPrimaryColors;
  children?: React.ReactNode;
  noUpper?: boolean;
}

export function Button({
  text,
  onClick,
  disabled = false,
  className,
  classNameDisabled,
  color = SCSSPrimaryColors.purple,
  children,
  noUpper = false,
}: ButtonProps) {
  // Click handling
  const handleClick = (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (onClick) {
      onClick(e);
    }
  };

  // Active class handling
  const disabledClass = disabled ? styles.disabled : '';
  const customDisabledClass = disabled ? classNameDisabled : '';
  const noUpperClass = noUpper ? styles['no-upper'] : '';

  return (
    <button
      disabled={disabled}
      className={`${styles.button} ${
        styles[`button--${color}`]
      } ${disabledClass} ${noUpperClass} ${className} ${customDisabledClass}`}
      onClick={handleClick}
    >
      {text}
      {children}
    </button>
  );
}
