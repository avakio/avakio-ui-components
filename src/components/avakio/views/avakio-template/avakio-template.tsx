import React, { forwardRef, useImperativeHandle, useState, useRef, useEffect } from 'react';

function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (typeof a !== 'object' || a === null || b === null) return false;
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  for (const key of aKeys) {
    if (!bKeys.includes(key) || !deepEqual(a[key], b[key])) return false;
  }
  return true;
}
import { AvakioChangeEvent } from '../../base/avakio-base-props';
import './avakio-template.css';

export type AvakioTemplateTheme = 'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset';
export type AvakioTemplateBorderType = 'space' | 'wide' | 'clean' | 'line' | 'material';
export type AvakioTemplateType = 'header' | 'section' | 'clean';

export interface AvakioTemplateProps {
  /** Template string or function that returns HTML/JSX */
  template?: string | ((data: any) => React.ReactNode);
  
  /** Data object to populate the template */
  data?: Record<string, any>;
  
  /** Direct HTML content (alternative to template) */
  content?: React.ReactNode;
  
  /** URL to load content from */
  url?: string;
  
  /** Theme to apply */
  theme?: AvakioTemplateTheme;
  
  /** Border type */
  borderType?: AvakioTemplateBorderType;
  
  /** Template type (header, section, clean) */
  type?: AvakioTemplateType;
  
  /** Whether to remove borders */
  borderless?: boolean;
  
  /** Auto-height based on content */
  autoheight?: boolean;
  
  /** Enable scrolling */
  scroll?: boolean | 'x' | 'y' | 'xy';
  
  /** Width of the template */
  width?: number | string;
  
  /** Height of the template */
  height?: number | string;
  
  /** Minimum width */
  minWidth?: number | string;
  
  /** Minimum height */
  minHeight?: number | string;
  
  /** Maximum width */
  maxWidth?: number | string;
  
  /** Maximum height */
  maxHeight?: number | string;
  
  /** Padding around content - can be a number (all sides), string, or array [top, right, bottom, left] */
  padding?: number | string | [number, number, number, number];
  
  /** Margin around template - can be a number (all sides), string, or array [top, right, bottom, left] */
  margin?: number | string | [number, number, number, number];
  
  /** Custom CSS class */
  className?: string;
  
  /** Custom CSS styles */
  css?: React.CSSProperties;
  
  /** Whether the template is hidden */
  hidden?: boolean;
  
  /** Whether the template is disabled */
  disabled?: boolean;
  
  /** ID of the template */
  id?: string;
  
  /** Test ID for testing purposes */
  testId?: string;
  
  /** Callback when content is loaded */
  onLoad?: () => void;
  
  /** Callback fired when content data changes. Receives { id, value } where value is the data */
  onChange?: (event: AvakioChangeEvent<any>) => void;
  
  /** Callback on click */
  onClick?: (e: React.MouseEvent) => void;
  /** Custom inline styles for the root element */
  style?: React.CSSProperties;
  /** Horizontal alignment of content */
  align?: 'left' | 'center' | 'right';
  /** Wrap content in a flex container with flexWrap */
  flexWrap?: boolean;
}

export interface AvakioTemplateRef {
  /** Set values/data for the template */
  setValues: (data: Record<string, any>) => void;
  
  /** Get current values/data */
  getValues: () => Record<string, any>;
  
  /** Set HTML content directly */
  setHTML: (html: string) => void;
  
  /** Get current HTML content */
  getHTML: () => string;
  
  /** Refresh/re-render the template */
  refresh: () => void;
  
  /** Parse and apply new data */
  parse: (data: Record<string, any>) => void;
  
  /** Show the template */
  show: () => void;
  
  /** Hide the template */
  hide: () => void;
  
  /** Enable the template */
  enable: () => void;
  
  /** Disable the template */
  disable: () => void;
  
  /** Get the DOM node */
  getNode: () => HTMLDivElement | null;
}

