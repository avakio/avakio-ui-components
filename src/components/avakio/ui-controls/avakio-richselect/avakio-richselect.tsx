import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { AvakioChangeEvent } from '../../base/avakio-base-props';
import { AvakioControlLabel } from '../../base/avakio-control-label';
import './avakio-richselect.css';

export interface AvakioRichSelectOption {
  id: string | number;
  value: string;
  [key: string]: any;
}

/**
 * Ref interface for AvakioRichSelect component
 */
export interface AvakioRichSelectRef {
  /** Removes focus from the control */
  blur: () => void;
  /** Sets focus to the control */
  focus: () => void;
  /** Disables the component */
  disable: () => void;
  /** Enables the component */
  enable: () => void;
  /** Hides the component */
  hide: () => void;
  /** Makes the component visible */
  show: () => void;
  /** Returns the current value (id) of the selected option */
  getValue: () => string | number | undefined;
  /** Sets a new value for the component */
  setValue: (value: string | number) => void;
  /** Gets the text value of the selected option */
  getText: () => string;
  /** Checks whether the component is enabled */
  isEnabled: () => boolean;
  /** Checks whether the component is visible */
  isVisible: () => boolean;
  /** Returns the root DOM element */
  getElement: () => HTMLElement | null;
  /** Returns the ID of the parent Avakio container (AvakioView, AvakioTemplate, AvakioMultiView, AvakioLayout, AvakioGrid, or AvakioAbsoluteLayout) */
  getParentView: () => string | null;
  /** Validates the component */
  validate: () => boolean | string;
  /** Redefines configuration properties */
  define: (config: Partial<AvakioRichSelectProps> | string, value?: unknown) => void;
}

export interface AvakioRichSelectProps {
  id?: string;
  value?: string | number;
  options: AvakioRichSelectOption[] | string[];
  /** Callback fired when the value changes. Receives { id, value, option } */
  onChange?: (event: AvakioChangeEvent<string | number> & { option?: AvakioRichSelectOption }) => void;
  placeholder?: string;
  /** Sets the text of the label */
  label?: string;
  /** The alignment of a label inside its container */
  labelAlign?: 'left' | 'right' | 'center';
  /** The width of the label */
  labelWidth?: number | string;
  /** Positions a label in relation to the control */
  labelPosition?: 'left' | 'top' | 'right' | 'bottom';
  /** Form label displayed above the component */
  labelForm?: string;
  /** Sets a label under the control */
  bottomLabel?: string;
  /** Sets the bottom offset of the control input */
  bottomPadding?: number;
  disabled?: boolean;
  readonly?: boolean;
  template?: (option: AvakioRichSelectOption) => React.ReactNode;
  width?: number | string;
  yCount?: number; // Number of visible items in the list
  required?: boolean;
  /** Marks the component as invalid */
  invalid?: boolean;
  /** Sets the text of a validation message */
  invalidMessage?: string;
  className?: string;
  clearable?: boolean;
  /** Size variant - compact for filters/tables */
  size?: 'default' | 'compact';
  /** Padding - can be a number (all sides), string, or array [top, right, bottom, left] */
  padding?: string | number | [number, number, number, number];
  /** Margin - can be a number (all sides), string, or array [top, right, bottom, left] */
  margin?: string | number | [number, number, number, number];
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
  /** Custom inline styles for the root element */
  style?: React.CSSProperties;
}

