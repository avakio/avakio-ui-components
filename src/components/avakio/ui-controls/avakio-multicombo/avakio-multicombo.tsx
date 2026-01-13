import React, { useState, useRef, useEffect, useMemo, forwardRef, useImperativeHandle, useCallback } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';
import { AvakioChangeEvent } from '../../base/avakio-base-props';
import { AvakioControlLabel } from '../../base/avakio-control-label';
import './avakio-multicombo.css';

export interface AvakioMultiComboOption {
  value: string;
  label: string;
  [key: string]: any;
}

/**
 * Ref interface for AvakioMultiCombo component
 */
export interface AvakioMultiComboRef {
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
  /** Returns the current values (array of selected values) */
  getValue: () => string[];
  /** Sets new values for the component */
  setValue: (values: string[]) => void;
  /** Gets the text values of the selected options (comma-separated) */
  getText: () => string;
  /** Checks whether the component is enabled */
  isEnabled: () => boolean;
  /** Checks whether the component is visible */
  isVisible: () => boolean;
  /** Returns the root DOM element */
  getElement: () => HTMLElement | null;
  /** Returns the ID of the parent Avakio container */
  getParentView: () => string | null;
  /** Validates the component */
  validate: () => boolean | string;
  /** Redefines configuration properties */
  define: (config: Partial<AvakioMultiComboProps> | string, value?: unknown) => void;
  /** Clears all selected values */
  clear: () => void;
  /** Select all options */
  selectAll: () => void;
}

export interface AvakioMultiComboProps {
  /** Component ID */
  id?: string;
  /** Array of options to display */
  options: AvakioMultiComboOption[];
  /** Array of selected values */
  value?: string[];
  /** Callback fired when the value changes. Receives { id, value } where value is string[] */
  onChange?: (event: AvakioChangeEvent<string[]>) => void;
  /** Placeholder text when no selection */
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
  /** Additional CSS class name */
  className?: string;
  /** Show count instead of chips */
  showCount?: boolean;
  /** Max chips to display before "+N more" */
  maxDisplayItems?: number;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Whether the component is read-only */
  readonly?: boolean;
  /** Marks field as required */
  required?: boolean;
  /** Marks the component as invalid */
  invalid?: boolean;
  /** Sets the text of a validation message */
  invalidMessage?: string;
  /** Whether the value can be cleared (displays X icon) */
  clearable?: boolean;
  /** Size variant - compact for filters/tables */
  size?: 'default' | 'compact';
  /** Test ID for testing purposes */
  testId?: string;
  /** Minimum width */
  minWidth?: string | number;
  /** Minimum height */
  minHeight?: string | number;
  /** Whether the component is borderless */
  borderless?: boolean;
  /** Whether the component is hidden */
  hidden?: boolean;
  /** Maximum height for dropdown */
  maxHeight?: number | string;
  /** Maximum width */
  maxWidth?: number | string;
  /** Width of the component */
  width?: number | string;
  /** Custom inline styles for the root element */
  style?: React.CSSProperties;
  /** Padding - can be a number (all sides), string, or array [top, right, bottom, left] */
  padding?: string | number | [number, number, number, number];
  /** Margin - can be a number (all sides), string, or array [top, right, bottom, left] */
  margin?: string | number | [number, number, number, number];
  /** Custom template for rendering options */
  template?: (option: AvakioMultiComboOption) => React.ReactNode;
  /** Number of visible items in dropdown (limits height) */
  yCount?: number;
}

