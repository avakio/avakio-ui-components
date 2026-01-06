import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Search } from 'lucide-react';
import './avakio-gridsuggest.css';

export interface AvakioGridSuggestColumn {
  id: string;
  header?: string;
  width?: number | string;
  template?: (value: any, item: any) => React.ReactNode;
}

export interface AvakioGridSuggestOption {
  id: string | number;
  [key: string]: any;
}

export interface AvakioGridSuggestBodyConfig {
  columns?: AvakioGridSuggestColumn[];
  autoConfig?: boolean;
  header?: boolean;
  borderless?: boolean;
  scroll?: boolean;
  autoheight?: boolean;
  yCount?: number;
  data?: AvakioGridSuggestOption[];
}

export interface AvakioGridSuggestProps {
  id?: string;
  value?: string | number;
  data?: AvakioGridSuggestOption[];
  onChange?: (value: string | number, option?: AvakioGridSuggestOption) => void;
  onInputChange?: (inputValue: string) => void;
  placeholder?: string;
  label?: string;
  labelAlign?: 'left' | 'right';
  labelWidth?: number;
  disabled?: boolean;
  readonly?: boolean;
  textValue?: string; // Template string for display value (e.g., "#name#")
  template?: (item: AvakioGridSuggestOption) => React.ReactNode;
  width?: number | string;
  body?: AvakioGridSuggestBodyConfig;
  required?: boolean;
  error?: string;
  className?: string;
  editable?: boolean; // Allow typing/filtering like combo
  filterMode?: 'startsWith' | 'contains';
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

export function AvakioGridSuggest({
  id,
  value,
  data = [],
  onChange,
  onInputChange,
  placeholder = 'Select...',
  label,
  labelAlign = 'left',
  labelWidth = 100,
  disabled = false,
  readonly = false,
  textValue,
  template,
  width,
  body = { autoConfig: true, header: true, borderless: false },
  required = false,
  error,
  className = '',
  editable = true,
  filterMode = 'contains',
  minWidth,
  minHeight,
  testId,
  style,
}: AvakioGridSuggestProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [selectedOption, setSelectedOption] = useState<AvakioGridSuggestOption | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use body.data if provided, otherwise use data prop
  const options = body?.data || data;

  // Auto-generate columns if autoConfig is true
  const columns: AvakioGridSuggestColumn[] = React.useMemo(() => {
    if (body?.columns) {
      return body.columns;
    }
    if (body?.autoConfig && options.length > 0) {
      const firstItem = options[0];
      return Object.keys(firstItem)
        .filter((key) => key !== 'id')
        .map((key) => ({
          id: key,
          header: key.charAt(0).toUpperCase() + key.slice(1),
        }));
    }
    return [];
  }, [body?.columns, body?.autoConfig, options]);

  // Get display text from item based on textValue template or first non-id field
  const getDisplayText = (item: AvakioGridSuggestOption): string => {
    if (template) {
      const rendered = template(item);
      if (typeof rendered === 'string') return rendered;
      return String(item[columns[0]?.id] || '');
    }
    if (textValue) {
      // Parse template like "#name#" or "#name# (#code#)"
      return textValue.replace(/#(\w+)#/g, (_, key) => String(item[key] || ''));
    }
    // Default: use first column value
    const firstCol = columns[0]?.id || Object.keys(item).find((k) => k !== 'id');
    return firstCol ? String(item[firstCol]) : '';
  };

  // Initialize selected option based on value prop
  useEffect(() => {
    if (value !== undefined && value !== null && value !== '') {
      const option = options.find((opt) => opt.id === value);
      if (option) {
        setSelectedOption(option);
        setInputValue(getDisplayText(option));
      }
    } else {
      setSelectedOption(null);
      setInputValue('');
    }
  }, [value, options]);

  // Filter options based on input (if editable)
  const filteredOptions = options.filter((option) => {
    if (!editable || !inputValue) return true;

    const searchValue = inputValue.toLowerCase();
    
    // Search across all column values
    return columns.some((col) => {
      const cellValue = String(option[col.id] || '').toLowerCase();
      switch (filterMode) {
        case 'startsWith':
          return cellValue.startsWith(searchValue);
        case 'contains':
        default:
          return cellValue.includes(searchValue);
      }
    });
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // Reset input if no valid selection
        if (selectedOption && editable) {
          setInputValue(getDisplayText(selectedOption));
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, selectedOption]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
            handleSelect(filteredOptions[highlightedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          if (selectedOption && editable) {
            setInputValue(getDisplayText(selectedOption));
          }
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, highlightedIndex, filteredOptions, selectedOption]);

  // Scroll highlighted row into view
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && dropdownRef.current) {
      const highlightedRow = dropdownRef.current.querySelector(
        `[data-row-index="${highlightedIndex}"]`
      ) as HTMLElement;
      if (highlightedRow) {
        highlightedRow.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    }
  }, [highlightedIndex, isOpen]);

  const handleSelect = (option: AvakioGridSuggestOption) => {
    setSelectedOption(option);
    setInputValue(getDisplayText(option));
    setIsOpen(false);
    setHighlightedIndex(-1);
    onChange?.(option.id, option);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onInputChange?.(newValue);
    
    if (!isOpen) {
      setIsOpen(true);
    }
    setHighlightedIndex(0);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOption(null);
    setInputValue('');
    onChange?.('' as any, undefined);
    inputRef.current?.focus();
  };

  const handleToggle = () => {
    if (!disabled && !readonly) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setHighlightedIndex(0);
        inputRef.current?.focus();
      }
    }
  };

