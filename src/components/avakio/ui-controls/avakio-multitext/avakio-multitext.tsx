import React, { forwardRef, useImperativeHandle, useState, useRef, useEffect, useCallback } from 'react';
import { Plus, X } from 'lucide-react';
import './avakio-multitext.css';

export type AvakioMultitextTheme = 'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset';
export type AvakioMultitextLabelPosition = 'left' | 'top';

export interface AvakioMultitextField {
  /** Unique identifier for the field */
  id: string;
  /** Current value of the field */
  value: string;
  /** Whether this is the primary (non-removable) field */
  isPrimary?: boolean;
  /** Whether this field is disabled */
  disabled?: boolean;
}

export interface AvakioMultitextSubConfig {
  /** Placeholder for additional fields */
  placeholder?: string;
  /** Max length for additional fields */
  maxLength?: number;
  /** Pattern for additional fields */
  pattern?: string;
  /** Disabled state for additional fields */
  disabled?: boolean;
}

export interface AvakioMultitextProps {
  /** Unique identifier */
  id?: string;
  /** Test ID for testing purposes */
  testId?: string;
  /** Name for form submission */
  name?: string;
  /** Current value (comma-separated string or array) */
  value?: string | string[];
  /** Default value */
  defaultValue?: string | string[];
  /** Label text */
  label?: string;
  /** Label width */
  labelWidth?: number;
  /** Label alignment */
  labelAlign?: 'left' | 'right';
  /** Label position */
  labelPosition?: AvakioMultitextLabelPosition;
  /** Placeholder for the primary field */
  placeholder?: string;
  /** Mark as required */
  required?: boolean;
  /** Error message */
  error?: string;
  /** Invalid message (shown on validation) */
  invalidMessage?: string;
  /** Bottom label text */
  bottomLabel?: string;
  /** Theme variant */
  theme?: AvakioMultitextTheme;
  /** Disabled state */
  disabled?: boolean;
  /** Readonly state */
  readonly?: boolean;
  /** CSS class name */
  className?: string;
  /** Inline styles */
  css?: React.CSSProperties;
  /** Width */
  width?: number | string;
  /** Height */
  height?: number | string;
  /** Minimum width */
  minWidth?: number | string;
  /** Minimum height */
  minHeight?: number | string;
  /** Maximum width */
  maxWidth?: number | string;
  /** Maximum height */
  maxHeight?: number | string;
  /** Whether the component is hidden */
  hidden?: boolean;
  /** Input alignment */
  inputAlign?: 'left' | 'center' | 'right';
  /** Input width */
  inputWidth?: number;
  /** Icon for add button */
  icon?: React.ReactNode;
  /** Icon width */
  iconWidth?: number;
  /** Maximum number of fields allowed */
  maxFields?: number;
  /** Separator for combined value string */
  separator?: string;
  /** Configuration for additional fields */
  subConfig?: AvakioMultitextSubConfig;
  /** Show line numbers */
  showNumbers?: boolean;
  /** Custom add button label */
  addButtonLabel?: string;
  /** Custom add button tooltip */
  addButtonTooltip?: string;
  /** Validate function */
  validate?: (value: string[]) => boolean | string;
  /** Validate event */
  validateEvent?: 'change' | 'blur';
  /** Max length per field */
  maxLength?: number;
  /** Pattern for HTML5 validation */
  pattern?: string;
  /** Autocomplete attribute */
  autoComplete?: string;
  /** Callback when value changes */
  onChange?: (value: string[], combinedValue: string) => void;
  /** Callback when a section is added */
  onSectionAdd?: (fieldId: string, index: number) => void;
  /** Callback when a section is removed */
  onSectionRemove?: (fieldId: string, value: string) => void;
  /** Callback when a field gains focus */
  onFocus?: (fieldId: string, event: React.FocusEvent) => void;
  /** Callback when a field loses focus */
  onBlur?: (fieldId: string, event: React.FocusEvent) => void;
  /** Callback on Enter key */
  onEnter?: (fieldId: string, value: string) => void;
}

