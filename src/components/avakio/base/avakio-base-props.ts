import React, { useRef, useState, useCallback, useImperativeHandle } from 'react';

/**
 * Base props interface for all Avakio form components.
 * Extend this interface to create component-specific props.
 */
export interface AvakioBaseProps {
  /** The alignment of the control within the parent container */
  align?: 'left' | 'center' | 'right';
  
  /** Used to hide the component borders */
  borderless?: boolean;
  
  /** Sets a label under the control */
  bottomLabel?: string;
  
  /** Sets the bottom offset of the control input */
  bottomPadding?: number;
  
  /** Whether the value can be cleared (displays X icon) */
  clearable?: boolean;
  
  /** Additional CSS class name */
  className?: string;
  
  /** Whether the component is disabled */
  disabled?: boolean;
  
  /** Sets the height of the component */
  height?: number | string;
  
  /** Whether the component is hidden */
  hidden?: boolean;
  
  /** ID of the component */
  id?: string;
  
  /** Test ID for testing purposes */
  testId?: string;
  
  /** The alignment of an input inside its container */
  inputAlign?: 'left' | 'right';
  
  /** The height of the input area, or a button's text value area */
  inputHeight?: number | string;
  
  /** The width of the input area, or a button's text value area */
  inputWidth?: number | string;
  
  /** Specifies whether the control is valid/invalid after validation */
  invalid?: boolean;
  
  /** Sets the text of a validation message */
  invalidMessage?: string;
  
  /** Sets the text of the label */
  label?: string;
  
  /** The alignment of a label inside its container */
  labelAlign?: 'left' | 'right' | 'center';
  
  /** Positions a label in relation to the control */
  labelPosition?: 'top' | 'left' | 'right';
  
  /** The width of the label */
  labelWidth?: number | string;
  
  /** Sets the minimal height for the view */
  minHeight?: number | string;
  
  /** Sets the minimal width for the view */
  minWidth?: number | string;
  
  /** Sets the maximum height for the view */
  maxHeight?: number | string;
  
  /** Sets the maximum width for the view */
  maxWidth?: number | string;
  
  /** Placeholder text for the input */
  placeholder?: string;
  
  /** Configures readonly mode for the input */
  readonly?: boolean;
  
  /** Marks field as required */
  required?: boolean;
  
  /** Custom inline styles */
  style?: React.CSSProperties;
  
  /** Sets a popup message next to the component input when cursor points to it */
  tooltip?: string;
  
  /** Sets the width of a component */
  width?: number | string;

  // ===== EVENT HANDLERS =====
  
  /** Occurs immediately after the component has been rendered */
  onAfterRender?: () => void;
  
  /** Occurs when the view has been scrolled */
  onAfterScroll?: (scrollTop: number, scrollLeft: number) => void;
  
  /** Occurs immediately before the component has been rendered */
  onBeforeRender?: () => void;
  
  /** Fires when focus is moved out of the view */
  onBlur?: (event: React.FocusEvent) => void;
  
  /** Fires when a view gets focus */
  onFocus?: (event: React.FocusEvent) => void;
  
  /** Fires after the control has been clicked */
  onItemClick?: (event: React.MouseEvent) => void;
  
  /** Fires when any hidden view is shown */
  onViewShow?: () => void;
  
  /** Fires when the size of a view has been changed by resizer */
  onViewResize?: (width: number, height: number) => void;
  
  /** Occurs when keyboard key is pressed for the control in focus */
  onKeyPress?: (event: React.KeyboardEvent) => void;
}

/**
 * Base props with value and onChange for controlled components.
 * @template T The type of the value
 */
export interface AvakioControlledProps<T = string> extends AvakioBaseProps {
  /** The current value of the control */
  value?: T;
  
  /** Callback fired when the value changes. Receives new value and optionally the old value */
  onChange?: (newValue: T, oldValue?: T) => void;
  
  /** Adds validation to the field. Return true if valid, false or error message if invalid */
  validate?: (value: T) => boolean | string;
}

