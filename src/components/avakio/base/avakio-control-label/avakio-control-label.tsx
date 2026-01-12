import React from 'react';
import './avakio-control-label.css';

export interface AvakioControlLabelProps {
  /** Sets the text of the label (styled with background color) */
  label?: string;
  /** Form label displayed above the component */
  labelForm?: string;
  /** Positions a label in relation to the control */
  labelPosition?: 'left' | 'top' | 'right' | 'bottom';
  /** The alignment of a label inside its container */
  labelAlign?: 'left' | 'center' | 'right';
  /** The width of the label */
  labelWidth?: number | string;
  /** Sets a label under the control */
  bottomLabel?: string;
  /** Marks field as required (shows asterisk) */
  required?: boolean;
  /** Marks the component as invalid */
  invalid?: boolean;
  /** Sets the text of a validation message */
  invalidMessage?: string;
  /** CSS class prefix for styling (e.g., 'avakio-dp', 'avakio-richselect') */
  classPrefix: string;
  /** The control content to wrap */
  children: React.ReactNode;
  /** Additional wrapper class name */
  wrapperClassName?: string;
  /** Additional wrapper style */
  wrapperStyle?: React.CSSProperties;
  /** Additional label style */
  labelStyle?: React.CSSProperties;
  /** Size of the control ('default' | 'compact') */
  size?: 'default' | 'compact';
}

/**
 * AvakioControlLabel - A shared label wrapper component for form controls.
 * Provides consistent label rendering with support for:
 * - Styled labels with background color (left, right, top, bottom position)
 * - Form labels (plain text)
 * - Bottom labels (help text)
 * - Required field indicator
 */
export function AvakioControlLabel({
  label,
  labelForm,
  labelPosition = 'left',
  labelAlign = 'left',
  labelWidth = 100,
  bottomLabel,
  required = false,
  invalid = false,
  invalidMessage,
  classPrefix,
  children,
  wrapperClassName = '',
  wrapperStyle,
  labelStyle: externalLabelStyle,
  size = 'default',
}: AvakioControlLabelProps) {
  // Determine if position is horizontal or vertical
  const isHorizontal = labelPosition === 'left' || labelPosition === 'right';
  const isVertical = labelPosition === 'top' || labelPosition === 'bottom';

  // Helper to convert labelWidth to CSS value
  const getLabelWidthCss = (width: number | string | undefined): string | undefined => {
    if (width === undefined) return undefined;
    if (typeof width === 'number') return `${width}px`;
    // If string is a pure number, add px
    if (/^\d+$/.test(width)) return `${width}px`;
    return width;
  };

  // Calculate label style based on props
  const labelStyle: React.CSSProperties = {
    width: getLabelWidthCss(labelWidth),
    justifyContent: labelAlign === 'center' ? 'center' : labelAlign === 'right' ? 'flex-end' : 'flex-start',
    textAlign: labelAlign,
    ...externalLabelStyle,
  };

  // Calculate labelForm style based on props
  const labelFormStyle: React.CSSProperties = {
    width: getLabelWidthCss(labelWidth),
    justifyContent: labelAlign === 'center' ? 'center' : labelAlign === 'right' ? 'flex-end' : 'flex-start',
    textAlign: labelAlign,
  };

  // Wrapper class based on position
  const innerWrapperClass = `avakio-control-label-wrapper ${
    isVertical ? 'avakio-control-label-wrapper-vertical' : ''
  } avakio-control-label-wrapper-${labelPosition} ${wrapperClassName}`;

  // Outer wrapper class for when labelForm is present
  const outerWrapperClass = labelForm 
    ? `avakio-control-label-outer avakio-control-label-outer-${isHorizontal ? 'horizontal' : 'vertical'}` 
    : '';

  // Size class for compact mode
  const sizeClass = size === 'compact' ? 'avakio-control-label-compact' : '';

  // Render the styled label element
  const renderLabel = () => label && (
    <div
      className={`avakio-control-label-label avakio-control-label-label-${labelPosition} ${sizeClass} ${classPrefix}-label`}
      style={labelStyle}
    >
      {label}
      {required && <span className={`avakio-control-label-required ${classPrefix}-required`}>*</span>}
    </div>
  );

  // Render the labelForm element
  const renderLabelForm = () => labelForm && (
    <div 
      className={`avakio-control-label-form avakio-control-label-form-${labelPosition} ${classPrefix}-label-form ${classPrefix}-label-form-${labelPosition}`}
      style={labelFormStyle}
    >
      {labelForm}
      {required && !label && <span className={`avakio-control-label-required ${classPrefix}-required`}>*</span>}
    </div>
  );

  const content = (
    <>
      {/* Form label when position is top - render above everything */}
      {labelPosition === 'top' && renderLabelForm()}
      
      {/* Inner wrapper containing styled label + control */}
      <div className={innerWrapperClass} style={wrapperStyle}>
        {/* Form label when position is left - render inside wrapper as first element */}
        {labelPosition === 'left' && renderLabelForm()}
        
        {/* Styled label - render before control for left/top positions */}
        {(labelPosition === 'left' || labelPosition === 'top') && renderLabel()}
        
        {/* Control content */}
        {children}
        
        {/* Styled label - render after control for right/bottom positions */}
        {(labelPosition === 'right' || labelPosition === 'bottom') && renderLabel()}
        
        {/* Form label when position is right - render inside wrapper as last element */}
        {labelPosition === 'right' && renderLabelForm()}
      </div>
      
      {/* Form label when position is bottom - render below everything */}
      {labelPosition === 'bottom' && renderLabelForm()}
    </>
  );

  // Bottom content that should always render below the main control
  const bottomContent = (
    <>
      {/* Bottom label (help text) */}
      {bottomLabel && (
        <div className={`avakio-control-label-bottom ${classPrefix}-bottom-label`}>
          {bottomLabel}
        </div>
      )}
      
      {/* Invalid message */}
      {invalid && invalidMessage && (
        <div className={`avakio-control-label-invalid-message ${classPrefix}-invalid-message`}>
          {invalidMessage}
        </div>
      )}
    </>
  );

  // Always wrap in a column container to ensure bottom content renders below
  return (
    <div className="avakio-control-label-container">
      {outerWrapperClass ? (
        <div className={outerWrapperClass}>{content}</div>
      ) : (
        content
      )}
      {bottomContent}
    </div>
  );
}

export default AvakioControlLabel;