export interface AvakioMultitextRef {
  /** Get the combined value string */
  getValue: () => string;
  /** Get all values as an array */
  getValues: () => string[];
  /** Set the combined value string */
  setValue: (value: string | string[]) => void;
  /** Get the value of the primary (first) field only */
  getValueHere: () => string;
  /** Set the value of the primary (first) field only */
  setValueHere: (value: string) => void;
  /** Add a new empty field */
  addSection: (value?: string) => string;
  /** Remove a field by ID (cannot remove primary) */
  removeSection: (fieldId?: string) => void;
  /** Get all field IDs */
  getFieldIds: () => string[];
  /** Get a specific field by ID */
  getField: (fieldId: string) => AvakioMultitextField | undefined;
  /** Get the number of fields */
  getFieldCount: () => number;
  /** Clear all additional fields (keep primary) */
  clearAdditional: () => void;
  /** Clear all fields including primary value */
  clear: () => void;
  /** Focus the primary field */
  focus: () => void;
  /** Focus a specific field */
  focusField: (fieldId: string) => void;
  /** Blur all fields */
  blur: () => void;
  /** Refresh the component */
  refresh: () => void;
  /** Enable the component */
  enable: () => void;
  /** Disable the component */
  disable: () => void;
  /** Check if enabled */
  isEnabled: () => boolean;
  /** Hide the component */
  hide: () => void;
  /** Show the component */
  show: () => void;
  /** Check if visible */
  isVisible: () => boolean;
  /** Validate the control */
  validate: () => boolean;
  /** Get the HTML element */
  getNode: () => HTMLDivElement | null;
}

// Generate unique ID for fields
let fieldIdCounter = 0;
const generateFieldId = () => `multitext-field-${++fieldIdCounter}`;