export const AvakioTemplate = forwardRef<AvakioTemplateRef, AvakioTemplateProps>(
  (
    {
      template,
      data,
      content,
      url,
      theme = 'material',
      borderType = 'space',
      type = 'clean',
      borderless = false,
      autoheight = false,
      scroll = false,
      width,
      height,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      padding,
      margin,
      className = '',
      css,
      hidden = false,
      disabled = false,
      id,
      testId,
      onLoad,
      onChange,
      onClick,
      style,
      align = 'left',
      flexWrap = false,
      onBeforeRender,
      onAfterRender,
    },
    ref
  ) => {
    const [internalData, setInternalData] = useState<Record<string, any>>(data ?? {});
    const [internalHtml, setInternalHtml] = useState<string>('');
    const [isHidden, setIsHidden] = useState(hidden);
    const [isDisabled, setIsDisabled] = useState(disabled);
    const [loadedContent, setLoadedContent] = useState<string>('');
    const containerRef = useRef<HTMLDivElement>(null);
    const onLoadRef = useRef(onLoad);

    // Event refs for onBeforeRender/onAfterRender
    const onBeforeRenderRef = useRef(onBeforeRender);
    const onAfterRenderRef = useRef(onAfterRender);
    useEffect(() => { onBeforeRenderRef.current = onBeforeRender; }, [onBeforeRender]);
    useEffect(() => { onAfterRenderRef.current = onAfterRender; }, [onAfterRender]);

    // Keep onLoad ref in sync
    useEffect(() => {
      onLoadRef.current = onLoad;
    }, [onLoad]);

    // Sync hidden and disabled props (only update if changed)
    useEffect(() => {
      setIsHidden(prev => {
        if (prev !== hidden) return hidden;
        return prev;
      });
    }, [hidden]);

    useEffect(() => {
      setIsDisabled(prev => {
        if (prev !== disabled) return disabled;
        return prev;
      });
    }, [disabled]);

    // Load content from URL
    useEffect(() => {
      if (url) {
        fetch(url)
          .then((res) => res.text())
          .then((html) => {
            setLoadedContent(html);
            onLoadRef.current?.();
          })
          .catch((err) => console.error('Failed to load template from URL:', err));
      }
    }, [url]);

    // Update internal data when prop changes (deep compare with state, only if changed)
    // Normalize undefined to {} for comparison to prevent infinite loops
    useEffect(() => {
      const normalizedData = data ?? {};
      if (!deepEqual(internalData, normalizedData)) {
        setInternalData(normalizedData);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    // Process template with data
    const processTemplate = (tmpl: string, dataObj: Record<string, any>): string => {
      return tmpl.replace(/#(\w+)#/g, (match, key) => {
        return dataObj[key] !== undefined ? String(dataObj[key]) : match;
      });
    };

    // Render content based on template, content, or URL
    // Fire onBeforeRender and onAfterRender only once on mount, matching AvakioText
    React.useLayoutEffect(() => {
      if (onBeforeRenderRef.current) {
        try {
          onBeforeRenderRef.current();
        } catch (err) {
          console.error('Error in onBeforeRender:', err);
        }
      }
      if (onAfterRenderRef.current) {
        try {
          onAfterRenderRef.current();
        } catch (err) {
          console.error('Error in onAfterRender:', err);
        }
      }
    }, []);

    const renderContent = () => {
      let rendered = null;
      // If HTML was set via setHTML
      if (internalHtml) {
        rendered = <div dangerouslySetInnerHTML={{ __html: internalHtml }} />;
      } else if (loadedContent) {
        rendered = <div dangerouslySetInnerHTML={{ __html: processTemplate(loadedContent, internalData) }} />;
      } else if (typeof template === 'function') {
        rendered = template(internalData);
      } else if (typeof template === 'string') {
        const processedHtml = processTemplate(template, internalData);
        rendered = <div dangerouslySetInnerHTML={{ __html: processedHtml }} />;
      } else if (content) {
        rendered = content;
      }
      return rendered;
    };

    // Imperative handle for ref methods
    useImperativeHandle(ref, () => ({
      setValues: (newData: Record<string, any>) => {
        setInternalData(newData);
        onChange?.({ id: id || '0', value: newData });
      },
      getValues: () => internalData,
      setHTML: (html: string) => {
        setInternalHtml(html);
      },
      getHTML: () => {
        return containerRef.current?.innerHTML || '';
      },
      refresh: () => {
        setInternalData({ ...internalData });
      },
      parse: (newData: Record<string, any>) => {
        setInternalData(newData);
        onChange?.({ id: id || '0', value: newData });
      },
      show: () => {
        setIsHidden(false);
      },
      hide: () => {
        setIsHidden(true);
      },
      enable: () => {
        setIsDisabled(false);
      },
      disable: () => {
        setIsDisabled(true);
      },
      getNode: () => containerRef.current,
    }));

    // Build CSS classes
    const classes = [
      'avakio-template',
      `avakio-template-theme-${theme}`,
      `avakio-template-border-${borderType}`,
      `avakio-template-type-${type}`,
      borderless ? 'avakio-template-borderless' : '',
      autoheight ? 'avakio-template-autoheight' : '',
      scroll === true || scroll === 'xy' ? 'avakio-template-scroll-xy' : '',
      scroll === 'x' ? 'avakio-template-scroll-x' : '',
      scroll === 'y' ? 'avakio-template-scroll-y' : '',
      isHidden ? 'avakio-template-hidden' : '',
      isDisabled ? 'avakio-template-disabled' : '',
      (width === '100%' || height === '100%') ? 'avakio-fill-container' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Build inline styles
    const styles: React.CSSProperties = {
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth,
      minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
      maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
      maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
      padding: Array.isArray(padding) 
        ? `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`
        : typeof padding === 'number' ? `${padding}px` : padding,
      margin: Array.isArray(margin) 
        ? `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`
        : typeof margin === 'number' ? `${margin}px` : margin,
      ...(css && typeof css === 'object' && !Array.isArray(css) ? css : {}),
      ...style,
    };

    return (
      <div
        ref={containerRef}
        id={id}
        data-testid={testId}
        className={classes}
        style={styles}
        onClick={onClick}
      >
        <div className={`avakio-template-content avakio-template-align-${align}`}>
          {flexWrap ? (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>{renderContent()}</div>
          ) : (
            renderContent()
          )}
        </div>
      </div>
    );
  }
);

AvakioTemplate.displayName = 'AvakioTemplate';