  const showHeader = body?.header !== false;
  const showBorderless = body?.borderless === true;
  const enableScroll = body?.scroll === true;
  const maxHeight = body?.yCount ? body.yCount * 40 : enableScroll ? 300 : undefined;

  return (
    <div
      ref={containerRef}
      data-testid={testId}
      className={`avakio-gridsuggest ${className}`}
      style={{ width, ...style }}
      data-disabled={disabled}
      data-readonly={readonly}
      data-error={!!error}
    >
      {label && (
        <label
          className="avakio-gridsuggest-label"
          style={{
            width: labelAlign === 'left' ? labelWidth : undefined,
            textAlign: labelAlign,
          }}
        >
          {label}
          {required && <span className="avakio-gridsuggest-required">*</span>}
        </label>
      )}

      <div className="avakio-gridsuggest-wrapper">
        <div className="avakio-gridsuggest-input-wrapper">
          <input
            ref={inputRef}
            type="text"
            id={id}
            className="avakio-gridsuggest-input"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => !disabled && !readonly && setIsOpen(true)}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readonly || !editable}
            aria-haspopup="grid"
            aria-expanded={isOpen}
            aria-label={label || 'Grid select input'}
          />

          <div className="avakio-gridsuggest-icons">
            {editable && <Search size={16} className="avakio-gridsuggest-search-icon" />}
            {inputValue && !disabled && !readonly && (
              <button
                type="button"
                className="avakio-gridsuggest-clear"
                onClick={handleClear}
                aria-label="Clear selection"
              >
                <X size={16} />
              </button>
            )}
            <button
              type="button"
              className="avakio-gridsuggest-toggle"
              onClick={handleToggle}
              disabled={disabled}
              aria-label="Toggle dropdown"
            >
              <ChevronDown size={18} className={isOpen ? 'open' : ''} />
            </button>
          </div>
        </div>

        {isOpen && (
          <div
            ref={dropdownRef}
            className={`avakio-gridsuggest-dropdown ${showBorderless ? 'borderless' : ''}`}
            style={{ maxHeight }}
            role="grid"
          >
            {filteredOptions.length === 0 ? (
              <div className="avakio-gridsuggest-empty">No data found</div>
            ) : (
              <div className="avakio-gridsuggest-table">
                {showHeader && (
                  <div className="avakio-gridsuggest-header">
                    {columns.map((col) => (
                      <div
                        key={col.id}
                        className="avakio-gridsuggest-header-cell"
                        style={{ width: col.width }}
                      >
                        {col.header || col.id}
                      </div>
                    ))}
                  </div>
                )}

                <div className={`avakio-gridsuggest-body ${enableScroll ? 'scrollable' : ''}`}>
                  {filteredOptions.map((option, rowIndex) => {
                    const isSelected = selectedOption?.id === option.id;
                    const isHighlighted = rowIndex === highlightedIndex;

                    return (
                      <div
                        key={option.id}
                        data-row-index={rowIndex}
                        className={`avakio-gridsuggest-row ${isSelected ? 'selected' : ''} ${
                          isHighlighted ? 'highlighted' : ''
                        }`}
                        onClick={() => handleSelect(option)}
                        role="row"
                        aria-selected={isSelected}
                      >
                        {columns.map((col) => (
                          <div
                            key={col.id}
                            className="avakio-gridsuggest-cell"
                            style={{ width: col.width }}
                            role="gridcell"
                          >
                            {col.template
                              ? col.template(option[col.id], option)
                              : option[col.id]}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {error && <div className="avakio-gridsuggest-error">{error}</div>}
    </div>
  );
}








