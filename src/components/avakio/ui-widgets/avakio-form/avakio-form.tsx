import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useCallback,
  useEffect,
  ReactNode,
  CSSProperties,
} from 'react';
import { AvakioChangeEvent } from '../../base/avakio-base-props';
import './avakio-form.css';

// ============================================================================
// Types and Interfaces
// ============================================================================

export type AvakioFormTheme = 'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset';

/** Validation rule function - returns true if valid, false or error message if invalid */
export type ValidationRule<T = any> = (value: T, name: string, values: FormValues) => boolean | string;

/** Built-in validation rules */
export const FormRules = {
  /** Field is required (not empty) */
  isRequired: (value: any) => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    return true;
  },
  /** Must be a valid email */
  isEmail: (value: any) => {
    if (!value) return true; // Allow empty - combine with isRequired if needed
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(String(value));
  },
  /** Must be a valid number */
  isNumber: (value: any) => {
    if (!value && value !== 0) return true;
    return !isNaN(Number(value));
  },
  /** Must be a positive number */
  isPositive: (value: any) => {
    if (!value && value !== 0) return true;
    const num = Number(value);
    return !isNaN(num) && num > 0;
  },
  /** Must be an integer */
  isInteger: (value: any) => {
    if (!value && value !== 0) return true;
    return Number.isInteger(Number(value));
  },
  /** Must match given regex pattern */
  pattern: (regex: RegExp) => (value: any) => {
    if (!value) return true;
    return regex.test(String(value));
  },
  /** Minimum length */
  minLength: (min: number) => (value: any) => {
    if (!value) return true;
    return String(value).length >= min;
  },
  /** Maximum length */
  maxLength: (max: number) => (value: any) => {
    if (!value) return true;
    return String(value).length <= max;
  },
  /** Minimum value (for numbers) */
  minValue: (min: number) => (value: any) => {
    if (!value && value !== 0) return true;
    return Number(value) >= min;
  },
  /** Maximum value (for numbers) */
  maxValue: (max: number) => (value: any) => {
    if (!value && value !== 0) return true;
    return Number(value) <= max;
  },
  /** Custom validation function */
  custom: (fn: (value: any) => boolean | string) => fn,
};

/** Form values object */
export type FormValues = Record<string, any>;

/** Validation rules configuration */
export type FormValidationRules = Record<string, ValidationRule | ValidationRule[]>;

/** Validation errors object */
export type FormErrors = Record<string, string | undefined>;

/** Form element configuration */
export interface FormElement {
  /** Unique name for the element - used for value binding */
  name?: string;
  /** Form control component */
  view?: ReactNode;
  /** Nested columns layout */
  cols?: FormElement[];
  /** Nested rows layout */
  rows?: FormElement[];
  /** Element label (for section headers) */
  label?: string;
  /** Element type - 'section' for section headers */
  type?: 'section' | 'clean';
  /** CSS class */
  css?: string;
  /** Width */
  width?: number | string;
  /** Height */
  height?: number | string;
  /** Gravity (flex grow) */
  gravity?: number;
  /** Padding */
  padding?: number | string;
  /** Margin */
  margin?: number | string;
  /** Hidden */
  hidden?: boolean;
  /** Disabled */
  disabled?: boolean;
  /** Batch name for visibility toggling */
  batch?: string;
}

