import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { 
  AvakioBaseProps, 
  AvakioBaseRef, 
  useAvakioBase,
  computeBaseStyles 
} from '../../base/avakio-base-props';
import './avakio-button.css';

export type AvakioButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type AvakioButtonSize = 'sm' | 'md' | 'lg';
export type AvakioButtonType = 'default' | 'icon' | 'iconButton' | 'iconTop';
export type AvakioButtonAlign = 'left' | 'center' | 'right';
export type AvakioButtonTheme = 'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset';

export interface AvakioButtonProps extends AvakioBaseProps {
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
  /** Button type/layout */
  buttonType?: AvakioButtonType;
  /** Text alignment */
  align?: AvakioButtonAlign;
  /** Width of the button element */
  buttonWidth?: number | string;
  /** Height of the button element */
  buttonHeight?: number | string;
  /** Text alignment inside the button */
  textAlign?: 'left' | 'center' | 'right';
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
  /** Theme variant */
  theme?: AvakioButtonTheme;
  /** Button HTML type */
  type?: 'button' | 'submit' | 'reset';
  /** Children content (overrides label) */
  children?: React.ReactNode;
  /** onClick handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** onMouseEnter handler */
  onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** onMouseLeave handler */
  onMouseLeave?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** onKeyDown handler */
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  /** onKeyUp handler */
  onKeyUp?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}

export const AvakioButton = forwardRef<AvakioBaseRef, AvakioButtonProps>(function AvakioButton(props, ref) {
  const {
    label,
    icon,
    iconRight,
    variant = 'primary',
    size = 'md',
    block = false,
    loading = false,
    badge,
    className = '',
    children,
    autowidth = false,
    buttonType = 'default',
    align = 'center',
    buttonWidth,
    buttonHeight,
    textAlign,
    image,
    hotkey,
    popup,
    value,
    name,
    theme,
    type = 'button',
    onClick,
    onMouseEnter,
    onMouseLeave,
    onKeyDown,
    onKeyUp,
    ...baseProps
  } = props;

  const buttonRef = useRef<HTMLButtonElement>(null);

  // Use base hook for common functionality
  const {
    rootRef: containerRef,
    inputRef: elementRef,
    isDisabled: baseIsDisabled,
    isHidden: baseIsHidden,
    config,
    methods,
    eventHandlers,
  } = useAvakioBase({
    disabled: baseProps.disabled,
    hidden: baseProps.hidden,
    onFocus: baseProps.onFocus,
    onBlur: baseProps.onBlur,
    onItemClick: onClick,
  });

  // Merge config from define() with baseProps
  const mergedProps = { ...baseProps, ...config };

  // Handle disabled state: check both hook state and config overrides
  const isDisabled = (config.disabled !== undefined ? config.disabled : baseIsDisabled) || loading;
  
  // Handle hidden state: check both hook state and config overrides
  const isHidden = config.hidden !== undefined ? config.hidden : baseIsHidden;

  // Expose imperative methods via ref
  useImperativeHandle(ref, () => ({
    ...methods,
    blur: () => buttonRef.current?.blur(),
    focus: () => buttonRef.current?.focus(),
    getElement: () => buttonRef.current,
    getText: () => children?.toString() || label || '',
    getValue: () => undefined,
    setValue: () => {},
    validate: () => true,
  }));

  // Handle hotkey
  React.useEffect(() => {
    if (!hotkey) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isDisabled) return;
      
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
  }, [hotkey, isDisabled]);

  const buttonTypeClass = buttonType === 'icon' || buttonType === 'iconButton' ? 'icon' : buttonType === 'iconTop' ? 'icon-top' : 'default';

  // Compute base styles from merged props (original + config from define())
  const baseStyles = computeBaseStyles({ ...mergedProps, hidden: isHidden });

  // Add text-align to container style based on align prop
  const containerStyle: React.CSSProperties = {
    ...baseStyles,
    textAlign: align,
  };

  return (
    <div ref={containerRef} style={containerStyle}>
      <button
        ref={(el) => {
          buttonRef.current = el;
          if (el) {
            (elementRef as React.MutableRefObject<HTMLButtonElement>).current = el;
          }
        }}
        id={mergedProps.id}
        data-testid={mergedProps.testId}
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
          mergedProps.borderless ? 'avakio-button-borderless' : '',
          className,
        ].filter(Boolean).join(' ')}
        style={{
          width: typeof buttonWidth === 'number' ? `${buttonWidth}px` : buttonWidth,
          height: typeof buttonHeight === 'number' ? `${buttonHeight}px` : buttonHeight,
          textAlign: textAlign,
        }}
        disabled={isDisabled}
        title={mergedProps.tooltip}
        value={value}
        name={name}
        type={type}
        onClick={onClick}
        onFocus={eventHandlers.onFocus}
        onBlur={eventHandlers.onBlur}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
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
    </div>
  );
});











