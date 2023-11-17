import styles from './button.module.scss';
import { MouseEvent as ReactMouseEvent } from 'react';
import { useRouter } from 'next/router';

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
  style?: React.CSSProperties;
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
  style,
}: ButtonProps) {
  const router = useRouter();

  // Click handling
  const handleClick = (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (onClick) {
      onClick(e);
    }
  };

  const navigate = async () => {
    if (!href) return;
    await router.push(href);
  };

  // Active class handling
  const disabledClass = disabled ? styles.disabled : '';
  const customDisabledClass = disabled ? classNameDisabled : '';
  const noUpperClass = noUpper ? styles['no-upper'] : '';

  if (href && !disabled) {
    return (
      <button
        className={`${styles.button} ${
          styles[`button--${color}`]
        } ${disabledClass} ${noUpperClass} ${className} ${customDisabledClass}`}
        onClick={navigate}
        style={style}
      >
        {text}
        {children}
      </button>
    );
  }
  return (
    <button
      disabled={disabled}
      className={`${styles.button} ${
        styles[`button--${color}`]
      } ${disabledClass} ${noUpperClass} ${className} ${customDisabledClass}`}
      onClick={handleClick}
      style={style}
    >
      {text}
      {children}
    </button>
  );
}
