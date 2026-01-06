import React, { forwardRef, useImperativeHandle, useRef, CSSProperties } from 'react';
import './avakio-label.css';

export interface AvakioLabelProps {
  /** Unique identifier for the label */
  id?: string;
  /** Test identifier for testing */
  testId?: string;
  /** The text content of the label */
  label?: string;
  /** Custom HTML content (overrides label if provided) */
  html?: string;
  /** Alignment of the label (left, center, right) */
  align?: 'left' | 'center' | 'right';
  /** Width of the label */
  width?: number | string;
  /** Height of the label */
  height?: number | string;
  /** Minimum width */
  minWidth?: number | string;
  /** Minimum height */
  minHeight?: number | string;
  /** Theme variant */
  theme?: 'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset';
  /** CSS class name */
  className?: string;
  /** Custom CSS styles */
  css?: CSSProperties;
  /** Tooltip text */
  tooltip?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Hidden state */
  hidden?: boolean;
  /** Click handler */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** Whether to auto-adjust width based on content */
  autowidth?: boolean;
  /** Font size */
  fontSize?: number | string;
  /** Font weight */
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  /** Text color */
  color?: string;
  /** Background color */
  backgroundColor?: string;
  /** Padding - can be a number (all sides), string, or array [top, right, bottom, left] */
  padding?: string | number | [number, number, number, number];
  /** Margin - can be a number (all sides), string, or array [top, right, bottom, left] */
  margin?: string | number | [number, number, number, number];
  /** Border */
  border?: string;
  /** Border radius */
  borderRadius?: string | number;
  /** Custom inline styles for the root element */
  style?: React.CSSProperties;
}

export interface AvakioLabelRef {
  /** Get the label text content */
  getValue: () => string;
  /** Set the label text content */
  setValue: (value: string) => void;
  /** Set HTML content */
  setHTML: (html: string) => void;
  /** Get the DOM element */
  getNode: () => HTMLDivElement | null;
  /** Hide the label */
  hide: () => void;
  /** Show the label */
  show: () => void;
  /** Check if label is visible */
  isVisible: () => boolean;
  /** Disable the label */
  disable: () => void;
  /** Enable the label */
  enable: () => void;
  /** Check if label is enabled */
  isEnabled: () => boolean;
}

export const AvakioLabel = forwardRef<AvakioLabelRef, AvakioLabelProps>(
  (
    {
      id,
      testId,
      label = '',
      html,
      align = 'left',
      width,
      height,
      theme = 'material',
      className = '',
      css = {},
      tooltip,
      disabled = false,
      hidden = false,
      onClick,
      autowidth = false,
      fontSize,
      fontWeight,
      color,
      backgroundColor,
      padding,
      margin,
      border,
      borderRadius,
      style,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentLabel, setCurrentLabel] = React.useState(label);
    const [currentHtml, setCurrentHtml] = React.useState(html);
    const [isVisible, setIsVisible] = React.useState(!hidden);
    const [isDisabled, setIsDisabled] = React.useState(disabled);

    // Expose ref methods
    useImperativeHandle(ref, () => ({
      getValue: () => currentLabel,
      setValue: (value: string) => {
        setCurrentLabel(value);
        setCurrentHtml(undefined);
      },
      setHTML: (htmlContent: string) => {
        setCurrentHtml(htmlContent);
      },
      getNode: () => containerRef.current,
      hide: () => setIsVisible(false),
      show: () => setIsVisible(true),
      isVisible: () => isVisible,
      disable: () => setIsDisabled(true),
      enable: () => setIsDisabled(false),
      isEnabled: () => !isDisabled,
    }));

    // Build CSS classes
    const classes = [
      'avakio-label',
      `avakio-label-theme-${theme}`,
      `avakio-label-align-${align}`,
      isDisabled && 'avakio-label-disabled',
      autowidth && 'avakio-label-autowidth',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Build inline styles
    const inlineStyles: CSSProperties = {
      ...(css && typeof css === 'object' && !Array.isArray(css) ? css : {}),
      width: autowidth ? 'auto' : width,
      height,
      fontSize,
      fontWeight,
      color,
      backgroundColor,
      padding: Array.isArray(padding) 
        ? `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`
        : typeof padding === 'number' ? `${padding}px` : padding,
      margin: Array.isArray(margin) 
        ? `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`
        : typeof margin === 'number' ? `${margin}px` : margin,
      border,
      borderRadius,
      display: isVisible ? undefined : 'none',
      ...style,
    };

    // Handle click
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDisabled && onClick) {
        onClick(e);
      }
    };

    return (
      <div
        ref={containerRef}
        id={id}
        data-testid={testId}
        className={classes}
        style={inlineStyles}
        title={tooltip}
        onClick={handleClick}
      >
        {currentHtml ? (
          <div dangerouslySetInnerHTML={{ __html: currentHtml }} />
        ) : (
          <span>{currentLabel}</span>
        )}
      </div>
    );
  }
);

AvakioLabel.displayName = 'AvakioLabel';











