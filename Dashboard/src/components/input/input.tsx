import { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import styles from './input.module.scss';

export interface InputProps {
  type: HTMLInputTypeAttribute;
  label?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  classNameDisabled?: string;
}

export function Input({
  type,
  label,
  value,
  placeholder,
  disabled = false,
  onChange,
  className,
  classNameDisabled,
}: InputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;
    onChange(e);
  };

  return (
    <label
      className={`${styles.label} ${className} ${
        disabled && classNameDisabled
      }`}
    >
      {label && <span>{label}</span>}
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        placeholder={placeholder}
        className={`${styles.input} ${disabled && styles.disabled}`}
      />
    </label>
  );
}
