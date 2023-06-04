import styles from './button.module.scss';
import { MouseEvent as ReactMouseEvent } from 'react';
import Link from 'next/link';

export enum ButtonColors {
  purple = 'purple',
  orange = 'orange',
  yellow = 'yellow',
  tertiary = 'tertiary',
  secondary = 'secondary',
}

export interface ButtonProps {
  disabled?: boolean;
  text?: string;
  href?: string;
  onClick?: (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  classNameDisabled?: string;
  color?: ButtonColors;
  children?: React.ReactNode;
  noUpper?: boolean;
}

export function Button({
  text,
  href,
  onClick,
  disabled = false,
  className,
  classNameDisabled,
  color = ButtonColors.purple,
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

  if (href && !disabled) {
    return (
      <Link
        className={`${styles.button} ${
          styles[`button--${color}`]
        } ${disabledClass} ${noUpperClass} ${className} ${customDisabledClass}`}
        href={href}
      >
        {text}
        {children}
      </Link>
    );
  }
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
