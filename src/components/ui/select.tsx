import React, { useState, useRef, useEffect } from 'react';

interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  disabled?: boolean;
}

interface SelectContextType {
  value: string;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SelectContext = React.createContext<SelectContextType | null>(null);

export const Select = ({ children, value, defaultValue, onValueChange, disabled }: SelectProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const [open, setOpen] = useState(false);
  
  const currentValue = value !== undefined ? value : internalValue;
  
  const handleValueChange = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
    setOpen(false);
  };

  return (
    <SelectContext.Provider value={{ value: currentValue, onValueChange: handleValueChange, open, setOpen }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {children}
      </div>
    </SelectContext.Provider>
  );
};

export const SelectTrigger = ({ children, className, ...props }: any) => {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error('SelectTrigger must be used within Select');
  
  return (
    <button
      type="button"
      className={className}
      onClick={() => context.setOpen(!context.open)}
      {...props}
    >
      {children}
    </button>
  );
};

export const SelectValue = ({ placeholder, ...props }: any) => {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error('SelectValue must be used within Select');
  
  return <span {...props}>{context.value || placeholder}</span>;
};

export const SelectContent = ({ children, className, ...props }: any) => {
  const context = React.useContext(SelectContext);
  const ref = useRef<HTMLDivElement>(null);
  
  if (!context) throw new Error('SelectContent must be used within Select');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        context.setOpen(false);
      }
    };
    
    if (context.open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [context.open]);

  if (!context.open) return null;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        zIndex: 50,
        minWidth: '8rem',
        background: 'var(--view-background-color, white)',
        border: '1px solid var(--view-border-color, #e5e7eb)',
        borderRadius: '6px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        marginTop: '4px',
        overflow: 'hidden'
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export const SelectItem = ({ children, value, className, ...props }: any) => {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error('SelectItem must be used within Select');
  
  const isSelected = context.value === value;

  return (
    <div
      className={className}
      style={{
        padding: '8px 12px',
        cursor: 'pointer',
        background: isSelected ? 'var(--view-hover-color, #f3f4f6)' : 'transparent',
        fontSize: '14px'
      }}
      onClick={() => context.onValueChange(value)}
      onMouseEnter={(e) => {
        (e.target as HTMLElement).style.background = 'var(--view-hover-color, #f3f4f6)';
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLElement).style.background = isSelected ? 'var(--view-hover-color, #f3f4f6)' : 'transparent';
      }}
      {...props}
    >
      {children}
    </div>
  );
};