export const AvakioMultiCombo = forwardRef<AvakioMultiComboRef, AvakioMultiComboProps>(function AvakioMultiCombo({
  id,
  options = [],
  value = [],
  onChange,
  placeholder = "Select items...",
  label,
  labelAlign = 'left',
  labelWidth = 100,
  labelPosition = 'left',
  labelForm,
  bottomLabel,
  bottomPadding,
  className = '',
  showCount = false,
  maxDisplayItems = 3,
  disabled = false,
  readonly = false,
  required = false,
  invalid = false,
  invalidMessage,
  clearable = false,
  size = 'default',
  testId,
  minWidth,
  minHeight,
  borderless = false,
  hidden = false,
  maxHeight,
  maxWidth,
  width,
  style,
  padding,
  margin,
  template,
  yCount,
}, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  
  // Internal state for imperative control
  const [isDisabled, setIsDisabled] = useState(disabled);
  const [isHidden, setIsHidden] = useState(hidden);
  const [internalValue, setInternalValue] = useState<string[]>(value);

  // Sync with prop changes
  useEffect(() => {
    setIsDisabled(disabled);
  }, [disabled]);

  useEffect(() => {
    setIsHidden(hidden);
  }, [hidden]);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  // Filter options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return options;
    const query = searchQuery.toLowerCase();
    return options.filter(opt => 
      opt.label.toLowerCase().includes(query) || 
      opt.value.toLowerCase().includes(query)
    );
  }, [options, searchQuery]);

  // Get selected option labels
  const selectedOptions = useMemo(() => {
    return options.filter(opt => internalValue.includes(opt.value));
  }, [options, internalValue]);

  // Calculate dropdown max height
  const calculatedMaxHeight = yCount
    ? yCount * 40 // Approximate item height
    : maxHeight ?? 300;

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        containerRef.current && 
        !containerRef.current.contains(target)
      ) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggleOption = (optionValue: string) => {
    if (isDisabled || readonly) return;
    
    let newValue: string[];
    if (internalValue.includes(optionValue)) {
      newValue = internalValue.filter(v => v !== optionValue);
    } else {
      newValue = [...internalValue, optionValue];
    }
    setInternalValue(newValue);
    onChange?.({ id: id || '0', value: newValue });
  };

  const handleRemoveItem = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDisabled || readonly) return;
    
    const newValue = internalValue.filter(v => v !== optionValue);
    setInternalValue(newValue);
    onChange?.({ id: id || '0', value: newValue });
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDisabled || readonly) return;
    
    setInternalValue([]);
    onChange?.({ id: id || '0', value: [] });
  };

  const handleInputClick = () => {
    if (!isDisabled && !readonly) {
      setIsOpen(true);
      inputRef.current?.focus();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleSelectAll = () => {
    if (isDisabled || readonly || filteredOptions.length === 0) return;
    
    const allFilteredValues = filteredOptions.map(opt => opt.value);
    const allSelected = allFilteredValues.every(v => internalValue.includes(v));
    
    let newValue: string[];
    if (allSelected) {
      // Deselect all filtered items
      newValue = internalValue.filter(v => !allFilteredValues.includes(v));
    } else {
      // Select all filtered items
      newValue = Array.from(new Set([...internalValue, ...allFilteredValues]));
    }
    setInternalValue(newValue);
    onChange?.({ id: id || '0', value: newValue });
  };

  const renderSelectedItems = () => {
    if (selectedOptions.length === 0) {
      return <span className="avakio-multicombo-placeholder">{placeholder}</span>;
    }

    if (showCount) {
      return (
        <span className="avakio-multicombo-count">
          {selectedOptions.length} {selectedOptions.length === 1 ? 'item' : 'items'} selected
        </span>
      );
    }

    const displayItems = selectedOptions.slice(0, maxDisplayItems);
    const remainingCount = selectedOptions.length - maxDisplayItems;

    return (
      <div className="avakio-multicombo-chips">
        {displayItems.map(opt => (
          <span key={opt.value} className="avakio-multicombo-chip">
            <span className="avakio-multicombo-chip-label">{opt.label}</span>
            {!isDisabled && !readonly && (
              <button
                type="button"
                className="avakio-multicombo-chip-remove"
                onClick={(e) => handleRemoveItem(opt.value, e)}
              >
                <X size={12} />
              </button>
            )}
          </span>
        ))}
        {remainingCount > 0 && (
          <span className="avakio-multicombo-chip avakio-multicombo-chip-more">
            +{remainingCount} more
          </span>
        )}
      </div>
    );
  };

  const allFilteredSelected = filteredOptions.length > 0 && 
    filteredOptions.every(opt => internalValue.includes(opt.value));

  // Ref methods
  const blur = useCallback(() => {
    inputRef.current?.blur();
    triggerRef.current?.blur();
  }, []);

  const focus = useCallback(() => {
    triggerRef.current?.focus();
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
    return internalValue;
  }, [internalValue]);

  const setValue = useCallback((newValues: string[]) => {
    setInternalValue(newValues);
    onChange?.({ id: id || '0', value: newValues });
  }, [onChange, id]);

  const getText = useCallback(() => {
    return selectedOptions.map(opt => opt.label).join(', ');
  }, [selectedOptions]);

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
      const classList = element.className || '';
      const matchingClass = containerClasses.find(prefix => 
        classList.split(' ').some(cls => cls.startsWith(prefix))
      );
      
      if (matchingClass) {
        return element.id || matchingClass;
      }
      element = element.parentElement;
    }
    return null;
  }, []);

  const validate = useCallback(() => {
    if (required && internalValue.length === 0) {
      return invalidMessage || 'This field is required';
    }
    return true;
  }, [required, internalValue, invalidMessage]);

  const define = useCallback((
    configOrKey: Partial<AvakioMultiComboProps> | string,
    propValue?: unknown
  ) => {
    if (typeof configOrKey === 'string') {
      if (configOrKey === 'disabled') setIsDisabled(propValue as boolean);
      if (configOrKey === 'hidden') setIsHidden(propValue as boolean);
    } else {
      if (configOrKey.disabled !== undefined) setIsDisabled(configOrKey.disabled);
      if (configOrKey.hidden !== undefined) setIsHidden(configOrKey.hidden);
    }
  }, []);

  const clear = useCallback(() => {
    setInternalValue([]);
    onChange?.({ id: id || '0', value: [] });
  }, [onChange, id]);

  const selectAll = useCallback(() => {
    const allValues = options.map(opt => opt.value);
    setInternalValue(allValues);
    onChange?.({ id: id || '0', value: allValues });
  }, [options, onChange, id]);

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
    clear,
    selectAll,
  }), [blur, focus, disable, enable, hide, show, getValue, setValue, getText, isEnabled, isVisible, getElement, getParentView, validate, define, clear, selectAll]);

  // Don't render if hidden
  if (isHidden) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      id={id}
      data-testid={testId}
      className={`avakio-multicombo ${size === 'compact' ? 'avakio-multicombo-compact' : ''} ${borderless ? 'avakio-multicombo-borderless' : ''} ${(labelPosition === 'top' || labelPosition === 'bottom') ? 'avakio-multicombo-label-vertical' : ''} ${isDisabled ? 'avakio-multicombo-disabled' : ''} ${className}`}
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
        minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth,
        maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
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
        classPrefix="avakio-multicombo"
        wrapperClassName={(labelPosition === 'top' || labelPosition === 'bottom') ? 'avakio-multicombo-inner-wrapper-vertical' : ''}
        size={size}
      >
        <div className="avakio-multicombo-wrapper">
          {/* Trigger Area */}
          <div 
            ref={triggerRef}
            className={`avakio-multicombo-trigger ${isOpen ? 'avakio-multicombo-trigger-open' : ''}`}
            onClick={handleInputClick}
            tabIndex={isDisabled ? -1 : 0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleInputClick();
              }
            }}
          >
            <div className="avakio-multicombo-content">
              {!isOpen && renderSelectedItems()}
              {isOpen && (
                <input
                  ref={inputRef}
                  type="text"
                  className="avakio-multicombo-search"
                  value={searchQuery}
                  onChange={handleInputChange}
                  placeholder={selectedOptions.length > 0 ? "Search..." : placeholder}
                  disabled={isDisabled}
                />
              )}
            </div>
            <div className="avakio-multicombo-icons">
              {clearable && internalValue.length > 0 && !isDisabled && !readonly && (
                <span
                  role="button"
                  tabIndex={-1}
                  className="avakio-multicombo-clear"
                  onClick={handleClearAll}
                  aria-label="Clear selection"
                >
                  <X size={16} />
                </span>
              )}
              <ChevronDown
                size={18}
                className={`avakio-multicombo-toggle ${isOpen ? 'open' : ''}`}
              />
            </div>
          </div>

          {/* Dropdown List - rendered as absolute positioned element like RichSelect */}
          {isOpen && (
            <div 
              ref={dropdownRef}
              className="avakio-multicombo-dropdown"
              style={{
                maxHeight: typeof calculatedMaxHeight === 'number' ? `${calculatedMaxHeight}px` : calculatedMaxHeight,
              }}
            >
              {/* Select All Option */}
              {filteredOptions.length > 0 && (
                <div className="avakio-multicombo-select-all">
                  <button
                    type="button"
                    className="avakio-multicombo-option"
                    onClick={handleSelectAll}
                  >
                    <div className={`avakio-multicombo-checkbox ${allFilteredSelected ? 'avakio-multicombo-checkbox-checked' : ''}`}>
                      {allFilteredSelected && <Check size={12} />}
                    </div>
                    <span className="avakio-multicombo-option-label avakio-multicombo-select-all-label">
                      {allFilteredSelected ? 'Deselect All' : 'Select All'}
                    </span>
                  </button>
                </div>
              )}

              {/* Options List */}
              <div className="avakio-multicombo-options">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map(option => {
                    const isSelected = internalValue.includes(option.value);
                    return (
                      <button
                        key={option.value}
                        type="button"
                        className={`avakio-multicombo-option ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleToggleOption(option.value)}
                      >
                        <div className={`avakio-multicombo-checkbox ${isSelected ? 'avakio-multicombo-checkbox-checked' : ''}`}>
                          {isSelected && <Check size={12} />}
                        </div>
                        <span className="avakio-multicombo-option-label">
                          {template ? template(option) : option.label}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <div className="avakio-multicombo-empty">
                    {searchQuery ? 'No matches found' : 'No options available'}
                  </div>
                )}
              </div>

              {/* Footer with count */}
              {internalValue.length > 0 && (
                <div className="avakio-multicombo-footer">
                  {internalValue.length} {internalValue.length === 1 ? 'item' : 'items'} selected
                </div>
              )}
            </div>
          )}
        </div>
      </AvakioControlLabel>
    </div>
  );
});

// Re-export the ref type for consumers
export type { AvakioMultiComboRef };