export const AvakioMultitext = forwardRef<AvakioMultitextRef, AvakioMultitextProps>(
  (
    {
      id,
      testId,
      name,
      value,
      defaultValue,
      label,
      labelWidth = 100,
      labelAlign = 'left',
      labelPosition = 'left',
      placeholder,
      required = false,
      error,
      invalidMessage,
      bottomLabel,
      theme = 'material',
      disabled = false,
      readonly = false,
      className = '',
      css,
      width,
      height,
      minWidth,
      maxWidth,
      inputAlign = 'left',
      inputWidth,
      icon,
      iconWidth = 28,
      maxFields,
      separator = ', ',
      subConfig,
      showNumbers = false,
      addButtonLabel,
      addButtonTooltip = 'Add field',
      validate,
      validateEvent = 'blur',
      maxLength,
      pattern,
      autoComplete,
      onChange,
      onSectionAdd,
      onSectionRemove,
      onFocus,
      onBlur,
      onEnter,
    },
    ref
  ) => {
    // Parse initial value
    const parseValue = useCallback((val: string | string[] | undefined): AvakioMultitextField[] => {
      if (!val) {
        return [{ id: generateFieldId(), value: '', isPrimary: true }];
      }
      
      const values = Array.isArray(val) 
        ? val 
        : val.split(separator).map(v => v.trim()).filter(v => v);
      
      if (values.length === 0) {
        return [{ id: generateFieldId(), value: '', isPrimary: true }];
      }
      
      return values.map((v, index) => ({
        id: generateFieldId(),
        value: v,
        isPrimary: index === 0,
      }));
    }, [separator]);

    const [fields, setFields] = useState<AvakioMultitextField[]>(() => 
      parseValue(value ?? defaultValue)
    );
    const [isDisabled, setIsDisabled] = useState(disabled);
    const [isVisible, setIsVisible] = useState(true);
    const [isInvalid, setIsInvalid] = useState(false);
    const [validationMessage, setValidationMessage] = useState(error || invalidMessage || '');
    const [refreshKey, setRefreshKey] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRefs = useRef<Map<string, HTMLInputElement>>(new Map());

    // Sync with external value changes
    useEffect(() => {
      if (value !== undefined) {
        setFields(parseValue(value));
      }
    }, [value, parseValue]);

    // Sync disabled state
    useEffect(() => {
      setIsDisabled(disabled);
    }, [disabled]);

    // Sync error state
    useEffect(() => {
      if (error) {
        setIsInvalid(true);
        setValidationMessage(error);
      } else if (invalidMessage) {
        setValidationMessage(invalidMessage);
      }
    }, [error, invalidMessage]);

    // Get combined value string
    const getCombinedValue = useCallback(() => {
      return fields.map(f => f.value).filter(v => v).join(separator);
    }, [fields, separator]);

    // Get values array
    const getValuesArray = useCallback(() => {
      return fields.map(f => f.value);
    }, [fields]);

    // Validate fields
    const validateFields = useCallback(() => {
      if (required && fields.every(f => !f.value.trim())) {
        setIsInvalid(true);
        setValidationMessage(invalidMessage || 'This field is required');
        return false;
      }

      if (validate) {
        const values = fields.map(f => f.value);
        const result = validate(values);
        if (typeof result === 'string') {
          setIsInvalid(true);
          setValidationMessage(result);
          return false;
        } else if (result === false) {
          setIsInvalid(true);
          setValidationMessage(invalidMessage || 'Invalid value');
          return false;
        }
      }

      setIsInvalid(false);
      setValidationMessage('');
      return true;
    }, [fields, required, validate, invalidMessage]);

    // Handle field value change
    const handleFieldChange = useCallback((fieldId: string, newValue: string) => {
      setFields(prev => {
        const updated = prev.map(f => 
          f.id === fieldId ? { ...f, value: newValue } : f
        );
        
        // Trigger onChange callback
        setTimeout(() => {
          const values = updated.map(f => f.value);
          const combined = values.filter(v => v).join(separator);
          onChange?.(values, combined);
          
          if (validateEvent === 'change') {
            validateFields();
          }
        }, 0);
        
        return updated;
      });
    }, [separator, onChange, validateEvent, validateFields]);

    // Handle add section
    const handleAddSection = useCallback((initialValue: string = '') => {
      if (maxFields && fields.length >= maxFields) {
        return '';
      }

      const newFieldId = generateFieldId();
      const newField: AvakioMultitextField = {
        id: newFieldId,
        value: initialValue,
        isPrimary: false,
      };

      setFields(prev => [...prev, newField]);
      
      // Focus the new field after render
      setTimeout(() => {
        inputRefs.current.get(newFieldId)?.focus();
      }, 50);

      onSectionAdd?.(newFieldId, fields.length);
      
      // Trigger onChange
      setTimeout(() => {
        const values = [...fields.map(f => f.value), initialValue];
        const combined = values.filter(v => v).join(separator);
        onChange?.(values, combined);
      }, 0);

      return newFieldId;
    }, [fields, maxFields, separator, onChange, onSectionAdd]);

    // Handle remove section
    const handleRemoveSection = useCallback((fieldId?: string) => {
      setFields(prev => {
        // If no fieldId, remove the last non-primary field
        const targetId = fieldId || prev.filter(f => !f.isPrimary).pop()?.id;
        if (!targetId) return prev;

        const fieldToRemove = prev.find(f => f.id === targetId);
        if (!fieldToRemove || fieldToRemove.isPrimary) return prev;

        const updated = prev.filter(f => f.id !== targetId);
        
        onSectionRemove?.(targetId, fieldToRemove.value);
        
        // Trigger onChange
        setTimeout(() => {
          const values = updated.map(f => f.value);
          const combined = values.filter(v => v).join(separator);
          onChange?.(values, combined);
        }, 0);

        return updated;
      });
    }, [separator, onChange, onSectionRemove]);

    // Handle key press
    const handleKeyPress = useCallback((fieldId: string, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const field = fields.find(f => f.id === fieldId);
        if (field) {
          onEnter?.(fieldId, field.value);
        }
      }
    }, [fields, onEnter]);

    // Handle focus
    const handleFocus = useCallback((fieldId: string, e: React.FocusEvent<HTMLInputElement>) => {
      onFocus?.(fieldId, e);
    }, [onFocus]);

    // Handle blur
    const handleBlur = useCallback((fieldId: string, e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(fieldId, e);
      
      if (validateEvent === 'blur') {
        validateFields();
      }
    }, [onBlur, validateEvent, validateFields]);

    // Expose imperative methods
    useImperativeHandle(ref, () => ({
      getValue: () => getCombinedValue(),
      getValues: () => getValuesArray(),
      setValue: (val: string | string[]) => {
        setFields(parseValue(val));
      },
      getValueHere: () => fields[0]?.value || '',
      setValueHere: (val: string) => {
        setFields(prev => {
          const updated = [...prev];
          if (updated[0]) {
            updated[0] = { ...updated[0], value: val };
          }
          return updated;
        });
      },
      addSection: (val?: string) => handleAddSection(val || ''),
      removeSection: (fieldId?: string) => handleRemoveSection(fieldId),
      getFieldIds: () => fields.map(f => f.id),
      getField: (fieldId: string) => fields.find(f => f.id === fieldId),
      getFieldCount: () => fields.length,
      clearAdditional: () => {
        setFields(prev => {
          const primary = prev.find(f => f.isPrimary);
          return primary ? [primary] : [{ id: generateFieldId(), value: '', isPrimary: true }];
        });
      },
      clear: () => {
        setFields([{ id: generateFieldId(), value: '', isPrimary: true }]);
      },
      focus: () => {
        const primaryField = fields.find(f => f.isPrimary);
        if (primaryField) {
          inputRefs.current.get(primaryField.id)?.focus();
        }
      },
      focusField: (fieldId: string) => {
        inputRefs.current.get(fieldId)?.focus();
      },
      blur: () => {
        inputRefs.current.forEach(input => input.blur());
      },
      refresh: () => setRefreshKey(k => k + 1),
      enable: () => setIsDisabled(false),
      disable: () => setIsDisabled(true),
      isEnabled: () => !isDisabled,
      hide: () => setIsVisible(false),
      show: () => setIsVisible(true),
      isVisible: () => isVisible,
      validate: () => validateFields(),
      getNode: () => containerRef.current,
    }), [fields, getCombinedValue, getValuesArray, parseValue, handleAddSection, handleRemoveSection, isDisabled, isVisible, validateFields]);

    // Build class names
    const containerClasses = [
      'avakio-multitext',
      `avakio-multitext--${theme}`,
      `avakio-multitext--label-${labelPosition}`,
      isDisabled && 'avakio-multitext--disabled',
      readonly && 'avakio-multitext--readonly',
      isInvalid && 'avakio-multitext--invalid',
      !isVisible && 'avakio-multitext--hidden',
      className,
    ].filter(Boolean).join(' ');

    // Build container styles
    const containerStyles: React.CSSProperties = {
      ...(css && typeof css === 'object' && !Array.isArray(css) ? css : {}),
      width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
      height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
      minWidth: minWidth ? (typeof minWidth === 'number' ? `${minWidth}px` : minWidth) : undefined,
      maxWidth: maxWidth ? (typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth) : undefined,
    };

    const canAddMore = !maxFields || fields.length < maxFields;

    if (!isVisible) {
      return null;
    }

    return (
      <div
        ref={containerRef}
        id={id}
        data-testid={testId}
        className={containerClasses}
        style={containerStyles}
        data-admin-theme={theme}
        key={refreshKey}
      >
        {/* Label */}
        {label && (
          <label 
            className="avakio-multitext__label"
            style={{ 
              width: labelPosition === 'left' ? `${labelWidth}px` : undefined,
              textAlign: labelAlign,
            }}
          >
            {label}
            {required && <span className="avakio-multitext__required">*</span>}
          </label>
        )}

        {/* Fields container */}
        <div className="avakio-multitext__fields">
          {fields.map((field, index) => (
            <div key={field.id} className="avakio-multitext__field-row">
              {/* Line number */}
              {showNumbers && (
                <span className="avakio-multitext__field-number">{index + 1}.</span>
              )}

              {/* Input */}
              <div className="avakio-multitext__input-wrapper">
                <input
                  ref={(el) => {
                    if (el) {
                      inputRefs.current.set(field.id, el);
                    } else {
                      inputRefs.current.delete(field.id);
                    }
                  }}
                  type="text"
                  name={name ? `${name}[${index}]` : undefined}
                  value={field.value}
                  placeholder={field.isPrimary ? placeholder : (subConfig?.placeholder || placeholder)}
                  disabled={isDisabled || field.disabled || (field.isPrimary ? false : subConfig?.disabled)}
                  readOnly={readonly}
                  maxLength={field.isPrimary ? maxLength : (subConfig?.maxLength || maxLength)}
                  pattern={field.isPrimary ? pattern : (subConfig?.pattern || pattern)}
                  autoComplete={autoComplete}
                  className="avakio-multitext__input"
                  style={{ 
                    textAlign: inputAlign,
                    width: inputWidth ? `${inputWidth}px` : undefined,
                  }}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  onKeyPress={(e) => handleKeyPress(field.id, e)}
                  onFocus={(e) => handleFocus(field.id, e)}
                  onBlur={(e) => handleBlur(field.id, e)}
                  aria-invalid={isInvalid}
                  aria-describedby={isInvalid ? `${id}-error` : undefined}
                />

                {/* Add button (only on primary) */}
                {field.isPrimary && !readonly && canAddMore && (
                  <button
                    type="button"
                    className="avakio-multitext__add-btn"
                    onClick={() => handleAddSection()}
                    disabled={isDisabled}
                    title={addButtonTooltip}
                    style={{ width: iconWidth ? `${iconWidth}px` : undefined }}
                    aria-label={addButtonLabel || 'Add field'}
                  >
                    {icon || <Plus size={16} />}
                    {addButtonLabel && (
                      <span className="avakio-multitext__add-btn-label">{addButtonLabel}</span>
                    )}
                  </button>
                )}

                {/* Remove button (only on non-primary) */}
                {!field.isPrimary && !readonly && (
                  <button
                    type="button"
                    className="avakio-multitext__remove-btn"
                    onClick={() => handleRemoveSection(field.id)}
                    disabled={isDisabled}
                    title="Remove field"
                    aria-label="Remove field"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Bottom label */}
          {bottomLabel && (
            <div className="avakio-multitext__bottom-label">{bottomLabel}</div>
          )}

          {/* Error message */}
          {isInvalid && validationMessage && (
            <div id={`${id}-error`} className="avakio-multitext__error" role="alert">
              {validationMessage}
            </div>
          )}
        </div>
      </div>
    );
  }
);

AvakioMultitext.displayName = 'AvakioMultitext';

export default AvakioMultitext;











