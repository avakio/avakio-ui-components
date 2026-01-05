import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';
import './avakio-richselect.css';

export interface AvakioRichSelectOption {
  id: string | number;
  value: string;
  [key: string]: any;
}

export interface AvakioRichSelectProps {
  id?: string;
  value?: string | number;
  options: AvakioRichSelectOption[] | string[];
  onChange?: (value: string | number, option?: AvakioRichSelectOption) => void;
  placeholder?: string;
  label?: string;
  labelAlign?: 'left' | 'right';
  labelWidth?: number;
  disabled?: boolean;
  readonly?: boolean;
  template?: (option: AvakioRichSelectOption) => React.ReactNode;
  width?: number | string;
  yCount?: number; // Number of visible items in the list
  required?: boolean;
  error?: string;
  className?: string;
  clearable?: boolean;
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
}

export function AvakioRichSelect({
  id,
  value,
  options = [],
  onChange,
  placeholder = 'Select...',
  label,
  labelAlign = 'left',
  labelWidth = 100,
  disabled = false,
  readonly = false,
  template,
  width,
  maxHeight = 300,
  yCount,
  required = false,
  error,
  className = '',
  clearable = true,
  padding,
  margin,
  minWidth,
  minHeight,
  testId,
}: AvakioRichSelectProps) {
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
        (opt) => opt.id === value || opt.value === value
      );
      if (option) {
        setSelectedOption(option);
      }
    } else {
      setSelectedOption(null);
    }
  }, [value]);

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
    onChange?.(option.id, option);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOption(null);
    onChange?.('' as any, undefined);
  };

  const handleToggle = () => {
    if (!disabled && !readonly) {
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
    : maxHeight;

  return (
    <div
      ref={containerRef}
      data-testid={testId}
      className={`avakio-richselect ${className}`}
      style={{
        width,
        padding: Array.isArray(padding) 
          ? `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`
          : typeof padding === 'number' ? `${padding}px` : padding,
        margin: Array.isArray(margin) 
          ? `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`
          : typeof margin === 'number' ? `${margin}px` : margin,
      }}
      data-disabled={disabled}
      data-readonly={readonly}
      data-error={!!error}
    >
      {label && (
        <label
          className="avakio-richselect-label"
          style={{
            width: labelAlign === 'left' ? labelWidth : undefined,
            textAlign: labelAlign,
          }}
        >
          {label}
          {required && <span className="avakio-richselect-required">*</span>}
        </label>
      )}

      <div className="avakio-richselect-wrapper">
        <button
          ref={buttonRef}
          type="button"
          id={id}
          className="avakio-richselect-button"
          onClick={handleToggle}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={label || 'Select option'}
        >
          <span className={`avakio-richselect-value ${!displayValue ? 'placeholder' : ''}`}>
            {displayValue || placeholder}
          </span>

          <div className="avakio-richselect-icons">
            {clearable && selectedOption && !disabled && !readonly && (
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

      {error && <div className="avakio-richselect-error">{error}</div>}
    </div>
  );
}

// Helper methods for API compatibility
export const AvakioRichSelectAPI = {
  getValue: (ref: React.RefObject<any>) => {
    // Returns the ID of the selected option
    return ref.current?.selectedOption?.id;
  },
  getText: (ref: React.RefObject<any>) => {
    // Returns the text value of the selected option
    return ref.current?.selectedOption?.value;
  },
};