export interface AvakioFormProps {
  /** Child elements (React children) */
  children?: ReactNode;
  /** Form elements configuration (alternative to children) */
  elements?: FormElement[];
  /** Initial form values */
  values?: FormValues;
  /** Default values (used by getCleanValues and isDirty) */
  defaultValues?: FormValues;
  /** Validation rules */
  rules?: FormValidationRules;
  /** Whether to parse complex data (dot notation in names) */
  complexData?: boolean;
  /** Auto height based on content */
  autoHeight?: boolean;
  /** Remove borders */
  borderless?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Width */
  width?: number | string;
  /** Height */
  height?: number | string;
  /** Min width */
  minWidth?: number | string;
  /** Max width */
  maxWidth?: number | string;
  /** Min height */
  minHeight?: number | string;
  /** Max height */
  maxHeight?: number | string;
  /** Padding (applies to all sides) */
  padding?: number | string;
  /** Horizontal padding */
  paddingX?: number | string;
  /** Vertical padding */
  paddingY?: number | string;
  /** Margin between elements */
  margin?: number | string;
  /** Enable scroll */
  scroll?: boolean | 'x' | 'y' | 'xy';
  /** Layout type */
  type?: 'clean' | 'line' | 'wide' | 'space' | 'form';
  /** Theme variant */
  theme?: AvakioFormTheme;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: CSSProperties;
  /** Currently visible batch */
  visibleBatch?: string;
  /** Callback fired when a form field value changes. Receives { id: fieldName, value, values } */
  onChange?: (event: AvakioChangeEvent<any> & { values: FormValues }) => void;
  /** Callback after validation */
  onValidation?: (isValid: boolean, errors: FormErrors) => void;
  /** Callback on validation error */
  onValidationError?: (name: string, error: string) => void;
  /** Callback on validation success */
  onValidationSuccess?: (name: string) => void;
  /** Callback when form is submitted (Enter pressed) */
  onSubmit?: (values: FormValues) => void;
  /** Callback when values are set */
  onValues?: (values: FormValues) => void;
}

export interface AvakioFormRef {
  /** Get the DOM node */
  getNode: () => HTMLFormElement | null;
  /** Get all form values */
  getValues: () => FormValues;
  /** Set form values */
  setValues: (values: FormValues, updateDirty?: boolean) => void;
  /** Get clean (unchanged) values */
  getCleanValues: () => FormValues;
  /** Get dirty (changed) values */
  getDirtyValues: () => FormValues;
  /** Check if form has changes */
  isDirty: () => boolean;
  /** Set dirty state */
  setDirty: (dirty: boolean) => void;
  /** Validate the form */
  validate: () => boolean;
  /** Clear validation errors */
  clearValidation: () => void;
  /** Mark a field as invalid */
  markInvalid: (name: string, message?: string) => void;
  /** Clear all form values */
  clear: () => void;
  /** Focus a specific field or first field */
  focus: (name?: string) => void;
  /** Check if form is enabled */
  isEnabled: () => boolean;
  /** Enable the form */
  enable: () => void;
  /** Disable the form */
  disable: () => void;
  /** Show a batch of elements */
  showBatch: (batchName: string) => void;
  /** Get validation errors */
  getErrors: () => FormErrors;
}

// ============================================================================
// Form Context
// ============================================================================

interface FormContextValue {
  values: FormValues;
  errors: FormErrors;
  disabled: boolean;
  onChange: (name: string, value: any) => void;
  registerField: (name: string, element: HTMLElement | null) => void;
  unregisterField: (name: string) => void;
}

const FormContext = React.createContext<FormContextValue | null>(null);

export const useFormContext = () => {
  const context = React.useContext(FormContext);
  return context;
};

// ============================================================================
// Helper Functions
// ============================================================================

/** Parse dot notation path and set value in object */
function setNestedValue(obj: FormValues, path: string, value: any): FormValues {
  const keys = path.split('.');
  const result = { ...obj };
  let current: any = result;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    current[key] = current[key] ? { ...current[key] } : {};
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
  return result;
}

/** Get nested value from object using dot notation */
function getNestedValue(obj: FormValues, path: string): any {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

/** Flatten nested object to dot notation keys */
function flattenObject(obj: any, prefix = ''): FormValues {
  const result: FormValues = {};

  for (const key in obj) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key]) && !(obj[key] instanceof Date)) {
      Object.assign(result, flattenObject(obj[key], newKey));
    } else {
      result[newKey] = obj[key];
    }
  }

  return result;
}

// ============================================================================
// Main Component
// ============================================================================

