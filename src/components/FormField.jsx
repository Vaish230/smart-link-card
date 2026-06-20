import './FormField.css';

/**
 * FormField — a labeled input or textarea with optional error and hint text.
 * Pure, controlled component: parent owns the value.
 */
export default function FormField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  as = 'input',
  maxLength,
  error,
  hint,
  required = false,
}) {
  const Tag = as === 'textarea' ? 'textarea' : 'input';

  return (
    <div className="form-field">
      <div className="form-field__head">
        <label htmlFor={id} className="form-field__label">
          {label}
          {required && <span className="form-field__required" aria-hidden="true">*</span>}
        </label>
        {maxLength && (
          <span className="form-field__count">
            {(value || '').length}/{maxLength}
          </span>
        )}
      </div>

      <Tag
        id={id}
        name={id}
        type={as === 'input' ? type : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={as === 'textarea' ? 3 : undefined}
        className={`form-field__control ${error ? 'form-field__control--error' : ''}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
      />

      {error && (
        <p id={`${id}-error`} className="form-field__error" role="alert">
          {error}
        </p>
      )}
      {!error && hint && (
        <p id={`${id}-hint`} className="form-field__hint">
          {hint}
        </p>
      )}
    </div>
  );
}
