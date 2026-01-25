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
  
  /** Sets the minimal height for the view */
  minHeight?: number | string;
  
  /** Sets the minimal width for the view */
  minWidth?: number | string;
  
  /** Sets the maximum height for the view */
  maxHeight?: number | string;
  
  /** Sets the maximum width for the view */
  maxWidth?: number | string;
  
  /** Sets the margin around the component. Can be a number, string, or array [top, right, bottom, left] */
  margin?: number | string | [number, number, number, number];
  
  /** Sets the padding inside the component. Can be a number, string, or array [top, right, bottom, left] */
  padding?: number | string | [number, number, number, number];
  
  /** Placeholder text for the input */
  placeholder?: string;
  
  /** Configures readonly mode for the input */
  readonly?: boolean;
  
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
  
  /** Fires when the component is clicked */
  onClick?: () => void;
  
  /** Fires when any hidden view is shown */
  onViewShow?: () => void;
  
  /** Fires when the size of a view has been changed by resizer */
  onViewResize?: (width: number, height: number) => void;
  
  /** Occurs when keyboard key is pressed for the control in focus */
  onKeyPress?: (event: React.KeyboardEvent) => void;
}

/**
 * Change event data passed to onChange callbacks.
 * @template T The type of the value
 */
export interface AvakioChangeEvent<T = string> {
  /** The ID of the component that triggered the change */
  id: string | undefined;
  /** The new value */
  value: T;
  /** The previous value (optional) */
  oldValue?: T;
}

/**
 * Base props with value and onChange for controlled components.
 * @template T The type of the value
 */
export interface AvakioControlledProps<T = string> extends AvakioBaseProps {
  /** The current value of the control */
  value?: T;
  
  /** Callback fired when the value changes. Receives { id, value, oldValue } */
  onChange?: (event: AvakioChangeEvent<T>) => void;
  
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
  readonly: false,
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
 * Helper to compute width accounting for horizontal margins when width is 100%
 */
const computeWidthWithMargin = (
  width: number | string | undefined,
  margin: number | string | [number, number, number, number] | undefined
): string | undefined => {
  if (width === undefined) return undefined;
  
  const widthStr = formatSize(width);
  
  // Only apply calc adjustment if width is 100% and margin is set
  if (widthStr === '100%' && margin !== undefined) {
    let horizontalMargin = 0;
    
    if (typeof margin === 'number') {
      horizontalMargin = margin * 2; // left + right
    } else if (Array.isArray(margin)) {
      horizontalMargin = margin[1] + margin[3]; // right + left
    } else if (typeof margin === 'string') {
      // For string margins, we can't calculate, so return as-is
      return widthStr;
    }
    
    if (horizontalMargin > 0) {
      return `calc(100% - ${horizontalMargin}px)`;
    }
  }
  
  return widthStr;
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
    margin,
    minHeight,
    minWidth,
    maxHeight,
    maxWidth,
    padding,
    width,
    style,
  } = props;

  // Handle padding conflict: if bottomPadding is set, decompose padding shorthand to avoid conflicts
  const paddingStyle: Partial<React.CSSProperties> = {};
  
  if (bottomPadding) {
    // When bottomPadding is set, we need to avoid shorthand padding and use specific properties
    if (padding !== undefined) {
      if (typeof padding === 'number') {
        // Single number: apply to top, left, right (bottom overridden by bottomPadding)
        paddingStyle.paddingTop = `${padding}px`;
        paddingStyle.paddingRight = `${padding}px`;
        paddingStyle.paddingLeft = `${padding}px`;
      } else if (typeof padding === 'string') {
        // String: assume it's a valid CSS value for top, left, right
        paddingStyle.paddingTop = padding;
        paddingStyle.paddingRight = padding;
        paddingStyle.paddingLeft = padding;
      } else if (Array.isArray(padding)) {
        // Array [top, right, bottom, left]: use top, right, left (bottom overridden by bottomPadding)
        paddingStyle.paddingTop = `${padding[0]}px`;
        paddingStyle.paddingRight = `${padding[1]}px`;
        paddingStyle.paddingLeft = `${padding[3]}px`;
      }
    }
    paddingStyle.paddingBottom = `${bottomPadding}px`;
  } else {
    // No bottomPadding conflict, use shorthand
    paddingStyle.padding = formatSpacing(padding);
  }

