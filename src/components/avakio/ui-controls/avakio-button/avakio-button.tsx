import React, { useRef } from 'react';
import './avakio-button.css';

export type AvakioButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type AvakioButtonSize = 'sm' | 'md' | 'lg';
export type AvakioButtonType = 'default' | 'icon' | 'iconButton' | 'iconTop';
export type AvakioButtonAlign = 'left' | 'center' | 'right';
export type AvakioButtonTheme = 'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset';

export interface AvakioButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button text (children override this) */
  label?: string;
  /** Left icon */
  icon?: React.ReactNode;
  /** Right icon */
  iconRight?: React.ReactNode;
  /** Visual style variant */
  variant?: AvakioButtonVariant;
  /** Button size */
  size?: AvakioButtonSize;
  /** Full width button */
  block?: boolean;
  /** Loading state with spinner */
  loading?: boolean;
  /** Badge notification */
  badge?: string | number;
  /** Auto-adjust width to content */
  autowidth?: boolean;
  /** Tooltip text */
  tooltip?: string;
  /** Button type/layout */
  buttonType?: AvakioButtonType;
  /** Text alignment */
  align?: AvakioButtonAlign;
  /** Image URL for image button */
  image?: string;
  /** Keyboard hotkey (e.g., 'ctrl+s') */
  hotkey?: string;
  /** Popup menu ID or component */
  popup?: string | React.ReactNode;
  /** Value for form submission */
  value?: string;
  /** Name for form submission */
  name?: string;
  /** ID of the button */
  id?: string;
  /** Test ID for testing purposes */
  testId?: string;
  /** Theme variant */
  theme?: AvakioButtonTheme;
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
}

export function AvakioButton({
  label,
  icon,
  iconRight,
  variant = 'primary',
  size = 'md',
  block = false,
  loading = false,
  badge,
  disabled,
  className = '',
  children,
  autowidth = false,
  tooltip,
  buttonType = 'default',
  align = 'center',
  image,
  hotkey,
  popup,
  value,
  name,
  id,
  testId,
  theme,
  padding,
  margin,
  minWidth,
  minHeight,
  onClick,
  ...rest
}: AvakioButtonProps) {
  const isDisabled = disabled || loading;
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Handle hotkey
  React.useEffect(() => {
    if (!hotkey) return;

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
        buttonRef.current?.click();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [hotkey]);

  const buttonTypeClass = buttonType === 'icon' || buttonType === 'iconButton' ? 'icon' : buttonType === 'iconTop' ? 'icon-top' : 'default';

  // Handle padding
  const paddingStyle = padding
    ? typeof padding === 'number'
      ? `${padding}px`
      : Array.isArray(padding)
      ? `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`
      : padding
    : undefined;

  // Handle margin
  const marginStyle = margin
    ? typeof margin === 'number'
      ? `${margin}px`
      : Array.isArray(margin)
      ? `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`
      : margin
    : undefined;

  return (
    <button
      ref={buttonRef}
      id={id}
      data-testid={testId}
      data-admin-theme={theme}
      className={[
        'avakio-button',
        `avakio-button-${variant}`,
        `avakio-button-${size}`,
        `avakio-button-type-${buttonTypeClass}`,
        `avakio-button-align-${align}`,
        block ? 'avakio-button-block' : '',
        autowidth ? 'avakio-button-autowidth' : '',
        loading ? 'avakio-button-loading' : '',
        image ? 'avakio-button-image' : '',
        className,
      ].filter(Boolean).join(' ')}
      disabled={isDisabled}
      title={tooltip}
      value={value}
      name={name}
      onClick={onClick}
      style={{
        ...(paddingStyle && { padding: paddingStyle }),
        ...(marginStyle && { margin: marginStyle }),
        ...(minWidth && { minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth }),
        ...(minHeight && { minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight }),
      }}
      {...rest}
    >
      <span className="avakio-button-inner">
        {loading && <span className="avakio-button-spinner" aria-hidden />}
        {image && <img src={image} alt="" className="avakio-button-image-el" />}
        {icon && <span className="avakio-button-icon-left">{icon}</span>}
        {(children || label) && <span className="avakio-button-label">{children ?? label}</span>}
        {badge !== undefined && <span className="avakio-button-badge">{badge}</span>}
        {iconRight && <span className="avakio-button-icon-right">{iconRight}</span>}
        {hotkey && <span className="avakio-button-hotkey">{hotkey}</span>}
      </span>
      {popup && typeof popup === 'string' && <div className="avakio-button-popup-ref" data-popup={popup} />}
    </button>
  );
}