/**
 * Default values for base props
 */
export const AVAKIO_BASE_DEFAULTS = {
  align: 'left' as const,
  borderless: false,
  bottomPadding: 0,
  clearable: false,
  disabled: false,
  height: 38,
  hidden: false,
  inputAlign: 'left' as const,
  labelAlign: 'left' as const,
  labelPosition: 'left' as const,
  labelWidth: 80,
  readonly: false,
  required: false,
} as const;

/**
 * Helper to convert spacing values to CSS string
 */
export const formatSpacing = (
  spacing: string | number | [number, number, number, number] | undefined
): string | undefined => {
  if (spacing === undefined) return undefined;
  if (typeof spacing === 'string') return spacing;
  if (typeof spacing === 'number') return `${spacing}px`;
  if (Array.isArray(spacing)) return spacing.map(v => `${v}px`).join(' ');
  return undefined;
};

/**
 * Helper to convert size values to CSS string
 */
export const formatSize = (size: number | string | undefined): string | undefined => {
  if (size === undefined) return undefined;
  if (typeof size === 'number') return `${size}px`;
  return size;
};

/**
 * Compute base styles from props
 */
export const computeBaseStyles = (props: AvakioBaseProps): React.CSSProperties => {
  const {
    align,
    bottomPadding,
    height,
    hidden,
    inputHeight,
    inputWidth,
    minHeight,
    minWidth,
    maxHeight,
    maxWidth,
    width,
    style,
  } = props;

  return {
    ...style,
    display: hidden ? 'none' : undefined,
    height: formatSize(height),
    width: formatSize(width),
    minHeight: formatSize(minHeight),
    minWidth: formatSize(minWidth),
    maxHeight: formatSize(maxHeight),
    maxWidth: formatSize(maxWidth),
    paddingBottom: bottomPadding ? `${bottomPadding}px` : undefined,
    justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : undefined,
  };
};

/**
 * Compute label styles from props
 */
export const computeLabelStyles = (props: AvakioBaseProps): React.CSSProperties => {
  const { labelWidth, labelAlign } = props;
  
  return {
    width: formatSize(labelWidth),
    textAlign: labelAlign,
  };
};

/**
 * Compute input styles from props
 */
export const computeInputStyles = (props: AvakioBaseProps): React.CSSProperties => {
  const { inputHeight, inputWidth, inputAlign } = props;
  
  return {
    height: formatSize(inputHeight),
    width: formatSize(inputWidth),
    textAlign: inputAlign,
  };
};

/**
 * Ref interface exposing imperative methods for Avakio components.
 * Use with forwardRef to expose these methods to parent components.
 * @template T The type of the component's value
 */
export interface AvakioBaseRef<T = string> {
  /** Removes focus from the control */
  blur: () => void;
  
  /** Redefines a single configuration property or multiple properties */
  define: (config: Partial<AvakioBaseProps> | string, value?: unknown) => void;
  
  /** Disables the component (makes it dimmed and unclickable) */
  disable: () => void;
  
  /** Enables the component that was disabled */
  enable: () => void;
  
  /** Sets focus to the control */
  focus: () => void;
  
  /** Returns the parent view/element of the component */
  getParentView: () => HTMLElement | null;
  
  /** Gets actual text value from the control input */
  getText: () => string;
  
  /** Returns the current value of the control */
  getValue: () => T | undefined;
  
  /** Hides the component */
  hide: () => void;
  
  /** Checks whether the component is enabled */
  isEnabled: () => boolean;
  
  /** Checks whether the component is visible */
  isVisible: () => boolean;
  
  /** Sets a new value for the component */
  setValue: (value: T) => void;
  
  /** Makes the component visible */
  show: () => void;
  
  /** Validates the value of the input. Returns true if valid, false or error message if invalid */
  validate: () => boolean | string;
  
  /** Returns the root DOM element of the component */
  getElement: () => HTMLElement | null;
}

/**
 * Internal state managed by useAvakioBase hook
 */
