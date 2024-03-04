import styles from './light-switch.module.scss';
import {
  ChangeEvent,
  MouseEvent as ReactMouseEvent,
  useEffect,
  useState,
} from 'react';
import { SCSSPrimaryColors } from '@lyttledev-dashboard/styles';

export interface LightSwitchProps {
  active: boolean;
  onClick?: (active: boolean) => void;
  className?: string;
  classNameActive?: string;
  color?: SCSSPrimaryColors;
  disabled?: boolean;
  mock?: boolean;
}

export function LightSwitch({
  active,
  onClick,
  className,
  classNameActive,
  color = SCSSPrimaryColors.purple,
  disabled = false,
  mock = false,
}: LightSwitchProps) {
  const [activeState, setActiveState] = useState(active);

  useEffect(() => {
    if (active === activeState) return;
    setActiveState(active);
  }, [active, setActiveState, activeState]);

  // Click handling
  const handleClick = (e: ReactMouseEvent<HTMLLabelElement, MouseEvent>) => {
    e.preventDefault();
    if (onClick) {
      onClick(!activeState);
    }
  };

  // Input change handling
  const unInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setActiveState(e.target.checked);
  };

  // Active class handling
  const activeClass = activeState ? styles.active : '';
  const customActiveClass = activeState ? classNameActive : '';

  return (
    <label
      className={`${styles.switch} ${
        styles[`switch--${color}`]
      } ${activeClass} ${
        disabled && styles.disabled
      } ${className} ${customActiveClass} ${mock && styles.mock}`}
      onClick={handleClick}
    >
      <input
        type="checkbox"
        checked={activeState}
        className={`${styles.input}`}
        onChange={unInputChange}
      />
    </label>
  );
}
