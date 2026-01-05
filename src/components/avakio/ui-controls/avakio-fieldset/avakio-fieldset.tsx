import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect, ReactNode } from 'react';
import './avakio-fieldset.css';

export type AvakioFieldsetTheme = 'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset';

export interface AvakioFieldsetProps {
  /** Unique identifier */
  id?: string;
  /** Test ID for testing purposes */
  testId?: string;
  /** Legend/label text for the fieldset */
  label?: string;
  /** Body content of the fieldset */
  children?: ReactNode;
  /** Whether to hide borders */
  borderless?: boolean;
  /** Theme variant */
  theme?: AvakioFieldsetTheme;
  /** Disabled state - dims the fieldset */
  disabled?: boolean;
  /** Width of the fieldset */
  width?: number | string;
  /** Height of the fieldset */
  height?: number | string;
  /** Minimum width */
  minWidth?: number | string;
  /** Minimum height */
  minHeight?: number | string;
  /** Horizontal padding (left and right) */
  paddingX?: number;
  /** Vertical padding (top and bottom) */
  paddingY?: number;
  /** Custom CSS styles */
  css?: React.CSSProperties;
  /** Additional CSS class name */
  className?: string;
  /** Whether the fieldset is collapsible */
  collapsible?: boolean;
  /** Default collapsed state (only if collapsible) */
  defaultCollapsed?: boolean;
  /** Controlled collapsed state */
  collapsed?: boolean;
  /** Callback when collapsed state changes */
  onCollapse?: (collapsed: boolean) => void;
  /** Icon to display before the label */
  icon?: ReactNode;
}

export interface AvakioFieldsetRef {
  /** Get the fieldset DOM node */
  getNode: () => HTMLFieldSetElement | null;
  /** Get the body container */
  getBody: () => HTMLDivElement | null;
  /** Check if fieldset is enabled */
  isEnabled: () => boolean;
  /** Enable the fieldset */
  enable: () => void;
  /** Disable the fieldset */
  disable: () => void;
  /** Collapse the fieldset (if collapsible) */
  collapse: () => void;
  /** Expand the fieldset (if collapsible) */
  expand: () => void;
  /** Check if collapsed */
  isCollapsed: () => boolean;
  /** Toggle collapsed state */
  toggle: () => void;
}

export const AvakioFieldset = forwardRef<AvakioFieldsetRef, AvakioFieldsetProps>(
  (
    {
      id,
      testId,
      label,
      children,
      borderless = false,
      theme,
      disabled: disabledProp = false,
      width,
      height,
      minWidth,
      minHeight,
      paddingX = 18,
      paddingY = 16,
      css,
      className = '',
      collapsible = false,
      defaultCollapsed = false,
      collapsed: collapsedProp,
      onCollapse,
      icon,
    },
    ref
  ) => {
    const fieldsetRef = useRef<HTMLFieldSetElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);
    
    const [disabled, setDisabled] = useState(disabledProp);
    const isControlledCollapse = collapsedProp !== undefined;
    const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
    
    const isCollapsed = isControlledCollapse ? collapsedProp : internalCollapsed;

    // Sync disabled prop
    useEffect(() => {
      setDisabled(disabledProp);
    }, [disabledProp]);

    // Handle collapse toggle
    const handleCollapseToggle = () => {
      if (!collapsible) return;
      
      const newCollapsed = !isCollapsed;
      if (!isControlledCollapse) {
        setInternalCollapsed(newCollapsed);
      }
      onCollapse?.(newCollapsed);
    };

    // Expose imperative methods
    useImperativeHandle(ref, () => ({
      getNode: () => fieldsetRef.current,
      getBody: () => bodyRef.current,
      isEnabled: () => !disabled,
      enable: () => setDisabled(false),
      disable: () => setDisabled(true),
      collapse: () => {
        if (!collapsible) return;
        if (!isControlledCollapse) {
          setInternalCollapsed(true);
        }
        onCollapse?.(true);
      },
      expand: () => {
        if (!collapsible) return;
        if (!isControlledCollapse) {
          setInternalCollapsed(false);
        }
        onCollapse?.(false);
      },
      isCollapsed: () => isCollapsed,
      toggle: () => handleCollapseToggle(),
    }), [disabled, isCollapsed, isControlledCollapse, collapsible, onCollapse]);

    // Build class names
    const containerClassNames = [
      'avakio-fieldset',
      theme && `avakio-fieldset-theme-${theme}`,
      borderless && 'avakio-fieldset-borderless',
      disabled && 'avakio-fieldset-disabled',
      collapsible && 'avakio-fieldset-collapsible',
      isCollapsed && 'avakio-fieldset-collapsed',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Build styles
    const containerStyles: React.CSSProperties = {
      ...(css && typeof css === 'object' && !Array.isArray(css) ? css : {}),
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
    };

    const bodyStyles: React.CSSProperties = {
      paddingLeft: `${paddingX}px`,
      paddingRight: `${paddingX}px`,
      paddingTop: `${paddingY}px`,
      paddingBottom: `${paddingY}px`,
    };

    return (
      <fieldset
        ref={fieldsetRef}
        id={id}
        data-testid={testId}
        data-admin-theme={theme}
        className={containerClassNames}
        style={containerStyles}
        disabled={disabled}
      >
        {label && (
          <legend 
            className={`avakio-fieldset-legend ${collapsible ? 'avakio-fieldset-legend-clickable' : ''}`}
            onClick={collapsible ? handleCollapseToggle : undefined}
          >
            {collapsible && (
              <span className="avakio-fieldset-collapse-icon">
                <svg 
                  width="12" 
                  height="12" 
                  viewBox="0 0 12 12" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className={`avakio-fieldset-chevron ${isCollapsed ? 'avakio-fieldset-chevron-collapsed' : ''}`}
                >
                  <path 
                    d="M3 4.5L6 7.5L9 4.5" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
            {icon && <span className="avakio-fieldset-icon">{icon}</span>}
            <span className="avakio-fieldset-label-text">{label}</span>
          </legend>
        )}
        <div 
          ref={bodyRef}
          className="avakio-fieldset-body"
          style={bodyStyles}
        >
          {children}
        </div>
      </fieldset>
    );
  }
);

AvakioFieldset.displayName = 'AvakioFieldset';

export default AvakioFieldset;