export const AvakioForm = forwardRef<AvakioFormRef, AvakioFormProps>((props, ref) => {
  const {
    children,
    elements,
    values: initialValues = {},
    defaultValues: initialDefaultValues,
    rules = {},
    complexData = false,
    autoHeight = false,
    borderless = false,
    disabled: initialDisabled = false,
    width,
    height,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    padding,
    paddingX,
    paddingY,
    margin,
    scroll,
    type = 'form',
    theme,
    className,
    style,
    visibleBatch: initialVisibleBatch,
    onChange,
    onValidation,
    onValidationError,
    onValidationSuccess,
    onSubmit,
    onValues,
  } = props;

  const formRef = useRef<HTMLFormElement>(null);
  const fieldsRef = useRef<Map<string, HTMLElement | null>>(new Map());
  
  const [values, setValues] = useState<FormValues>(() => {
    if (complexData) {
      return flattenObject(initialValues);
    }
    return { ...initialValues };
  });
  
  const [defaultValues, setDefaultValues] = useState<FormValues>(() => {
    const defaults = initialDefaultValues || initialValues;
    if (complexData) {
      return flattenObject(defaults);
    }
    return { ...defaults };
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [disabled, setDisabled] = useState(initialDisabled);
  const [dirty, setDirtyState] = useState(false);
  const [visibleBatch, setVisibleBatch] = useState<string | undefined>(initialVisibleBatch);

  // Update disabled when prop changes
  useEffect(() => {
    setDisabled(initialDisabled);
  }, [initialDisabled]);

  // Handle field value change
  const handleChange = useCallback((name: string, value: any) => {
    setValues(prev => {
      const newValues = complexData 
        ? setNestedValue(prev, name, value)
        : { ...prev, [name]: value };
      
      // Trigger onChange callback
      onChange?.({ id: id || '0', value: newValues, fieldName: name, fieldValue: value });
      
      return newValues;
    });
    
    // Mark as dirty
    setDirtyState(true);
    
    // Clear error for this field
    setErrors(prev => {
      if (prev[name]) {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      }
      return prev;
    });
  }, [complexData, onChange]);

  // Register field reference
  const registerField = useCallback((name: string, element: HTMLElement | null) => {
    if (element) {
      fieldsRef.current.set(name, element);
    }
  }, []);

  // Unregister field reference
  const unregisterField = useCallback((name: string) => {
    fieldsRef.current.delete(name);
  }, []);

  // Validate a single field
  const validateField = useCallback((name: string, value: any): string | undefined => {
    const fieldRules = rules[name];
    if (!fieldRules) return undefined;

    const rulesArray = Array.isArray(fieldRules) ? fieldRules : [fieldRules];
    
    for (const rule of rulesArray) {
      const result = rule(value, name, values);
      if (result === false) {
        return 'Invalid value';
      }
      if (typeof result === 'string') {
        return result;
      }
    }
    
    return undefined;
  }, [rules, values]);

  // Validate all fields
  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    for (const name in rules) {
      const value = complexData ? getNestedValue(values, name) : values[name];
      const error = validateField(name, value);
      
      if (error) {
        newErrors[name] = error;
        isValid = false;
        onValidationError?.(name, error);
      } else {
        onValidationSuccess?.(name);
      }
    }

    setErrors(newErrors);
    onValidation?.(isValid, newErrors);
    
    return isValid;
  }, [rules, values, complexData, validateField, onValidation, onValidationError, onValidationSuccess]);

  // Get values (with complex data reconstruction if needed)
  const getFormValues = useCallback((): FormValues => {
    if (!complexData) return { ...values };
    
    // Reconstruct nested object from flat values
    const result: FormValues = {};
    for (const key in values) {
      if (key.includes('.')) {
        const keys = key.split('.');
        let current = result;
        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) current[keys[i]] = {};
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = values[key];
      } else {
        result[key] = values[key];
      }
    }
    return result;
  }, [values, complexData]);

  // Set form values
  const setFormValues = useCallback((newValues: FormValues, updateDirty = true) => {
    const processedValues = complexData ? flattenObject(newValues) : { ...newValues };
    setValues(processedValues);
    
    if (updateDirty) {
      setDefaultValues(processedValues);
      setDirtyState(false);
    }
    
    onValues?.(newValues);
  }, [complexData, onValues]);

  // Get clean (unchanged) values
  const getCleanValues = useCallback((): FormValues => {
    const result: FormValues = {};
    for (const key in values) {
      if (values[key] === defaultValues[key]) {
        result[key] = values[key];
      }
    }
    return result;
  }, [values, defaultValues]);

  // Get dirty (changed) values
  const getDirtyValues = useCallback((): FormValues => {
    const result: FormValues = {};
    for (const key in values) {
      if (values[key] !== defaultValues[key]) {
        result[key] = values[key];
      }
    }
    return result;
  }, [values, defaultValues]);

  // Check if form is dirty
  const isDirty = useCallback((): boolean => {
    for (const key in values) {
      if (values[key] !== defaultValues[key]) {
        return true;
      }
    }
    return false;
  }, [values, defaultValues]);

  // Clear validation
  const clearValidation = useCallback(() => {
    setErrors({});
  }, []);

  // Mark field invalid
  const markInvalid = useCallback((name: string, message = 'Invalid value') => {
    setErrors(prev => ({ ...prev, [name]: message }));
  }, []);

  // Clear form
  const clear = useCallback(() => {
    setValues({});
    setErrors({});
    setDirtyState(false);
  }, []);

  // Focus field
  const focus = useCallback((name?: string) => {
    if (name) {
      const field = fieldsRef.current.get(name);
      if (field) {
        const input = field.querySelector('input, textarea, select, [tabindex]') as HTMLElement;
        (input || field).focus();
      }
    } else {
      // Focus first field
      const firstField = fieldsRef.current.values().next().value;
      if (firstField) {
        const input = firstField.querySelector('input, textarea, select, [tabindex]') as HTMLElement;
        (input || firstField).focus();
      }
    }
  }, []);

  // Handle form submit
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit?.(getFormValues());
    }
  }, [validate, onSubmit, getFormValues]);

  // Handle keydown for submit on Enter
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      const target = e.target as HTMLElement;
      // Don't submit if in textarea
      if (target.tagName !== 'TEXTAREA') {
        // Check if there's an explicit submit button
        const form = formRef.current;
        if (form) {
          const submitButton = form.querySelector('button[type="submit"]');
          if (!submitButton) {
            e.preventDefault();
            if (validate()) {
              onSubmit?.(getFormValues());
            }
          }
        }
      }
    }
  }, [validate, onSubmit, getFormValues]);

  // Expose ref methods
  useImperativeHandle(ref, () => ({
    getNode: () => formRef.current,
    getValues: getFormValues,
    setValues: setFormValues,
    getCleanValues,
    getDirtyValues,
    isDirty,
    setDirty: setDirtyState,
    validate,
    clearValidation,
    markInvalid,
    clear,
    focus,
    isEnabled: () => !disabled,
    enable: () => setDisabled(false),
    disable: () => setDisabled(true),
    showBatch: setVisibleBatch,
    getErrors: () => ({ ...errors }),
  }), [
    getFormValues,
    setFormValues,
    getCleanValues,
    getDirtyValues,
    isDirty,
    validate,
    clearValidation,
    markInvalid,
    clear,
    focus,
    disabled,
    errors,
  ]);

  // Build style object
  const formStyle: CSSProperties = {
    ...style,
    width: typeof width === 'number' ? `${width}px` : width,
    height: autoHeight ? 'auto' : (typeof height === 'number' ? `${height}px` : height),
    minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth,
    maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
    minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
    maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
  };

  // Build padding styles
  if (padding !== undefined) {
    formStyle.padding = typeof padding === 'number' ? `${padding}px` : padding;
  }
  if (paddingX !== undefined) {
    const px = typeof paddingX === 'number' ? `${paddingX}px` : paddingX;
    formStyle.paddingLeft = px;
    formStyle.paddingRight = px;
  }
  if (paddingY !== undefined) {
    const py = typeof paddingY === 'number' ? `${paddingY}px` : paddingY;
    formStyle.paddingTop = py;
    formStyle.paddingBottom = py;
  }

  // Build class names
  const classNames = [
    'avakio-form',
    `avakio-form--type-${type}`,
    borderless && 'avakio-form--borderless',
    disabled && 'avakio-form--disabled',
    scroll === true && 'avakio-form--scroll',
    scroll === 'x' && 'avakio-form--scroll-x',
    scroll === 'y' && 'avakio-form--scroll-y',
    scroll === 'xy' && 'avakio-form--scroll',
    theme && `avakio-form--theme-${theme}`,
    className,
  ].filter(Boolean).join(' ');

  // Context value
  const contextValue: FormContextValue = {
    values,
    errors,
    disabled,
    onChange: handleChange,
    registerField,
    unregisterField,
  };

  // Render elements from configuration
  const renderElement = (element: FormElement, index: number): ReactNode => {
    if (element.hidden) return null;
    
    // Check batch visibility
    if (element.batch && visibleBatch && element.batch !== visibleBatch) {
      return null;
    }

    // Section header
    if (element.type === 'section') {
      return (
        <div key={index} className="avakio-form__section">
          <div className="avakio-form__section-header">
            {element.label}
          </div>
        </div>
      );
    }

    // Columns layout
    if (element.cols) {
      const colStyle: CSSProperties = {};
      if (element.margin !== undefined) {
        colStyle.gap = typeof element.margin === 'number' ? `${element.margin}px` : element.margin;
      }
      
      return (
        <div 
          key={index} 
          className={`avakio-form__cols ${element.css || ''}`}
          style={colStyle}
        >
          {element.cols.map((col, colIndex) => renderElement(col, colIndex))}
        </div>
      );
    }

    // Rows layout
    if (element.rows) {
      const rowStyle: CSSProperties = {};
      if (element.margin !== undefined) {
        rowStyle.gap = typeof element.margin === 'number' ? `${element.margin}px` : element.margin;
      }
      
      return (
        <div 
          key={index} 
          className={`avakio-form__rows ${element.css || ''}`}
          style={rowStyle}
        >
          {element.rows.map((row, rowIndex) => renderElement(row, rowIndex))}
        </div>
      );
    }

    // Single element with view
    if (element.view) {
      const elementStyle: CSSProperties = {};
      if (element.width !== undefined) {
        elementStyle.width = typeof element.width === 'number' ? `${element.width}px` : element.width;
      }
      if (element.height !== undefined) {
        elementStyle.height = typeof element.height === 'number' ? `${element.height}px` : element.height;
      }
      if (element.gravity !== undefined) {
        elementStyle.flex = element.gravity;
      }
      if (element.padding !== undefined) {
        elementStyle.padding = typeof element.padding === 'number' ? `${element.padding}px` : element.padding;
      }

      return (
        <div 
          key={index} 
          className={`avakio-form__element ${element.css || ''}`}
          style={elementStyle}
        >
          {element.view}
        </div>
      );
    }

    return null;
  };

  // Render form elements with margin
  const contentStyle: CSSProperties = {};
  if (margin !== undefined) {
    contentStyle.gap = typeof margin === 'number' ? `${margin}px` : margin;
  }

  return (
    <FormContext.Provider value={contextValue}>
      <form
        ref={formRef}
        className={classNames}
        style={formStyle}
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
        data-admin-theme={theme}
      >
        <div className="avakio-form__content" style={contentStyle}>
          {elements ? elements.map((el, i) => renderElement(el, i)) : children}
        </div>
      </form>
    </FormContext.Provider>
  );
});

