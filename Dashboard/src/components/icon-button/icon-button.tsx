import styles from './icon-button.module.scss';
import { MouseEvent as ReactMouseEvent } from 'react';
import { useRouter } from 'next/router';

export enum IconButtonIcons {
  cog = 'cog',
  hamburger = 'hamburger',
  down = 'down',
}

export interface IconButtonProps {
  icon: IconButtonIcons;
  disabled?: boolean;
  text?: string;
  href?: string;
  onClick?: (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  classNameDisabled?: string;
  children?: React.ReactNode;
  mock?: boolean;
}

function getIcon(icon: IconButtonIcons) {
  switch (icon) {
    case IconButtonIcons.cog:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22.993"
          height="23"
          viewBox="0 0 22.993 23"
        >
          <g id="Layer_2" data-name="Layer 2" transform="translate(-1.995 -2)">
            <g id="settings" transform="translate(1.995 2)">
              <path
                id="_Group_"
                d="M9.6,24.989a2.586,2.586,0,0,1-1.552-.529L5.667,22.69a2.724,2.724,0,0,1-.563-3.7,2.368,2.368,0,0,0,.264-2.138L5.3,16.667a2.1,2.1,0,0,0-1.287-1.4H3.828a2.69,2.69,0,0,1-1.7-3.379L3.07,8.9A2.506,2.506,0,0,1,4.357,7.276a2.46,2.46,0,0,1,1.931-.138A2.218,2.218,0,0,0,8.334,6.8l.149-.115a2.23,2.23,0,0,0,.839-1.736V4.678A2.667,2.667,0,0,1,11.955,2h2.931a2.6,2.6,0,0,1,1.839.77A2.724,2.724,0,0,1,17.507,4.7v.322A2.023,2.023,0,0,0,18.3,6.667l.126.092a2,2,0,0,0,1.828.3l.391-.126a2.6,2.6,0,0,1,3.31,1.736l.908,2.9a2.713,2.713,0,0,1-1.678,3.368l-.23.08a2.172,2.172,0,0,0-1.414,1.471,2.3,2.3,0,0,0,.287,1.9l.3.437a2.736,2.736,0,0,1-.575,3.713l-2.31,1.782a2.575,2.575,0,0,1-3.7-.609l-.138-.2a2.012,2.012,0,0,0-1.724-.9,2.069,2.069,0,0,0-1.644.885l-.264.379a2.586,2.586,0,0,1-1.724,1.115A2.3,2.3,0,0,1,9.6,24.989ZM4.759,13.058A4.4,4.4,0,0,1,7.5,15.931v.138a4.6,4.6,0,0,1-.529,4.161.437.437,0,0,0,0,.586L9.438,22.69a.287.287,0,0,0,.425-.08l.264-.379a4.333,4.333,0,0,1,7.127,0l.138.207a.345.345,0,0,0,.207.138.287.287,0,0,0,.218-.057l2.368-1.793a.414.414,0,0,0,.08-.563l-.3-.437a4.6,4.6,0,0,1-.609-3.931,4.506,4.506,0,0,1,2.862-3l.23-.08a.391.391,0,0,0,.218-.506l-.9-2.862a.4.4,0,0,0-.23-.218.241.241,0,0,0-.218,0l-.391.126A4.3,4.3,0,0,1,16.99,8.6l-.046-.1a4.322,4.322,0,0,1-1.713-3.448V4.69a.425.425,0,0,0-.115-.3.356.356,0,0,0-.241-.092h-2.92a.356.356,0,0,0-.333.379v.287A4.483,4.483,0,0,1,9.874,8.518l-.149.115a4.494,4.494,0,0,1-4.173.678.253.253,0,0,0-.161,0,.322.322,0,0,0-.138.172l-.954,3A.414.414,0,0,0,4.552,13Z"
                transform="translate(-1.995 -2)"
                fill="#707070"
              />
              <path
                id="Path_12"
                d="M12.523,16.546a4.023,4.023,0,1,1,4.023-4.023,4.023,4.023,0,0,1-4.023,4.023Zm0-5.747a1.724,1.724,0,1,0,1.724,1.724A1.724,1.724,0,0,0,12.523,10.8Z"
                transform="translate(-1.023 -1.029)"
                fill="#707070"
              />
            </g>
          </g>
        </svg>
      );
    case IconButtonIcons.hamburger:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M464 256H48a48 48 0 0 0 0 96h416a48 48 0 0 0 0-96zm16 128H32a16 16 0 0 0-16 16v16a64 64 0 0 0 64 64h352a64 64 0 0 0 64-64v-16a16 16 0 0 0-16-16zM58.64 224h394.72c34.57 0 54.62-43.9 34.82-75.88C448 83.2 359.55 32.1 256 32c-103.54.1-192 51.2-232.18 116.11C4 180.09 24.07 224 58.64 224zM384 112a16 16 0 1 1-16 16 16 16 0 0 1 16-16zM256 80a16 16 0 1 1-16 16 16 16 0 0 1 16-16zm-128 32a16 16 0 1 1-16 16 16 16 0 0 1 16-16z" />
        </svg>
      );
    case IconButtonIcons.down:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19.407"
          height="22.333"
          viewBox="0 0 19.407 22.333"
        >
          <g transform="translate(17.578 1) rotate(90)">
            <path
              d="M1,7.875H19.333M12.458,1l6.875,6.875L12.458,14.75"
              fill="none"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              fillRule="evenodd"
            />
          </g>
        </svg>
      );
    default:
      return <p>Not icon found!</p>;
  }
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
