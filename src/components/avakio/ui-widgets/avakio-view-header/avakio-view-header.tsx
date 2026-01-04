import React from 'react';
import { AvakioView } from '../../views/avakio-view/avakio-view';

export interface AvakioViewHeaderProps {
  /** Component ID */
  id?: string;
  /** Test ID for testing */
  testId?: string;
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
  /** Custom CSS class */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Whether the header should stick to the top when scrolling */
  isSticky?: boolean;
}

export const AvakioViewHeader: React.FC<AvakioViewHeaderProps> = ({
  id,
  testId,
  showLabel = true,
  showTitle = true,
  showSubTitle = true,
  label = '',
  title = '',
  subTitle = '',
  theme,
  className = '',
  style = {},
  isSticky = true,
}) => {
  const wrapperStyle = isSticky ? { position: 'sticky' as const, top: 0, zIndex: 1000 } : {};
  
  // Only set data-admin-theme if theme is explicitly provided
  const wrapperProps: React.HTMLAttributes<HTMLDivElement> & { 'data-admin-theme'?: string } = {
    style: wrapperStyle,
  };
  if (theme) {
    wrapperProps['data-admin-theme'] = theme;
  }
  
  return (
    <div {...wrapperProps}>
    <AvakioView
        theme={theme as any}
        type="header"
        borderless={false}
        id={id}
        testId={testId}
        css={{ 
          ...style, 
          display: 'flex', 
          justifyContent: 'flex-start', 
          alignItems: 'flex-start',
          background: 'var(--view-focus-color)',
          color: '#ffffff'
        }}
        className={className}
    >
        <div style={{ textAlign: 'left' }}>
            {showLabel && label && (
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
                    fontSize: '24px', 
                    fontWeight: 600,                    
                    letterSpacing: '0.01em',
                    lineHeight: '1.2',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    WebkitFontSmoothing: 'antialiased',
                    color: 'inherit'
                }}>
                    {title}
                </h1>
            )}
            {showSubTitle && subTitle && (
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
};

AvakioViewHeader.displayName = 'AvakioViewHeader';











