import React, { forwardRef, useImperativeHandle, CSSProperties } from 'react';
import { AvakioControlLabel } from '../../base/avakio-control-label';
import { 
  AvakioBaseProps, 
  AvakioBaseRef, 
  useAvakioBase, 
  computeBaseStyles,
  formatSpacing,
  formatSize
} from '../../base/avakio-base-props';
import './avakio-label.css';

export interface AvakioLabelProps extends AvakioBaseProps {
  /** The text content of the label */
  text?: string;
  /** Custom HTML content (overrides text if provided) */
  html?: string;
  /** Theme variant */
  theme?: 'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset';
  /** Custom CSS styles */
  css?: CSSProperties;
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
  /** Border */
  border?: string;
  /** Border radius */
  borderRadius?: string | number;
  /** Form label displayed above the component */
  labelForm?: string;
  /** Sets a label under the control */
  bottomLabel?: string;
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
      id,
      testId,
      text = '',
      html,
      theme = 'material',
      className = '',
      css = {},
      autowidth = false,
      fontSize,
      fontWeight,
      color,
      backgroundColor,
      border,
      borderRadius,
      // ControlLabel props
      label,
      labelForm,
      bottomLabel,
      // Event handlers
      onItemClick,
    } = props;

    // Use AvakioBase hook for state management and ref methods
    const {
      rootRef,
      isDisabled,
      isHidden,
      methods,
      getRefMethods,
      eventHandlers,
    } = useAvakioBase({
      id,
      initialValue: text,
      disabled: props.disabled,
      hidden: props.hidden,
      required: props.required,
      invalid: props.invalid,
      invalidMessage: props.invalidMessage,
      onItemClick,
      onBlur: props.onBlur,
      onFocus: props.onFocus,
      onKeyPress: props.onKeyPress,
      onAfterRender: props.onAfterRender,
      onBeforeRender: props.onBeforeRender,
      onViewShow: props.onViewShow,
      getTextValue: (v) => v || '',
    });

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
      ...getRefMethods(),
      setText: (value: string) => {
        setCurrentText(value);
        setCurrentHtml(undefined);
        methods.setValue(value);
      },
      setHTML: (htmlContent: string) => {
        setCurrentHtml(htmlContent);
      },
    }));

    // Build CSS classes
    const classes = [
      'avakio-label',
      `avakio-label-theme-${theme}`,
      `avakio-label-align-${props.align || 'left'}`,
      isDisabled && 'avakio-label-disabled',
      autowidth && 'avakio-label-autowidth',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Build inline styles using base styles + label-specific styles
    const baseStyles = computeBaseStyles(props);
    const inlineStyles: CSSProperties = {
      ...baseStyles,
      ...(css && typeof css === 'object' && !Array.isArray(css) ? css : {}),
      width: autowidth ? 'auto' : baseStyles.width,
      fontSize,
      fontWeight,
      color,
      backgroundColor,
      border,
      borderRadius,
    };

    // Handle click
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDisabled) {
        eventHandlers.onClick?.(e);
      }
    };

    // Build label content
    const labelContent = (
      <div
        ref={rootRef}
        id={id}
        data-testid={testId}
        className={classes}
        style={inlineStyles}
        title={props.tooltip}
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
    );

    // If we have a control label, wrap with AvakioControlLabel
    if (label || labelForm || bottomLabel || props.required || props.invalid) {
      return (
        <AvakioControlLabel
          label={label}
          labelAlign={props.labelAlign}
          labelWidth={props.labelWidth}
          labelPosition={props.labelPosition}
          labelForm={labelForm}
          bottomLabel={bottomLabel}
          //bottomPadding={props.bottomPadding}
          required={props.required}
          invalid={props.invalid}
          invalidMessage={props.invalidMessage}
          classPrefix="avakio-label"
        >
          {labelContent}
        </AvakioControlLabel>
      );
    }

    return labelContent;
  }
);

AvakioLabel.displayName = 'AvakioLabel';












