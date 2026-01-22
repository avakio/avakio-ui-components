import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { 
  AvakioChangeEvent,
  AvakioBaseProps,
  AvakioBaseRef,
  useAvakioBase,
  computeBaseStyles
} from '../../base/avakio-base-props';
import { AvakioControlLabel, AvakioControlLabelProps } from '../../base/avakio-control-label';
import './avakio-richselect.css';

export interface AvakioRichSelectOption {
  id: string | number;
  value: string;
  [key: string]: any;
}

/**
 * Ref interface for AvakioRichSelect component
 */
export interface AvakioRichSelectRef extends AvakioBaseRef<string | number | undefined> {
  /** Sets a new value for the component */
  setValue: (value: string | number) => void;
}

export interface AvakioRichSelectProps extends 
  AvakioBaseProps,
  Omit<AvakioControlLabelProps, 'children' | 'classPrefix' | 'wrapperClassName' | 'wrapperStyle' | 'labelStyle' | 'size'> {
  value?: string | number;
  options: AvakioRichSelectOption[] | string[];
  /** Callback fired when the value changes. Receives { id, value, option } */
  onChange?: (event: AvakioChangeEvent<string | number> & { option?: AvakioRichSelectOption }) => void;
  placeholder?: string;
  /** Sets the bottom offset of the control input */
  bottomPadding?: number;
  readonly?: boolean;
  template?: (option: AvakioRichSelectOption) => React.ReactNode;
  yCount?: number; // Number of visible items in the list
  clearable?: boolean;
  /** Size variant - compact for filters/tables */
  size?: 'default' | 'compact';
}

export const AvakioRichSelect = forwardRef<AvakioRichSelectRef, AvakioRichSelectProps>(function AvakioRichSelect(
  props,
  ref
) {
  const {
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
    readonly = false,
    template,
    maxHeight,
    yCount,
    required = false,
    invalid = false,
    invalidMessage,
    className = '',
    clearable = false,
    size = 'default',
    style,
    borderless = false,
    // Event handlers
    onItemClick,
    ...baseProps
  } = props;

  // Use AvakioBase hook for state management and ref methods
  const {
    rootRef,
    isDisabled,
    isHidden,
    config,
    methods,
    eventHandlers,
  } = useAvakioBase({
    hidden: baseProps.hidden,
    disabled: baseProps.disabled,
    onItemClick,
    onBlur: baseProps.onBlur,
    onFocus: baseProps.onFocus,
    onKeyPress: baseProps.onKeyPress,
  });

  // Merge config from define() with baseProps
  const mergedProps = { ...baseProps, ...config };

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [selectedOption, setSelectedOption] = useState<AvakioRichSelectOption | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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
    onChange?.({ id: mergedProps.id || '0', value: option.id, option });
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOption(null);
    onChange?.({ id: mergedProps.id || '0', value: '' as any, option: undefined });
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

  const setValue = useCallback((newValue: string | number) => {
    const option = normalizedOptions.find(
      (opt) => opt.id === newValue || String(opt.id) === String(newValue)
    );
    if (option) {
      setSelectedOption(option);
      onChange?.({ id: mergedProps.id || '0', value: option.id, option });
    }
  }, [normalizedOptions, onChange, mergedProps.id]);

  // Expose ref methods
  useImperativeHandle(ref, () => ({
    ...methods,
    getValue: () => selectedOption?.id,
    setValue,
    getText: () => selectedOption?.value || '',
    validate: () => {
      if (required && !selectedOption) {
        return invalidMessage || 'This field is required';
      }
      return true;
    },
    getElement: () => rootRef.current,
  }), [methods, selectedOption, setValue, required, invalidMessage]);

  // Don't render if hidden
  if (isHidden) {
    return null;
  }

  // Build inline styles using base styles
  const baseStyles = computeBaseStyles({ ...mergedProps, hidden: isHidden });
  const inlineStyles: React.CSSProperties = {
    ...baseStyles,
    paddingBottom: bottomPadding !== undefined 
      ? typeof bottomPadding === 'number' ? `${bottomPadding}px` : bottomPadding 
      : undefined,
    ...style,
  };

  return (
    <div
      ref={rootRef}
      data-testid={mergedProps.testId}
      className={`avakio-richselect ${size === 'compact' ? 'avakio-richselect-compact' : ''} ${borderless ? 'avakio-richselect-borderless' : ''} ${(labelPosition === 'top' || labelPosition === 'bottom') ? 'avakio-richselect-label-vertical' : ''} ${className}`}
      style={inlineStyles}
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
            id={mergedProps.id}
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

// (Removed duplicate export of AvakioRichSelectRef)