export const AvakioRichSelect = forwardRef<AvakioRichSelectRef, AvakioRichSelectProps>(function AvakioRichSelect({
  id,
  value,
  options = [],
  onChange,
  placeholder = 'Select...',
  label,
  labelAlign = 'left',
  labelWidth = 100,
  labelPosition = 'left',
  labelForm,
  bottomLabel,
  bottomPadding,
  disabled = false,
  readonly = false,
  template,
  width,
  maxHeight,
  yCount,
  required = false,
  invalid = false,
  invalidMessage,
  className = '',
  clearable = false,
  size = 'default',
  padding,
  margin,
  minWidth,
  minHeight,
  testId,
  style,
  hidden = false,
  borderless = false,
}, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [selectedOption, setSelectedOption] = useState<AvakioRichSelectOption | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Internal state for imperative control
  const [isDisabled, setIsDisabled] = useState(disabled);
  const [isHidden, setIsHidden] = useState(hidden);

  // Sync with prop changes
  useEffect(() => {
    setIsDisabled(disabled);
  }, [disabled]);

  useEffect(() => {
    setIsHidden(hidden);
  }, [hidden]);

  // Normalize options to AvakioRichSelectOption format
  const normalizedOptions: AvakioRichSelectOption[] = options.map((opt) => {
    if (typeof opt === 'string') {
      return { id: opt, value: opt };
    }
    return opt;
  });

  // Initialize selected option based on value prop
  useEffect(() => {
    if (value !== undefined && value !== null && value !== '') {
      const option = normalizedOptions.find(
        (opt) => opt.id === value || opt.value === value || String(opt.id) === String(value)
      );
      if (option) {
        setSelectedOption(option);
      } else {
        setSelectedOption(null);
      }
    } else {
      setSelectedOption(null);
    }
  }, [value, options]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < normalizedOptions.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < normalizedOptions.length) {
            handleSelect(normalizedOptions[highlightedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, highlightedIndex, normalizedOptions]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && dropdownRef.current) {
      const highlightedElement = dropdownRef.current.querySelector(
        `[data-index="${highlightedIndex}"]`
      ) as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    }
  }, [highlightedIndex, isOpen]);

  const handleSelect = (option: AvakioRichSelectOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    setHighlightedIndex(-1);
    onChange?.({ id: id || '0', value: option.id, option });
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOption(null);
    onChange?.({ id: id || '0', value: '' as any, option: undefined });
  };

  const handleToggle = () => {
    if (!isDisabled && !readonly) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        // Set highlighted index to current selection when opening
        const currentIndex = normalizedOptions.findIndex(
          (opt) => opt.id === selectedOption?.id
        );
        setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0);
      }
    }
  };

  const displayValue = selectedOption ? selectedOption.value : '';
  const calculatedMaxHeight = yCount
    ? yCount * 40 // Approximate item height
    : maxHeight ?? 300; // Default to 300px if not specified

  // Ref methods
  const blur = useCallback(() => {
    buttonRef.current?.blur();
  }, []);

  const focus = useCallback(() => {
    buttonRef.current?.focus();
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
    return selectedOption?.id;
  }, [selectedOption]);

  const setValue = useCallback((newValue: string | number) => {
    const option = normalizedOptions.find(
      (opt) => opt.id === newValue || String(opt.id) === String(newValue)
    );
    if (option) {
      setSelectedOption(option);
      onChange?.({ id: id || '0', value: option.id, option });
    }
  }, [normalizedOptions, onChange, id]);

  const getText = useCallback(() => {
    return selectedOption?.value || '';
  }, [selectedOption]);

  const isEnabled = useCallback(() => {
    return !isDisabled;
  }, [isDisabled]);

  const isVisible = useCallback(() => {
    return !isHidden;
  }, [isHidden]);

  const getElement = useCallback(() => {
    return containerRef.current;
  }, []);

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
    
    let element = containerRef.current?.parentElement;
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

  const validate = useCallback(() => {
    if (required && !selectedOption) {
      return invalidMessage || 'This field is required';
    }
    return true;
  }, [required, selectedOption, invalidMessage]);

  const define = useCallback((
    configOrKey: Partial<AvakioRichSelectProps> | string,
    propValue?: unknown
  ) => {
    // This is a simplified implementation - in production you'd handle all props
    if (typeof configOrKey === 'string') {
      if (configOrKey === 'disabled') setIsDisabled(propValue as boolean);
      if (configOrKey === 'hidden') setIsHidden(propValue as boolean);
    } else {
      if (configOrKey.disabled !== undefined) setIsDisabled(configOrKey.disabled);
      if (configOrKey.hidden !== undefined) setIsHidden(configOrKey.hidden);
    }
  }, []);

  // Expose ref methods
  useImperativeHandle(ref, () => ({
    blur,
    focus,
    disable,
    enable,
    hide,
    show,
    getValue,
    setValue,
    getText,
    isEnabled,
    isVisible,
    getElement,
    getParentView,
    validate,
    define,
  }), [blur, focus, disable, enable, hide, show, getValue, setValue, getText, isEnabled, isVisible, getElement, getParentView, validate, define]);

  // Don't render if hidden
  if (isHidden) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      data-testid={testId}
      className={`avakio-richselect ${size === 'compact' ? 'avakio-richselect-compact' : ''} ${borderless ? 'avakio-richselect-borderless' : ''} ${(labelPosition === 'top' || labelPosition === 'bottom') ? 'avakio-richselect-label-vertical' : ''} ${className}`}
      style={{
        width,
        padding: Array.isArray(padding) 
          ? `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`
          : typeof padding === 'number' ? `${padding}px` : padding,
        margin: Array.isArray(margin) 
          ? `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`
          : typeof margin === 'number' ? `${margin}px` : margin,
        paddingBottom: bottomPadding !== undefined 
          ? typeof bottomPadding === 'number' ? `${bottomPadding}px` : bottomPadding 
          : undefined,
        ...style,
      }}
      data-disabled={isDisabled}
      data-readonly={readonly}
      data-invalid={invalid ? "true" : undefined}
      data-size={size}
    >
      <AvakioControlLabel
        label={label}
        labelForm={labelForm}
        labelPosition={labelPosition}
        labelAlign={labelAlign}
        labelWidth={labelWidth}
        bottomLabel={bottomLabel}
        required={required}
        invalid={invalid}
        invalidMessage={invalidMessage}
        classPrefix="avakio-richselect"
        wrapperClassName={(labelPosition === 'top' || labelPosition === 'bottom') ? 'avakio-richselect-inner-wrapper-vertical' : ''}
        size={size}
      >
        <div className="avakio-richselect-wrapper">
          <button
            ref={buttonRef}
            type="button"
            id={id}
            className="avakio-richselect-button"
            onClick={handleToggle}
            disabled={isDisabled}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-label={label || 'Select option'}
          >
            <span className={`avakio-richselect-value ${!displayValue ? 'placeholder' : ''}`}>
              {displayValue || placeholder}
            </span>

            <div className="avakio-richselect-icons">
              {clearable && selectedOption && !isDisabled && !readonly && (
                <span
                  role="button"
                  tabIndex={-1}
                  className="avakio-richselect-clear"
                  onClick={handleClear}
                  aria-label="Clear selection"
                >
                  <X size={16} />
                </span>
              )}
              <ChevronDown
                size={18}
                className={`avakio-richselect-toggle ${isOpen ? 'open' : ''}`}
              />
            </div>
          </button>

          {isOpen && (
            <div
              ref={dropdownRef}
              className="avakio-richselect-dropdown"
              style={{ maxHeight: calculatedMaxHeight }}
              role="listbox"
            >
              {normalizedOptions.length === 0 ? (
                <div className="avakio-richselect-empty">No options available</div>
              ) : (
                normalizedOptions.map((option, index) => {
                  const isSelected = selectedOption?.id === option.id;
                  const isHighlighted = index === highlightedIndex;

                  return (
                    <div
                      key={option.id}
                      data-index={index}
                      className={`avakio-richselect-option ${isSelected ? 'selected' : ''} ${
                        isHighlighted ? 'highlighted' : ''
                      }`}
                      onClick={() => handleSelect(option)}
                      role="option"
                      aria-selected={isSelected}
                    >
                      {template ? template(option) : option.value}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </AvakioControlLabel>
    </div>
  );
});

// Re-export the ref type for consumers
export type { AvakioRichSelectRef };











