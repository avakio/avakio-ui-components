import React, { forwardRef, useImperativeHandle, CSSProperties } from 'react';
import { AvakioControlLabel, AvakioControlLabelProps } from '../../base/avakio-control-label';
import { 
  AvakioBaseProps, 
  AvakioBaseRef, 
  useAvakioBase, 
  computeBaseStyles
} from '../../base/avakio-base-props';

export interface AvakioLabelProps extends 
  AvakioBaseProps, 
  Omit<AvakioControlLabelProps, 'children' | 'classPrefix' | 'wrapperClassName' | 'wrapperStyle' | 'labelStyle' | 'size'> {
  /** The text content of the label */
  text?: string;
  /** Custom HTML content (overrides text if provided) */
  html?: string;
}

export interface AvakioLabelRef extends AvakioBaseRef<string> {
  /** Set HTML content */
  setHTML: (html: string) => void;
  /** Set the label text content */
  setText: (text: string) => void;
}


export const AvakioLabel = forwardRef<AvakioLabelRef, AvakioLabelProps>(
  (props, ref) => {
    const {
      text = '',
      html,
      className = '',
      style,
      // AvakioControlLabel props
      label,
      labelForm,
      labelPosition,
      labelAlign,
      labelWidth,
      bottomLabel,
      required,
      invalid,
      invalidMessage,
      // Event handlers
      onItemClick,
      ...baseProps
    } = props;

    // Use AvakioBase hook for state management and ref methods
    const {
      rootRef,
      isDisabled,
      isHidden,
      config,
      methods,
      eventHandlers,
    } = useAvakioBase({
      disabled: baseProps.disabled,
      hidden: baseProps.hidden,
      onItemClick,
      onBlur: baseProps.onBlur,
      onFocus: baseProps.onFocus,
      onKeyPress: baseProps.onKeyPress,
      onAfterRender: baseProps.onAfterRender,
      onBeforeRender: baseProps.onBeforeRender,
      onViewShow: baseProps.onViewShow,
    });

    // Merge config from define() with baseProps
    const mergedProps = { ...baseProps, ...config };

    // Track current text and html state
    const [currentText, setCurrentText] = React.useState(text);
    const [currentHtml, setCurrentHtml] = React.useState(html);

    // Sync with prop changes
    React.useEffect(() => {
      setCurrentText(text);
    }, [text]);

    React.useEffect(() => {
      setCurrentHtml(html);
    }, [html]);

    // Expose ref methods with additional label-specific methods
    useImperativeHandle(ref, () => ({
      ...methods,
      setText: (value: string) => {
        setCurrentText(value);
        setCurrentHtml(undefined);
      },
      setHTML: (htmlContent: string) => {
        setCurrentHtml(htmlContent);
      },
      getValue: () => currentText,
      setValue: (value: string) => {
        setCurrentText(value);
        setCurrentHtml(undefined);
      },
      getElement: () => rootRef.current,
      validate: () => true,
    }));

    // Build inline styles using base styles
    const baseStyles = computeBaseStyles({ ...mergedProps, hidden: isHidden });
    const inlineStyles: CSSProperties = {
      ...baseStyles,
      ...style,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: baseProps.align === 'center' ? 'center' : baseProps.align === 'right' ? 'flex-end' : 'flex-start',
    };

    // Handle click
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDisabled) {
        eventHandlers.onClick?.(e);
      }
    };

    // Use AvakioControlLabel wrapper for consistent label/validation rendering
    return (
      <AvakioControlLabel
        label={label}
        labelAlign={labelAlign}
        labelWidth={labelWidth}
        labelPosition={labelPosition}
        labelForm={labelForm}
        bottomLabel={bottomLabel}
        required={required}
        invalid={invalid}
        invalidMessage={invalidMessage}
        classPrefix="avakio-label"
      >
        <div
          ref={rootRef}
          id={mergedProps.id}
          data-testid={mergedProps.testId}
          className={className}
          style={inlineStyles}
          title={mergedProps.tooltip}
          onClick={handleClick}
          onBlur={eventHandlers.onBlur}
          onFocus={eventHandlers.onFocus}
          onKeyPress={eventHandlers.onKeyPress}
          tabIndex={onItemClick && !isDisabled ? 0 : undefined}
        >
          {currentHtml ? (
            <div dangerouslySetInnerHTML={{ __html: currentHtml }} />
          ) : (
            <span>{currentText}</span>
          )}
        </div>
      </AvakioControlLabel>
    );
  }
);

AvakioLabel.displayName = 'AvakioLabel';












