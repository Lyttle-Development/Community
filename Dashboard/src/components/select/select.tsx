import { ChangeEvent, useEffect, useState } from 'react';
import styles from './select.module.scss';

export enum SelectColor {
  Purple = 'purple',
  Yellow = 'yellow',
  Orange = 'orange',
}

export interface SelectProps {
  label?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  options: {
    key: string | { title: string; description: string };
    value: string;
  }[];
  onChange?: (newValue: string) => void;
  className?: string;
  classNameDisabled?: string;
  color?: SelectColor;
  onlyOnChange?: boolean;
}

export function Select({
  label,
  value,
  placeholder,
  options,
  disabled = false,
  onChange,
  className,
  classNameDisabled,
  color = SelectColor.Purple,
  onlyOnChange = false,
}: SelectProps) {
  const [selectValue, setValue] = useState(value ?? '');
  const [startClose, setStartClose] = useState(false);
  const [closed, setClosed] = useState(false);
  const [allowClosing, setAllowClosing] = useState(false);

  const handleChange = (newValue: string) => {
    setStartClose(true);
    setValue(newValue);

    if (onlyOnChange) setValue(value ?? '');
    if (!onChange) return;
    onChange(newValue);
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    handleChange(event.target.value);
  };

  // Update value, if value prop changes
  useEffect(() => {
    setValue(value ?? '');
  }, [value]);

  // Close select element
  useEffect(() => {
    if (!startClose) return;
    setAllowClosing(false);
    // De-render select element
    setTimeout(() => {
      setClosed(true);

      // Re-render select element instantly!
      setTimeout(() => {
        setStartClose(false);
        setClosed(false);
        setAllowClosing(false);
      }, 0);
    }, 500);
  }, [startClose]);

  const currentOption = (selectValue &&
    options.find((option) => option.value === selectValue)) || {
    key: 'Select',
    value: null,
  };

  const valueOption =
    typeof currentOption.key === 'string' ? (
      currentOption.key
    ) : (
      <>
        <span className={styles['value__title']}>
          {currentOption.key.title}
        </span>
        <span className={styles['value__description']}>
          {currentOption.key.description}
        </span>
      </>
    );

  // Focus close element
  // This to stop the focus on the select element
  if (closed) {
    return (
      <label
        className={`${styles.label} ${styles[`label--${color}`]} ${className} ${
          disabled && classNameDisabled
        } ${startClose && styles.closing} ${styles.placeholder}`}
      >
        {label && <span>{label}</span>}

        <div className={styles.select}>
          <span className={styles.value}>
            {valueOption}
            <span className={styles.closer}>Close</span>
          </span>
        </div>
      </label>
    );
  }

  return (
    <>
      <label
        className={`${styles.label} ${styles[`label--${color}`]} ${className} ${
          disabled && classNameDisabled
        } ${startClose && styles.closing}`}
        onFocus={() => setAllowClosing(true)}
        onBlur={() => setTimeout(() => setAllowClosing(false), 100)}
      >
        {label && <span>{label}</span>}
        <select
          className={styles['accessible-select']}
          value={selectValue}
          onChange={handleSelectChange}
        >
          {options &&
            options.map((option, i) => (
              <option key={i} value={option.value}>
                {typeof option.key === 'string'
                  ? option.key
                  : option.key.title + ' - ' + option.key.description}
              </option>
            ))}
        </select>

        <div className={`${styles.select} select`}>
          <span
            className={`${styles.value} value`}
            onClick={() => {
              allowClosing && setStartClose(true);
              !allowClosing && setStartClose(false);
            }}
          >
            {valueOption}
            <span
              className={styles.closer}
              onClick={() => {
                allowClosing && setStartClose(true);
                !allowClosing && setStartClose(false);
              }}
            >
              Close
            </span>
          </span>
          <div className={`${styles['options-container']} options-container`}>
            <ul className={`${styles.options} options`}>
              {options &&
                options.map((option, i) => (
                  <li
                    key={i}
                    className={`${styles.option} option ${
                      typeof option.key === 'string'
                        ? ''
                        : styles['option--with-description']
                    } ${
                      option.value === selectValue && styles['option--active']
                    }`}
                    onClick={() => handleChange(option.value)}
                  >
                    {typeof option.key === 'string' ? (
                      option.key
                    ) : (
                      <>
                        <span className={styles['option__title']}>
                          {option.key.title}
                        </span>
                        <span className={styles['option__description']}>
                          {option.key.description}
                        </span>
                      </>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </label>
    </>
  );
}