export interface AvakioBaseState {
  isDisabled: boolean;
  isHidden: boolean;
  config: Partial<AvakioBaseProps>;
}

/**
 * Options for useAvakioBase hook
 */
export interface UseAvakioBaseOptions<T = string> {
  /** Initial value */
  initialValue?: T;
  /** Value change handler - receives newValue and oldValue */
  onChange?: (newValue: T, oldValue?: T) => void;
  /** Validation function */
  validate?: (value: T) => boolean | string;
  /** Initial disabled state from props */
  disabled?: boolean;
  /** Initial hidden state from props */
  hidden?: boolean;
  /** Function to get text representation of value */
  getTextValue?: (value: T | undefined) => string;
  
  // Event handlers
  /** Occurs immediately after the component has been rendered */
  onAfterRender?: () => void;
  /** Occurs when the view has been scrolled */
  onAfterScroll?: (scrollTop: number, scrollLeft: number) => void;
  /** Occurs immediately before the component has been rendered */
  onBeforeRender?: () => void;
  /** Fires when focus is moved out of the view */
  onBlur?: (event: React.FocusEvent) => void;
  /** Fires when a view gets focus */
  onFocus?: (event: React.FocusEvent) => void;
  /** Fires after the control has been clicked */
  onItemClick?: (event: React.MouseEvent) => void;
  /** Fires when any hidden view is shown */
  onViewShow?: () => void;
  /** Fires when the size of a view has been changed by resizer */
  onViewResize?: (width: number, height: number) => void;
  /** Occurs when keyboard key is pressed for the control in focus */
  onKeyPress?: (event: React.KeyboardEvent) => void;
}

/**
 * Custom hook that provides base functionality for Avakio components.
 * Returns refs, state, and methods to be used by the component.
 * 
 * @example
 * ```tsx
 * const MyComponent = forwardRef<AvakioBaseRef<string>, MyComponentProps>((props, ref) => {
 *   const { rootRef, inputRef, state, methods, getRefMethods } = useAvakioBase({
 *     initialValue: props.value,
 *     onChange: props.onChange,
 *     validate: props.validate,
 *     disabled: props.disabled,
 *     hidden: props.hidden,
 *   });
 *   
 *   useImperativeHandle(ref, () => getRefMethods());
 *   
 *   return <div ref={rootRef}>...</div>;
 * });
 * ```
 */