AvakioForm.displayName = 'AvakioForm';

// ============================================================================
// Form Field Wrapper Component
// ============================================================================

export interface AvakioFormFieldProps {
  /** Field name - must match a key in form values */
  name: string;
  /** The form control component */
  children: ReactNode;
  /** Custom render function for more control */
  render?: (props: {
    value: any;
    error?: string;
    onChange: (value: any) => void;
    disabled: boolean;
  }) => ReactNode;
}

export const AvakioFormField: React.FC<AvakioFormFieldProps> = ({ name, children, render }) => {
  const context = useFormContext();
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (context && fieldRef.current) {
      context.registerField(name, fieldRef.current);
      return () => context.unregisterField(name);
    }
  }, [context, name]);

  if (!context) {
    // Render without form context
    return <div ref={fieldRef} className="avakio-form__field">{children}</div>;
  }

  const { values, errors, disabled, onChange } = context;
  const value = values[name];
  const error = errors[name];

  const handleChange = (newValue: any) => {
    onChange(name, newValue);
  };

  if (render) {
    return (
      <div ref={fieldRef} className="avakio-form__field">
        {render({ value, error, onChange: handleChange, disabled })}
      </div>
    );
  }

  // Clone children and inject props
  const enhancedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<any>, {
        value,
        error,
        onChange: handleChange,
        disabled: disabled || (child.props as any).disabled,
        invalid: !!error,
        invalidMessage: error,
      });
    }
    return child;
  });

  return (
    <div ref={fieldRef} className="avakio-form__field">
      {enhancedChildren}
    </div>
  );
};

export default AvakioForm;











