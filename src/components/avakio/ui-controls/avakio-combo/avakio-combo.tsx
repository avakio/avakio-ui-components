import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { ChevronDown, X, Search } from 'lucide-react';
import './avakio-combo.css';

export interface AvakioComboOption {
  id: string | number;
  value: string;
  [key: string]: any;
}

export interface AvakioComboProps {
  id?: string;
  value?: string | number;
  options: AvakioComboOption[] | string[];
  onChange?: (value: string | number, option?: AvakioComboOption) => void;
  onInputChange?: (inputValue: string) => void;
  placeholder?: string;
  label?: string;
  labelAlign?: 'left' | 'right';
  labelWidth?: number;
  disabled?: boolean;
  readonly?: boolean;
  filterMode?: 'startsWith' | 'contains' | 'custom';
  customFilter?: (option: AvakioComboOption, inputValue: string) => boolean;
  template?: (option: AvakioComboOption) => React.ReactNode;
  width?: number | string;
  required?: boolean;
  error?: string;
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
  /** Custom inline styles for the root element */
  style?: React.CSSProperties;
}

export function AvakioCombo({
  id,
  value,
  options = [],
  onChange,
  onInputChange,
  placeholder = 'Select or type...',
  label,
  labelAlign = 'left',
  labelWidth = 100,
  disabled = false,
  readonly = false,
  filterMode = 'contains',
  customFilter,
  template,
  width,
  maxHeight = 300,
  required = false,
  error,
  className = '',
  minWidth,
  minHeight,
  testId,
  style,
}: AvakioComboProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [selectedOption, setSelectedOption] = useState<AvakioComboOption | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize options to AvakioComboOption format
  const normalizedOptions: AvakioComboOption[] = useMemo(() => 
    options.map((opt) => {
      if (typeof opt === 'string') {
        return { id: opt, value: opt };
      }
      return opt;
    }), [options]);

  // Initialize selected option based on value prop
  useEffect(() => {
    if (value !== undefined && value !== null && value !== '') {
      const option = normalizedOptions.find(
        (opt) => opt.id === value || opt.value === value
      );
      if (option) {
        setSelectedOption(option);
        setInputValue(option.value);
      }
    } else {
      setSelectedOption(null);
      setInputValue('');
    }
  }, [value, normalizedOptions]);

  // Filter options based on input
  const filteredOptions = normalizedOptions.filter((option) => {
    if (!inputValue) return true;

    if (customFilter) {
      return customFilter(option, inputValue);
    }

    const searchValue = inputValue.toLowerCase();
    const optionValue = option.value.toLowerCase();

    switch (filterMode) {
      case 'startsWith':
        return optionValue.startsWith(searchValue);
      case 'contains':
      default:
        return optionValue.includes(searchValue);
    }
  });

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsOpen(true);
    setHighlightedIndex(-1);
    
    onInputChange?.(newValue);
  };

  // Handle option selection
  const handleSelectOption = (option: AvakioComboOption) => {
    setSelectedOption(option);
    setInputValue(option.value);
    setIsOpen(false);
    setHighlightedIndex(-1);
    
    onChange?.(option.id, option);
  };

  // Handle clear
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOption(null);
    setInputValue('');
    setIsOpen(false);
    
    onChange?.('', undefined);
    inputRef.current?.focus();
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled || readonly) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          );
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        }
        break;

      case 'Enter':
        e.preventDefault();
        if (isOpen && highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleSelectOption(filteredOptions[highlightedIndex]);
        }
        break;

      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;

      case 'Tab':
        setIsOpen(false);
        break;
    }
  };

  // Scroll highlighted option into view
  useEffect(() => {
    if (highlightedIndex >= 0 && dropdownRef.current) {
      const highlightedElement = dropdownRef.current.children[highlightedIndex] as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    }
  }, [highlightedIndex]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderOption = (option: AvakioComboOption) => {
    if (template) {
      return template(option);
    }
    return option.value;
  };

  return (
    <div
      ref={containerRef}
      data-testid={testId}
      className={`avakio-combo-wrapper ${className}`}
      style={{
        width: width || '100%',
        ...(minWidth && { minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth }),
        ...(minHeight && { minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight }),
        ...style,
      }}
    >
      {label && (
        <label
          htmlFor={id}
          className={`avakio-combo-label avakio-combo-label-${labelAlign}`}
          style={{ width: labelWidth }}
        >
          {label}
          {required && <span className="avakio-combo-required">*</span>}
        </label>
      )}
      <div className="avakio-combo-container">
        <div
          className={`avakio-combo-input-wrapper ${isOpen ? 'open' : ''} ${
            error ? 'error' : ''
          } ${disabled ? 'disabled' : ''}`}
        >
          <Search className="avakio-combo-search-icon" size={16} />
          <input
            ref={inputRef}
            id={id}
            type="text"
            className="avakio-combo-input"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => !readonly && setIsOpen(true)}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readonly}
            required={required}
          />
          {inputValue && !disabled && !readonly && (
            <button
              type="button"
              className="avakio-combo-clear-btn"
              onClick={handleClear}
              tabIndex={-1}
            >
              <X size={16} />
            </button>
          )}
          <button
            type="button"
            className="avakio-combo-toggle-btn"
            onClick={() => !disabled && !readonly && setIsOpen(!isOpen)}
            disabled={disabled}
            tabIndex={-1}
          >
            <ChevronDown size={16} className={isOpen ? 'rotate' : ''} />
          </button>
        </div>

        {isOpen && !disabled && !readonly && (
          <div
            className="avakio-combo-dropdown"
            style={{ maxHeight }}
          >
            <div ref={dropdownRef} className="avakio-combo-options">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <div
                    key={option.id}
                    className={`avakio-combo-option ${
                      highlightedIndex === index ? 'highlighted' : ''
                    } ${selectedOption?.id === option.id ? 'selected' : ''}`}
                    onClick={() => handleSelectOption(option)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    {renderOption(option)}
                  </div>
                ))
              ) : (
                <div className="avakio-combo-no-options">No options found</div>
              )}
            </div>
          </div>
        )}

        {error && <div className="avakio-combo-error-message">{error}</div>}
      </div>
    </div>
  );
}











