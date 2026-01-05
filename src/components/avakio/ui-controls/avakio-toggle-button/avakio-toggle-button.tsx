import React, { forwardRef, useImperativeHandle, useState, useRef, useEffect, useCallback } from 'react';
import './avakio-toggle-button.css';

export type AvakioToggleButtonTheme = 'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset';
export type AvakioToggleButtonSize = 'sm' | 'md' | 'lg';
export type AvakioToggleButtonType = 'default' | 'icon' | 'iconTop' | 'image' | 'imageTop';

export interface AvakioToggleButtonProps {
  /** Unique identifier */
  id?: string;
  /** Test ID for testing purposes */
  testId?: string;
  /** Name for form submission */
  name?: string;
  /** Current pressed state (controlled) */
  value?: boolean;
  /** Default pressed state (uncontrolled) */
  defaultValue?: boolean;
  /** Label text (same for both states) */
  label?: string;
  /** Label when pressed/on */
  onLabel?: string;
  /** Label when unpressed/off */
  offLabel?: string;
  /** Icon (same for both states) */
  icon?: React.ReactNode;
  /** Icon when pressed/on */
  onIcon?: React.ReactNode;
  /** Icon when unpressed/off */
  offIcon?: React.ReactNode;
  /** Image URL (same for both states) */
  image?: string;
  /** Image URL when pressed/on */
  onImage?: string;
  /** Image URL when unpressed/off */
  offImage?: string;
  /** Button type/layout */
  type?: AvakioToggleButtonType;
  /** Button size */
  size?: AvakioToggleButtonSize;
  /** Theme variant */
  theme?: AvakioToggleButtonTheme;
  /** Disabled state */
  disabled?: boolean;
  /** Auto-adjust width to content */
  autowidth?: boolean;
  /** Full width button */
  block?: boolean;
  /** Tooltip text */
  tooltip?: string;
  /** Keyboard hotkey (e.g., 'ctrl+t') */
  hotkey?: string;
  /** CSS class name */
  className?: string;
  /** Inline styles */
  css?: React.CSSProperties;
  /** Width */
  width?: number | string;
  /** Height */
  height?: number | string;
  /** Padding (number for all sides, string for CSS, or [top, right, bottom, left]) */
  padding?: string | number | [number, number, number, number];
  /** Margin (number for all sides, string for CSS, or [top, right, bottom, left]) */
  margin?: string | number | [number, number, number, number];
  /** Minimum width */
  minWidth?: string | number;
  /** Minimum height */
  minHeight?: string | number;
  /** Whether the component is borderless */
  borderless?: boolean;
  /** Whether the component is hidden */
  hidden?: boolean;
  /** Maximum height */
  maxHeight?: number | string;
  /** Maximum width */
  maxWidth?: number | string;
  /** Callback when value changes */
  onChange?: (value: boolean) => void;
  /** Callback when clicked */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Callback when focused */
  onFocus?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  /** Callback when blurred */
  onBlur?: (e: React.FocusEvent<HTMLButtonElement>) => void;
}

export interface AvakioToggleButtonRef {
  /** Get the current pressed state */
  getValue: () => boolean;
  /** Set the pressed state */
  setValue: (value: boolean) => void;
  /** Toggle the state */
  toggle: () => void;
  /** Focus the button */
  focus: () => void;
  /** Blur the button */
  blur: () => void;
  /** Enable the button */
  enable: () => void;
  /** Disable the button */
  disable: () => void;
  /** Check if enabled */
  isEnabled: () => boolean;
  /** Get the HTML element */
  getNode: () => HTMLButtonElement | null;
}

