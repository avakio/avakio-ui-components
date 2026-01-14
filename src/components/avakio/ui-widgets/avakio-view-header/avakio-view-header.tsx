import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { AvakioView } from '../../views/avakio-view/avakio-view';
import {
  AvakioBaseProps,
  AvakioBaseRef,
  useAvakioBase,
  computeBaseStyles,
  AVAKIO_BASE_DEFAULTS,
} from '../../base/avakio-base-props';

export interface AvakioViewHeaderProps extends AvakioBaseProps {
  /** Show/hide the label */
  showLabel?: boolean;
  /** Show/hide the title */
  showTitle?: boolean;
  /** Show/hide the subtitle */
  showSubTitle?: boolean;
  /** Label text */
  label?: string;
  /** Title text */
  title?: string;
  /** Subtitle text */
  subTitle?: string;
  /** Theme (material, flat, compact, dark, ocean, sunset) */
  theme?: string;
  /** Whether the header should stick to the top when scrolling */
  isSticky?: boolean;
  /** Size variant ('default' | 'compact'). Compact shows only title with max height of 50 */
  size?: 'default' | 'compact';
}

export type AvakioViewHeaderRef = AvakioBaseRef<string>;

export const AvakioViewHeader = forwardRef<AvakioViewHeaderRef, AvakioViewHeaderProps>(
  (props, ref) => {
    const {
      showLabel = true,
      showTitle = true,
      showSubTitle = true,
      label = '',
      title = '',
      subTitle = '',
      theme,
      isSticky = true,
      size = 'default',
      // Base props
      id,
      testId,
      className,
      style,
      disabled = AVAKIO_BASE_DEFAULTS.disabled,
      hidden = AVAKIO_BASE_DEFAULTS.hidden,
      borderless = AVAKIO_BASE_DEFAULTS.borderless,
      width,
      height,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      margin,
      padding,
      tooltip,
      // Event handlers
      onBlur,
      onFocus,
      onItemClick,
      onKeyPress,
      onAfterRender,
      onBeforeRender,
      onViewShow,
      onViewResize,
      onAfterScroll,
    } = props;

    // Use the base hook for common functionality
    const {
      rootRef,
      isDisabled,
      isHidden,
      getRefMethods,
      eventHandlers,
    } = useAvakioBase<string>({
      initialValue: title || label || '',
      disabled,
      hidden,
      getTextValue: () => title || label || '',
      onBlur,
      onFocus,
      onItemClick,
      onKeyPress,
      onAfterRender,
      onBeforeRender,
      onViewShow,
      onViewResize,
      onAfterScroll,
    });

    // Expose imperative methods via ref
    useImperativeHandle(ref, () => ({
      ...getRefMethods(),
      getValue: () => title || label || '',
      setValue: () => {}, // Read-only component
      getText: () => title || label || '',
    }), [getRefMethods, title, label]);

    // Mobile detection for responsive compact mode
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth <= 768);
      };
      
      // Initial check
      checkMobile();
      
      // Listen for resize
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Determine if compact mode (explicit prop or mobile auto-detection)
    const isCompact = size === 'compact' || isMobile;

    // Compute styles from base props
    const computedStyle: React.CSSProperties = {
      ...computeBaseStyles({
        style,
        hidden: isHidden,
        width,
        height: isCompact ? 30 : height,
        minWidth,
        minHeight,
        maxWidth,
        maxHeight: isCompact ? 30 : maxHeight,
        margin,
        padding,
      }),
      ...(isSticky ? { position: 'sticky' as const, top: 0, zIndex: 1000 } : {}),
      ...(isCompact ? { overflow: 'hidden' } : {}),
    };

    // Only set data-admin-theme if theme is explicitly provided
    const wrapperProps: React.HTMLAttributes<HTMLDivElement> & { 'data-admin-theme'?: string } = {};
    if (theme) {
      wrapperProps['data-admin-theme'] = theme;
    }

    return (
      <div
        ref={rootRef}
        style={computedStyle}
        title={tooltip}
        onBlur={eventHandlers.onBlur}
        onFocus={eventHandlers.onFocus}
        onClick={eventHandlers.onClick}
        onKeyDown={eventHandlers.onKeyPress}
        tabIndex={isDisabled ? -1 : 0}
        {...wrapperProps}
      >
        <AvakioView
          theme={theme as any}
          type="header"
          borderless={borderless}
          id={id}
          testId={testId}
          css={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: isCompact ? 'center' : 'flex-start',
            background: 'var(--view-focus-color)',
            color: '#ffffff',
            ...(isCompact ? { padding: '4px 12px', height: '30px', boxSizing: 'border-box' } : {}),
          }}
          className={className}
          disabled={isDisabled}
          hidden={isHidden}
        >
          <div style={{ textAlign: 'left' }}>
            {!isCompact && showLabel && label && (
              <div style={{
                margin: 0,
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: '1.5',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                color: 'inherit'
              }}>
                {label}
              </div>
            )}
            {showTitle && title && (
              <h1 style={{
                margin: 0,
                fontSize: isCompact ? '16px' : '24px',
                fontWeight: isCompact ? 500 : 600,
                letterSpacing: '0.01em',
                lineHeight: '1.2',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                WebkitFontSmoothing: 'antialiased',
                color: 'inherit'
              }}>
                {title}
              </h1>
            )}
            {!isCompact && showSubTitle && subTitle && (
              <p style={{
                margin: 0,
                marginTop: '8px',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: '1.5',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                color: 'inherit'
              }}>
                {subTitle}
              </p>
            )}
          </div>
        </AvakioView>
      </div>
    );
  }
);

AvakioViewHeader.displayName = 'AvakioViewHeader';