  return {
    ...style,
    display: hidden ? 'none' : undefined,
    height: formatSize(height),
    width: computeWidthWithMargin(width, margin),
    minHeight: formatSize(minHeight),
    minWidth: formatSize(minWidth),
    maxHeight: formatSize(maxHeight),
    maxWidth: formatSize(maxWidth),
    margin: formatSpacing(margin),
    ...paddingStyle,
    textAlign: align,
    alignItems: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : align === 'left' ? 'flex-start' : undefined,
    justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : align === 'left' ? 'flex-start' : undefined,
  };
};

/**
 * Compute label styles from explicit parameters
 * Returns both textAlign (for non-flex) and justifyContent (for flex) to support all label layouts
 * @deprecated Use AvakioControlLabel component instead
 */
export const computeLabelStyles = (params: { labelWidth?: number | string; labelAlign?: 'left' | 'center' | 'right' }): React.CSSProperties => {
  const { labelWidth, labelAlign } = params;
  
  // Map text-align values to justify-content values for flex containers
  const justifyMap: Record<string, string> = {
    'left': 'flex-start',
    'center': 'center',
    'right': 'flex-end',
  };
  
  return {
    width: formatSize(labelWidth),
    textAlign: labelAlign,
    justifyContent: labelAlign ? justifyMap[labelAlign] || 'flex-start' : undefined,
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
  
  /** Returns the ID of the parent Avakio container (AvakioView, AvakioTemplate, AvakioMultiView, AvakioLayout, AvakioGrid, or AvakioAbsoluteLayout), or its classname if no ID is set */
  getParentView: () => string | null;
  
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
  /** Component ID for change events */
  id?: string;
  /** Initial value */
  initialValue?: T;
  /** Value change handler - receives { id, value, oldValue } */
  onChange?: (event: AvakioChangeEvent<T>) => void;
  /** Validation function */
  validate?: (value: T) => boolean | string;
  /** Initial disabled state from props */
  disabled?: boolean;
  /** Initial hidden state from props */
  hidden?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** External invalid state from props */
  invalid?: boolean;
  /** Message to show when validation fails */
  invalidMessage?: string;
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
  /** Fires when the component is clicked */
  onClick?: () => void;
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
    id,
    initialValue,
    onChange,
    validate: validateFn,
    disabled = false,
    hidden = false,
    required = false,
    invalid = false,
    invalidMessage,
    getTextValue = (v) => (v !== undefined ? String(v) : ''),
    onAfterRender,
    onBeforeRender,
    onBlur,
    onFocus,
    onItemClick,
    onClick,
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
  const [isRequired, setIsRequired] = useState(required);
  const [isInvalid, setIsInvalid] = useState(false);
  const [currentInvalidMessage, setCurrentInvalidMessage] = useState(invalidMessage);
  const [config, setConfig] = useState<Partial<AvakioBaseProps>>({});

  // NOTE: We intentionally do NOT sync initialValue changes after mount.
  // The initialValue prop is only used for the initial useState value.
  // Components that need controlled behavior should use value/onChange pattern.
  // This prevents infinite loops when parent passes new object/array references.

  React.useEffect(() => {
    setIsDisabled((currentState) => {
      if (currentState === disabled) return currentState;
      return disabled;
    });
  }, [disabled]);

  React.useEffect(() => {
    setIsHidden((currentState) => {
      if (currentState === hidden) return currentState;
      return hidden;
    });
  }, [hidden]);

  React.useEffect(() => {
    setIsRequired((currentState) => {
      if (currentState === required) return currentState;
      return required;
    });
  }, [required]);

  React.useEffect(() => {
    setIsInvalid((currentState) => {
      if (currentState === invalid) return currentState;
      return invalid;
    });
  }, [invalid]);

  React.useEffect(() => {
    setCurrentInvalidMessage((currentState) => {
      if (currentState === invalidMessage) return currentState;
      return invalidMessage;
    });
  }, [invalidMessage]);

  // Clear invalid state when value changes (if not externally forced invalid)
  React.useEffect(() => {
    if (!invalid) {
      const isEmpty = value === undefined || value === null || value === '' || 
        (Array.isArray(value) && value.length === 0);
      if (!isEmpty) {
        setIsInvalid((prev) => (prev === false ? prev : false));
      }
    }
  }, [value, invalid]);

  // Lifecycle events
  const hasCalledBeforeRenderRef = React.useRef<boolean>(false);
  const hasCalledAfterRenderRef = React.useRef<boolean>(false);
  
  React.useLayoutEffect(() => {
    // Call onBeforeRender first, then onAfterRender to ensure correct order
    if (!hasCalledBeforeRenderRef.current) {
      hasCalledBeforeRenderRef.current = true;
      onBeforeRender?.();
    }
    if (!hasCalledAfterRenderRef.current) {
      hasCalledAfterRenderRef.current = true;
      onAfterRender?.();
    }
  }, []);

  // Show event - fire when visibility changes from hidden to visible
  const prevHiddenRef = React.useRef<boolean>(isHidden);
  const isFirstRenderRef = React.useRef<boolean>(true);
  
  React.useEffect(() => {
    // Skip firing the event on first render, but still update the ref
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      prevHiddenRef.current = isHidden;
      return;
    }
    
    const wasHidden = prevHiddenRef.current;
    const isNowVisible = !isHidden;
    
    // Only fire if transitioning from hidden to visible
    if (wasHidden && isNowVisible) {
      onViewShow?.();
    }
    
    prevHiddenRef.current = isHidden;
  }, [isHidden, onViewShow]);

  // Methods
  const blur = useCallback(() => {
    (inputRef.current ?? rootRef.current)?.blur();
  }, []);

  const focus = useCallback(() => {
    (inputRef.current ?? rootRef.current)?.focus();
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
    onChange?.({ id: id || '0', value: newValue, oldValue });
  }, [id, onChange]);

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
    // List of Avakio container class prefixes to search for
    const containerClasses = [
      'avakio-layout',
      'avakio-template',
      'avakio-view',
      'avakio-multiview',
      'avakio-grid',
      'avakio-absolute-layout',
    ];
    
    let element = rootRef.current?.parentElement;
    while (element) {
      // Check if this element is an Avakio container
      const classList = element.className || '';
      const matchingClass = containerClasses.find(prefix => 
        classList.split(' ').some(cls => cls.startsWith(prefix))
      );
      
      if (matchingClass) {
        // Return ID if available, otherwise return the matching Avakio class name
        return element.id || matchingClass;
      }
      element = element.parentElement;
    }
    return null;
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
    // If marked invalid externally via prop, return the error message
    if (invalid) {
      return currentInvalidMessage || false;
    }
    
    // Check required field first
    if (isRequired) {
      const isEmpty = value === undefined || value === null || value === '' || 
        (Array.isArray(value) && value.length === 0);
      if (isEmpty) {
        setIsInvalid(true);
        return currentInvalidMessage || 'This field is required';
      }
    }
    
    // Run custom validation function if provided
    if (validateFn) {
      const result = validateFn(value as T);
      if (result !== true) {
        setIsInvalid(true);
        return result;
      }
    }
    
    // Validation passed
    setIsInvalid(false);
    return true;
  }, [validateFn, value, isRequired, invalid, currentInvalidMessage]);

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

  const handleClickSimple = useCallback(() => {
    onClick?.();
  }, [onClick]);

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
    isRequired,
    isInvalid,
    invalidMessage: currentInvalidMessage,
    config,
    
    // State setters (for controlled components)
    setValueState,
    setIsDisabled,
    setIsHidden,
    setIsRequired,
    setIsInvalid,
    setInvalidMessage: setCurrentInvalidMessage,
    
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
      onClick: handleClickSimple,
      onItemClick: handleClick,
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