export function useAvakioBase<T = string>(options: UseAvakioBaseOptions<T> = {}) {
  const {
    initialValue,
    onChange,
    validate: validateFn,
    disabled = false,
    hidden = false,
    getTextValue = (v) => (v !== undefined ? String(v) : ''),
    onAfterRender,
    onBeforeRender,
    onBlur,
    onFocus,
    onItemClick,
    onViewShow,
    onViewResize,
    onKeyPress,
    onAfterScroll,
  } = options;

  // Refs
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const previousValueRef = useRef<T | undefined>(initialValue);
  
  // Internal state
  const [value, setValueState] = useState<T | undefined>(initialValue);
  const [isDisabled, setIsDisabled] = useState(disabled);
  const [isHidden, setIsHidden] = useState(hidden);
  const [config, setConfig] = useState<Partial<AvakioBaseProps>>({});

  // Sync with prop changes
  React.useEffect(() => {
    setIsDisabled(disabled);
  }, [disabled]);

  React.useEffect(() => {
    setIsHidden(hidden);
  }, [hidden]);

  // Lifecycle events
  React.useEffect(() => {
    onBeforeRender?.();
    // After render (using layout effect timing)
    return () => {};
  }, []);

  React.useLayoutEffect(() => {
    onAfterRender?.();
  });

  // Show event - fire when visibility changes from hidden to visible
  React.useEffect(() => {
    if (!isHidden) {
      onViewShow?.();
    }
  }, [isHidden, onViewShow]);

  // Methods
  const blur = useCallback(() => {
    inputRef.current?.blur();
  }, []);

  const focus = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const disable = useCallback(() => {
    setIsDisabled(true);
  }, []);

  const enable = useCallback(() => {
    setIsDisabled(false);
  }, []);

  const hide = useCallback(() => {
    setIsHidden(true);
  }, []);

  const show = useCallback(() => {
    setIsHidden(false);
  }, []);

  const getValue = useCallback(() => {
    return value;
  }, [value]);

  const setValue = useCallback((newValue: T) => {
    const oldValue = previousValueRef.current;
    previousValueRef.current = newValue;
    setValueState(newValue);
    onChange?.(newValue, oldValue);
  }, [onChange]);

  const getText = useCallback(() => {
    return getTextValue(value);
  }, [value, getTextValue]);

  const isEnabled = useCallback(() => {
    return !isDisabled;
  }, [isDisabled]);

  const isVisible = useCallback(() => {
    return !isHidden;
  }, [isHidden]);

  const getParentView = useCallback(() => {
    return rootRef.current?.parentElement ?? null;
  }, []);

  const getElement = useCallback(() => {
    return rootRef.current;
  }, []);

  const define = useCallback((
    configOrKey: Partial<AvakioBaseProps> | string,
    value?: unknown
  ) => {
    if (typeof configOrKey === 'string') {
      setConfig(prev => ({ ...prev, [configOrKey]: value }));
    } else {
      setConfig(prev => ({ ...prev, ...configOrKey }));
    }
  }, []);

  const validate = useCallback(() => {
    if (!validateFn) return true;
    return validateFn(value as T);
  }, [validateFn, value]);

  // Event handler wrappers
  const handleBlur = useCallback((event: React.FocusEvent) => {
    onBlur?.(event);
  }, [onBlur]);

  const handleFocus = useCallback((event: React.FocusEvent) => {
    onFocus?.(event);
  }, [onFocus]);

  const handleClick = useCallback((event: React.MouseEvent) => {
    onItemClick?.(event);
  }, [onItemClick]);

  const handleKeyPress = useCallback((event: React.KeyboardEvent) => {
    onKeyPress?.(event);
  }, [onKeyPress]);

  const handleScroll = useCallback((event: React.UIEvent<HTMLElement>) => {
    const target = event.currentTarget;
    onAfterScroll?.(target.scrollTop, target.scrollLeft);
  }, [onAfterScroll]);

  const handleResize = useCallback((width: number, height: number) => {
    onViewResize?.(width, height);
  }, [onViewResize]);

  // Create ref methods object
  const getRefMethods = useCallback((): AvakioBaseRef<T> => ({
    blur,
    define,
    disable,
    enable,
    focus,
    getParentView,
    getText,
    getValue,
    hide,
    isEnabled,
    isVisible,
    setValue,
    show,
    validate,
    getElement,
  }), [blur, define, disable, enable, focus, getParentView, getText, getValue, hide, isEnabled, isVisible, setValue, show, validate, getElement]);

  return {
    // Refs
    rootRef,
    inputRef,
    previousValueRef,
    
    // State
    value,
    isDisabled,
    isHidden,
    config,
    
    // State setters (for controlled components)
    setValueState,
    setIsDisabled,
    setIsHidden,
    
    // Methods
    methods: {
      blur,
      define,
      disable,
      enable,
      focus,
      getParentView,
      getText,
      getValue,
      hide,
      isEnabled,
      isVisible,
      setValue,
      show,
      validate,
      getElement,
    },
    
    // Event handlers (to be attached to DOM elements)
    eventHandlers: {
      onBlur: handleBlur,
      onFocus: handleFocus,
      onClick: handleClick,
      onKeyPress: handleKeyPress,
      onScroll: handleScroll,
      onResize: handleResize,
    },
    
    // For useImperativeHandle
    getRefMethods,
  };
}

/**
 * Props interface that includes the ref type for components using AvakioBaseRef
 */
export interface AvakioRefProps<T = string> {
  /** Ref to access imperative methods */
  ref?: React.Ref<AvakioBaseRef<T>>;
}
