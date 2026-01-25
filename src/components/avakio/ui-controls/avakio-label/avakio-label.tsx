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
      borderless = true,
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
      ...baseProps
    } = props;

    // Use AvakioBase hook for state management and ref methods
    const {
      rootRef,
      isDisabled,
      isHidden,
      config,
      methods,
    } = useAvakioBase({
      hidden: baseProps.hidden,
      disabled: baseProps.disabled,
      onBeforeRender: baseProps.onBeforeRender,
      onAfterRender: baseProps.onAfterRender,
      onViewShow: baseProps.onViewShow,
      onItemClick: baseProps.onItemClick,
      onViewResize: baseProps.onViewResize,
      onAfterScroll: baseProps.onAfterScroll,
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
      getText: () => {
        if (currentHtml) return currentHtml;
        return currentText;
      },
      define: (configOrKey: Partial<AvakioBaseProps> | string, value?: unknown) => {
        if (typeof configOrKey === 'string') {
          if (configOrKey === 'text') {
            setCurrentText(String(value));
            setCurrentHtml(undefined);
          } else if (configOrKey === 'html') {
            setCurrentHtml(String(value));
          } else {
            methods.define(configOrKey, value);
          }
        } else {
          if ('text' in configOrKey) {
            setCurrentText(String(configOrKey.text));
            setCurrentHtml(undefined);
          }
          if ('html' in configOrKey) {
            setCurrentHtml(String(configOrKey.html));
          }
          methods.define(configOrKey, value);
        }
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
      // Apply border directly when not borderless (uses theme color)
      ...(borderless ? {} : { border: '1px solid var(--label-border, var(--avakio-border-primary, #ccc))' }),
      // Apply disabled color and opacity
      ...(isDisabled ? { color: 'var(--label-muted, var(--avakio-text-secondary, #888))', opacity: 0.5 } : {}),
    };

    // Build CSS classes
    const labelClasses = [
      'avakio-label',
      isDisabled ? 'avakio-label-disabled' : '',
      borderless ? 'avakio-label-borderless' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Only render if not hidden
    if (isHidden) return null;
    // Use AvakioControlLabel wrapper for consistent label/validation rendering
    return (
      <div title={mergedProps.tooltip || undefined} style={{ display: 'contents' }}>
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
            className={labelClasses}
            style={inlineStyles}
          >
            {currentHtml ? (
              <div dangerouslySetInnerHTML={{ __html: currentHtml }} />
            ) : (
              <span>{currentText}</span>
            )}
          </div>
        </AvakioControlLabel>
      </div>
    );
  }
);

AvakioLabel.displayName = 'AvakioLabel';












