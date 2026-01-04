import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import './avakio-multicombo.css';

export interface AvakioMultiComboOption {
  value: string;
  label: string;
}

interface AvakioMultiComboProps {
  options: AvakioMultiComboOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  showCount?: boolean;
  maxDisplayItems?: number;
  disabled?: boolean;
  /** ID of the component */
  id?: string;
  /** Test ID for testing purposes */
  testId?: string;
}

export function AvakioMultiCombo({
  options,
  value = [],
  onChange,
  placeholder = "Select items...",
  className,
  showCount = false,
  maxDisplayItems = 3,
  disabled = false,
  id,
  testId
}: AvakioMultiComboProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    return options.filter(opt => value.includes(opt.value));
  }, [options, value]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
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
    if (value.includes(optionValue)) {
      onChange(value.filter(v => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const handleRemoveItem = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter(v => v !== optionValue));
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  const handleInputClick = () => {
    if (!disabled) {
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
    if (filteredOptions.length === 0) return;
    const allFilteredValues = filteredOptions.map(opt => opt.value);
    const allSelected = allFilteredValues.every(v => value.includes(v));
    
    if (allSelected) {
      // Deselect all filtered items
      onChange(value.filter(v => !allFilteredValues.includes(v)));
    } else {
      // Select all filtered items
      const newValues = Array.from(new Set([...value, ...allFilteredValues]));
      onChange(newValues);
    }
  };

  const renderSelectedItems = () => {
    if (selectedOptions.length === 0) {
      return <span className="avakio-mc-placeholder">{placeholder}</span>;
    }

    if (showCount) {
      return (
        <span className="avakio-mc-count">
          {selectedOptions.length} {selectedOptions.length === 1 ? 'item' : 'items'} selected
        </span>
      );
    }

    const displayItems = selectedOptions.slice(0, maxDisplayItems);
    const remainingCount = selectedOptions.length - maxDisplayItems;

    return (
      <div className="avakio-mc-chips">
        {displayItems.map(opt => (
          <span key={opt.value} className="avakio-mc-chip">
            <span className="avakio-mc-chip-label">{opt.label}</span>
            <button
              type="button"
              className="avakio-mc-chip-remove"
              onClick={(e) => handleRemoveItem(opt.value, e)}
              disabled={disabled}
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        {remainingCount > 0 && (
          <span className="avakio-mc-chip avakio-mc-chip-more">
            +{remainingCount} more
          </span>
        )}
      </div>
    );
  };

  const allFilteredSelected = filteredOptions.length > 0 && 
    filteredOptions.every(opt => value.includes(opt.value));

  return (
    <div 
      ref={containerRef}
      id={id}
      data-testid={testId}
      className={cn('avakio-multicombo', disabled && 'avakio-mc-disabled', className)}
    >
      {/* Input Area */}
      <div 
        className={cn(
          'avakio-mc-input-wrapper',
          isOpen && 'avakio-mc-input-wrapper-open'
        )}
        onClick={handleInputClick}
      >
        <div className="avakio-mc-input-content">
          {!isOpen && renderSelectedItems()}
          {isOpen && (
            <input
              ref={inputRef}
              type="text"
              className="avakio-mc-search-input"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder={selectedOptions.length > 0 ? "Search..." : placeholder}
              disabled={disabled}
            />
          )}
        </div>
        <div className="avakio-mc-actions">
          {value.length > 0 && !disabled && (
            <button
              type="button"
              className="avakio-mc-clear-btn"
              onClick={handleClearAll}
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            className="avakio-mc-toggle-btn"
            onClick={(e) => {
              e.stopPropagation();
              if (!disabled) {
                setIsOpen(!isOpen);
                if (!isOpen) {
                  inputRef.current?.focus();
                }
              }
            }}
            disabled={disabled}
          >
            <ChevronDown className={cn('h-4 w-4', isOpen && 'avakio-mc-toggle-open')} />
          </button>
        </div>
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <div className="avakio-mc-dropdown">
          {/* Select All Option */}
          {filteredOptions.length > 0 && (
            <div className="avakio-mc-select-all">
              <button
                type="button"
                className="avakio-mc-option"
                onClick={handleSelectAll}
              >
                <div className={cn(
                  'avakio-mc-checkbox',
                  allFilteredSelected && 'avakio-mc-checkbox-checked'
                )}>
                  {allFilteredSelected && <Check className="h-3 w-3" />}
                </div>
                <span className="avakio-mc-option-label avakio-mc-select-all-label">
                  {allFilteredSelected ? 'Deselect All' : 'Select All'}
                </span>
              </button>
            </div>
          )}

          {/* Options List */}
          <div className="avakio-mc-options">
            {filteredOptions.length > 0 ? (
              filteredOptions.map(option => {
                const isSelected = value.includes(option.value);
                return (
                  <button
                    key={option.value}
                    type="button"
                    className="avakio-mc-option"
                    onClick={() => handleToggleOption(option.value)}
                  >
                    <div className={cn(
                      'avakio-mc-checkbox',
                      isSelected && 'avakio-mc-checkbox-checked'
                    )}>
                      {isSelected && <Check className="h-3 w-3" />}
                    </div>
                    <span className="avakio-mc-option-label">{option.label}</span>
                  </button>
                );
              })
            ) : (
              <div className="avakio-mc-no-results">
                {searchQuery ? 'No matches found' : 'No options available'}
              </div>
            )}
          </div>

          {/* Footer with count */}
          {value.length > 0 && (
            <div className="avakio-mc-footer">
              {value.length} {value.length === 1 ? 'item' : 'items'} selected
            </div>
          )}
        </div>
      )}
    </div>
  );
}