export const AvakioToggleButton = forwardRef<AvakioToggleButtonRef, AvakioToggleButtonProps>(
  (
    {
      id,
      testId,
      name,
      value,
      defaultValue = false,
      label,
      onLabel,
      offLabel,
      icon,
      onIcon,
      offIcon,
      image,
      onImage,
      offImage,
      type = 'default',
      size = 'md',
      theme,
      disabled: disabledProp = false,
      autowidth = false,
      block = false,
      tooltip,
      hotkey,
      className = '',
      css,
      width,
      height,
      padding,
      margin,
      minWidth,
      minHeight,
      onChange,
      onClick,
      onFocus,
      onBlur,
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState<boolean>(defaultValue);
    const [disabled, setDisabled] = useState<boolean>(disabledProp);

    const isPressed = isControlled ? value : internalValue;

    // Sync disabled prop
    useEffect(() => {
      setDisabled(disabledProp);
    }, [disabledProp]);

    // Handle hotkey
    useEffect(() => {
      if (!hotkey || disabled) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        const keys = hotkey.toLowerCase().split('+');
        const ctrl = keys.includes('ctrl') || keys.includes('control');
        const shift = keys.includes('shift');
        const alt = keys.includes('alt');
        const key = keys[keys.length - 1];

        if (
          (ctrl === (e.ctrlKey || e.metaKey)) &&
          shift === e.shiftKey &&
          alt === e.altKey &&
          e.key.toLowerCase() === key
        ) {
          e.preventDefault();
          handleToggle();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [hotkey, disabled]);

    const handleToggle = useCallback(() => {
      if (disabled) return;

      const newValue = !isPressed;
      
      if (!isControlled) {
        setInternalValue(newValue);
      }
      
      onChange?.(newValue);
    }, [disabled, isPressed, isControlled, onChange]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      handleToggle();
      onClick?.(e);
    };

    // Expose imperative methods
    useImperativeHandle(ref, () => ({
      getValue: () => isPressed,
      setValue: (val: boolean) => {
        if (!isControlled) {
          setInternalValue(val);
        }
        onChange?.(val);
      },
      toggle: handleToggle,
      focus: () => buttonRef.current?.focus(),
      blur: () => buttonRef.current?.blur(),
      enable: () => setDisabled(false),
      disable: () => setDisabled(true),
      isEnabled: () => !disabled,
      getNode: () => buttonRef.current,
    }), [isPressed, isControlled, disabled, onChange, handleToggle]);

    // Determine current label
    const currentLabel = isPressed
      ? (onLabel ?? label)
      : (offLabel ?? label);

    // Determine current icon
    const currentIcon = isPressed
      ? (onIcon ?? icon)
      : (offIcon ?? icon);

    // Determine current image
    const currentImage = isPressed
      ? (onImage ?? image)
      : (offImage ?? image);

    // Build style object
    const paddingStyle = padding
      ? typeof padding === 'number'
        ? `${padding}px`
        : Array.isArray(padding)
        ? `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`
        : padding
      : undefined;

    const marginStyle = margin
      ? typeof margin === 'number'
        ? `${margin}px`
        : Array.isArray(margin)
        ? `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`
        : margin
      : undefined;

    const style: React.CSSProperties = {
      ...(css && typeof css === 'object' && !Array.isArray(css) ? css : {}),
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      padding: paddingStyle,
      margin: marginStyle,
    };

    // Build class names
    const buttonTypeClass = type === 'icon' ? 'icon' : type === 'iconTop' ? 'icon-top' : type === 'image' ? 'image' : type === 'imageTop' ? 'image-top' : 'default';

    const classes = [
      'avakio-toggle-button',
      `avakio-toggle-button-${size}`,
      `avakio-toggle-button-type-${buttonTypeClass}`,
      isPressed && 'avakio-toggle-button-pressed',
      disabled && 'avakio-toggle-button-disabled',
      block && 'avakio-toggle-button-block',
      autowidth && 'avakio-toggle-button-autowidth',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={buttonRef}
        id={id}
        data-testid={testId}
        data-admin-theme={theme}
        name={name}
        type="button"
        className={classes}
        style={style}
        disabled={disabled}
        title={tooltip}
        aria-pressed={isPressed}
        onClick={handleClick}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <span className="avakio-toggle-button-inner">
          {currentImage && (
            <img
              src={currentImage}
              alt=""
              className="avakio-toggle-button-image"
            />
          )}
          {currentIcon && (
            <span className="avakio-toggle-button-icon">{currentIcon}</span>
          )}
          {currentLabel && (
            <span className="avakio-toggle-button-label">{currentLabel}</span>
          )}
          {hotkey && (
            <span className="avakio-toggle-button-hotkey">{hotkey}</span>
          )}
        </span>
      </button>
    );
  }
);

AvakioToggleButton.displayName = 'AvakioToggleButton';











