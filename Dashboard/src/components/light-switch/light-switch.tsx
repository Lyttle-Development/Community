import styles from './light-switch.module.scss';
import { useState } from 'react';
import { SCSSPrimaryColors } from '@lyttledev-dashboard/styles';

export interface LightSwitchProps {
  active: boolean;
  onClick?: (active: boolean) => void;
  className?: string;
  classNameActive?: string;
  color?: SCSSPrimaryColors;
}

export function LightSwitch({
  active,
  onClick,
  className,
  classNameActive,
  color = SCSSPrimaryColors.purple,
}: LightSwitchProps) {
  const [activeState, setActiveState] = useState(active);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      const newActiveState = !activeState;
      setActiveState(newActiveState);
      onClick(newActiveState);
    }
  };

  const activeClass = activeState ? classNameActive : '';
  const selfActiveClass = activeState ? styles.active : '';

  return (
    <label
      className={`${styles.switch} ${
        styles[`switch--${color}`]
      } ${selfActiveClass} ${className} ${activeClass}`}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore // we have right type in function.
      onClick={handleClick}
    >
      <input
        type="checkbox"
        checked={activeState}
        className={`${styles.input}`}
      />
    </label>
  );
}
