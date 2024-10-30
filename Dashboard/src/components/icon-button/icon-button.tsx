import styles from './icon-button.module.scss';
import { MouseEvent as ReactMouseEvent } from 'react';
import { useRouter } from 'next/router';
import { getIcon, Icons } from '@lyttledev-dashboard/components/icon';

export interface IconButtonProps {
  icon: Icons;
  disabled?: boolean;
  text?: string;
  href?: string;
  onClick?: (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  classNameDisabled?: string;
  children?: React.ReactNode;
  mock?: boolean;
}

export function IconButton({
  icon,
  text,
  href,
  onClick,
  disabled = false,
  className,
  classNameDisabled,
  children,
  mock = false,
}: IconButtonProps) {
  const router = useRouter();
  const IconElement = getIcon(icon);

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

  if (href && !disabled) {
    return (
      <button
        className={`${
          styles.button
        } ${disabledClass} ${className} ${customDisabledClass} ${
          mock && styles.mock
        }`}
        onClick={navigate}
      >
        {IconElement}
        <span className={styles.text}>
          {text}
          {children}
        </span>
      </button>
    );
  }
  return (
    <button
      disabled={disabled}
      className={`${
        styles.button
      } ${disabledClass} ${className} ${customDisabledClass} ${
        mock && styles.mock
      }`}
      onClick={handleClick}
    >
      {IconElement}
      <span className={styles.text}>
        {text}
        {children}
      </span>
    </button>
  );
}
