import React, { useEffect, useMemo, useRef, useState } from 'react';
import './avakio-colorpicker.css';

export interface AvakioColorPickerPreset {
  label?: string;
  value: string; // e.g. #1ca1c1
}

export interface AvakioColorPickerProps {
  id?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (color: string) => void;
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  presets?: AvakioColorPickerPreset[];
  allowCustomInput?: boolean;
  showPreview?: boolean;
  className?: string;
  /** Minimum width */
  minWidth?: string | number;
  /** Minimum height */
  minHeight?: string | number;
  /** Test ID for testing purposes */
  testId?: string;
  /** Whether the component is borderless */
  borderless?: boolean;
  /** Whether the component is hidden */
  hidden?: boolean;
  /** Maximum height */
  maxHeight?: number | string;
  /** Maximum width */
  maxWidth?: number | string;
}

const normalizeHex = (hex: string) => {
  if (!hex) return '';
  const cleaned = hex.trim();
  if (/^#?[0-9a-fA-F]{6}$/.test(cleaned)) {
    return cleaned.startsWith('#') ? cleaned : `#${cleaned}`;
  }
  if (/^#?[0-9a-fA-F]{3}$/.test(cleaned)) {
    const c = cleaned.replace('#', '');
    const expanded = `#${c[0]}${c[0]}${c[1]}${c[1]}${c[2]}${c[2]}`;
    return expanded;
  }
  return '';
};

export function AvakioColorPicker({
  id,
  value,
  defaultValue = '#1ca1c1',
  onChange,
  label,
  description,
  error,
  disabled = false,
  readOnly = false,
  required = false,
  presets = [],
  allowCustomInput = true,
  showPreview = true,
  className = '',
  minWidth,
  minHeight,
  testId,
}: AvakioColorPickerProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<string>(normalizeHex(defaultValue) || '#1ca1c1');
  const inputRef = useRef<HTMLInputElement>(null);

  const currentColor = isControlled ? normalizeHex(value || '') || '#1ca1c1' : internal;

  useEffect(() => {
    if (!isControlled && !internal) {
      setInternal('#1ca1c1');
    }
  }, [isControlled, internal]);

  const allPresets = useMemo(() => {
    if (presets.length) return presets;
    return [
      { label: 'Cyan', value: '#1ca1c1' },
      { label: 'Blue', value: '#3b82f6' },
      { label: 'Indigo', value: '#6366f1' },
      { label: 'Violet', value: '#8b5cf6' },
      { label: 'Emerald', value: '#10b981' },
      { label: 'Amber', value: '#f59e0b' },
      { label: 'Orange', value: '#f57c00' },
      { label: 'Red', value: '#ef4444' },
      { label: 'Gray', value: '#9ca3af' },
      { label: 'Dark', value: '#111827' },
    ];
  }, [presets]);

  const handleSelect = (hex: string) => {
    const normalized = normalizeHex(hex);
    if (!normalized) return;
    if (!isControlled) {
      setInternal(normalized);
    }
    onChange?.(normalized);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const normalized = normalizeHex(val);
    if (!isControlled) {
      setInternal(val);
    }
    if (normalized) {
      onChange?.(normalized);
    }
  };

  const handleNativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    handleSelect(val);
  };

  return (
    <div
      data-testid={testId}
      className={[
        'avakio-colorpicker',
        disabled ? 'avakio-colorpicker-disabled' : '',
        error ? 'avakio-colorpicker-error' : '',
        className,
      ].filter(Boolean).join(' ')}
      data-color={currentColor}
      style={{
        ...(minWidth && { minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth }),
        ...(minHeight && { minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight }),
      }}
    >
      {(label || description || error) && (
        <div className="avakio-colorpicker-header">
          <div className="avakio-colorpicker-label-row">
            {label && <span className="avakio-colorpicker-label">{label}</span>}
            {required && <span className="avakio-colorpicker-required">*</span>}
          </div>
          {description && <div className="avakio-colorpicker-description">{description}</div>}
          {error && <div className="avakio-colorpicker-error-text">{error}</div>}
        </div>
      )}

      <div className="avakio-colorpicker-body">
        {showPreview && (
          <div className="avakio-colorpicker-preview" style={{ backgroundColor: currentColor }} aria-label="Color preview" />
        )}

        <div className="avakio-colorpicker-controls">
          <input
            ref={inputRef}
            type="color"
            className="avakio-colorpicker-native"
            value={currentColor}
            onChange={handleNativeChange}
            disabled={disabled || readOnly}
            aria-label="Pick color"
          />

          {allowCustomInput && (
            <input
              type="text"
              className="avakio-colorpicker-hex"
              value={currentColor}
              onChange={handleInputChange}
              disabled={disabled || readOnly}
              maxLength={7}
              aria-label="Hex value"
            />
          )}
        </div>
      </div>

      {allPresets.length > 0 && (
        <div className="avakio-colorpicker-swatches" aria-label="Color presets">
          {allPresets.map((preset) => (
            <button
              key={preset.value}
              type="button"
              className="avakio-colorpicker-swatch"
              style={{ backgroundColor: preset.value }}
              onClick={() => handleSelect(preset.value)}
              disabled={disabled || readOnly}
              aria-label={preset.label || preset.value}
            >
              <span className="avakio-colorpicker-swatch-inner" />
              {currentColor.toLowerCase() === preset.value.toLowerCase() && (
                <span className="avakio-colorpicker-swatch-active" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}











