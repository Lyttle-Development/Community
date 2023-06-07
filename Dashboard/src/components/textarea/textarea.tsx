import { ChangeEvent } from 'react';
import styles from './textarea.module.scss';

export interface TextareaProps {
  label?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  classNameDisabled?: string;
}

export function Textarea({
  label,
  value,
  placeholder,
  disabled = false,
  onChange,
  className,
  classNameDisabled,
}: TextareaProps) {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (!onChange) return;
    onChange(event);
  };

  return (
    <label
      className={`${styles.label} ${className} ${
        disabled && classNameDisabled
      }`}
    >
      {label && <span>{label}</span>}
      <textarea
        value={value}
        disabled={disabled}
        onChange={handleChange}
        placeholder={placeholder}
        className={`${styles.textarea} ${disabled && styles.disabled}`}
      />
    </label>
  );
}
