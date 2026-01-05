import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState, useCallback, ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './avakio-carousel.css';

export type AvakioCarouselTheme = 'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset';
export type NavigationType = 'side' | 'bottom';
export type NavigationPosition = 'left' | 'right' | 'center';

export interface AvakioCarouselSlide {
  id: string;
  content: ReactNode;
}

export interface AvakioCarouselNavigation {
  type?: NavigationType;
  items?: boolean;
  buttons?: boolean;
  position?: NavigationPosition;
}

export interface AvakioCarouselProps {
  id?: string;
  testId?: string;
  slides: AvakioCarouselSlide[];
  theme?: AvakioCarouselTheme;
  navigation?: AvakioCarouselNavigation;
  autoplay?: boolean;
  autoplayDelay?: number;
  scrollSpeed?: number;
  loop?: boolean;
  activeIndex?: number;
  width?: number | string;
  height?: number | string;
  css?: React.CSSProperties;
  /** Minimum width */
  minWidth?: number | string;
  /** Minimum height */
  minHeight?: number | string;
  onShow?: (id: string, index: number) => void;
  onSlideChange?: (id: string, index: number) => void;
  /** Whether the component is borderless */
  borderless?: boolean;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Whether the component is hidden */
  hidden?: boolean;
  /** Maximum height */
  maxHeight?: number | string;
  /** Maximum width */
  maxWidth?: number | string;
}

export interface AvakioCarouselRef {
  showNext: () => void;
  showPrev: () => void;
  setActive: (id: string) => void;
  setActiveIndex: (index: number) => void;
  getActiveId: () => string;
  getActiveIndex: () => number;
  addView: (slide: AvakioCarouselSlide, position?: number) => void;
  removeView: (id: string) => void;
}

export const AvakioCarousel = forwardRef<AvakioCarouselRef, AvakioCarouselProps>(
  (
    {
      id,
      testId,
      slides,
      theme = 'material',
      navigation = { type: 'bottom', items: true, buttons: true, position: 'center' },
      autoplay = false,
      autoplayDelay = 3000,
      scrollSpeed = 300,
      loop = true,
      activeIndex = 0,
      width,
      height = 400,
      css,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      borderless = false,
      disabled = false,
      hidden = false,
      onShow,
      onSlideChange,
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(activeIndex);
    const [slidesList, setSlidesList] = useState<AvakioCarouselSlide[]>(slides);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Min swipe distance (in px)
    const minSwipeDistance = 50;

    useEffect(() => {
      setSlidesList(slides);
    }, [slides]);

    const goToSlide = useCallback(
      (index: number, skipTransition = false) => {
        if (isTransitioning && !skipTransition) return;
        
        const targetIndex = Math.max(0, Math.min(index, slidesList.length - 1));
        
        if (!skipTransition) {
          setIsTransitioning(true);
          setTimeout(() => setIsTransitioning(false), scrollSpeed);
        }
        
        setCurrentIndex(targetIndex);
        
        const slide = slidesList[targetIndex];
        if (slide) {
          onShow?.(slide.id, targetIndex);
          onSlideChange?.(slide.id, targetIndex);
        }
      },
      [isTransitioning, slidesList, scrollSpeed, onShow, onSlideChange]
    );

    const showNext = useCallback(() => {
      if (currentIndex < slidesList.length - 1) {
        goToSlide(currentIndex + 1);
      } else if (loop) {
        goToSlide(0);
      }
    }, [currentIndex, slidesList.length, loop, goToSlide]);

    const showPrev = useCallback(() => {
      if (currentIndex > 0) {
        goToSlide(currentIndex - 1);
      } else if (loop) {
        goToSlide(slidesList.length - 1);
      }
    }, [currentIndex, slidesList.length, loop, goToSlide]);

    const setActive = useCallback(
      (slideId: string) => {
        const index = slidesList.findIndex(s => s.id === slideId);
        if (index !== -1) {
          goToSlide(index);
        }
      },
      [slidesList, goToSlide]
    );

    const setActiveIndex = useCallback(
      (index: number) => {
        goToSlide(index);
      },
      [goToSlide]
    );

    const getActiveId = useCallback(() => {
      return slidesList[currentIndex]?.id || '';
    }, [slidesList, currentIndex]);

    const getActiveIndex = useCallback(() => {
      return currentIndex;
    }, [currentIndex]);

    const addView = useCallback((slide: AvakioCarouselSlide, position?: number) => {
      setSlidesList(prev => {
        if (position !== undefined && position >= 0 && position <= prev.length) {
          return [...prev.slice(0, position), slide, ...prev.slice(position)];
        }
        return [...prev, slide];
      });
    }, []);

    const removeView = useCallback((slideId: string) => {
      setSlidesList(prev => {
        const newSlides = prev.filter(s => s.id !== slideId);
        if (currentIndex >= newSlides.length && newSlides.length > 0) {
          setCurrentIndex(newSlides.length - 1);
        }
        return newSlides;
      });
    }, [currentIndex]);

    useImperativeHandle(ref, () => ({
      showNext,
      showPrev,
      setActive,
      setActiveIndex,
      getActiveId,
      getActiveIndex,
      addView,
      removeView,
    }));

    // Autoplay effect
    useEffect(() => {
      if (autoplay && slidesList.length > 1) {
        autoplayTimerRef.current = setInterval(() => {
          showNext();
        }, autoplayDelay);

        return () => {
          if (autoplayTimerRef.current) {
            clearInterval(autoplayTimerRef.current);
          }
        };
      }
    }, [autoplay, autoplayDelay, showNext, slidesList.length]);

    // Touch handlers
    const onTouchStart = (e: React.TouchEvent) => {
      setTouchEnd(null);
      setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
      setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;

      if (isLeftSwipe) {
        showNext();
      }
      if (isRightSwipe) {
        showPrev();
      }
    };

    // Keyboard navigation
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
          showPrev();
        } else if (e.key === 'ArrowRight') {
          showNext();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [showNext, showPrev]);

    const containerClassName = [
      'avakio-carousel',
      `avakio-carousel-theme-${theme}`,
      borderless && 'avakio-carousel-borderless',
      disabled && 'avakio-carousel-disabled',
      hidden && 'avakio-carousel-hidden',
    ].filter(Boolean).join(' ');

    const containerStyle: React.CSSProperties = {
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      ...(css && typeof css === 'object' && !Array.isArray(css) ? css : {}),
      ...(minWidth && { minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth }),
      ...(minHeight && { minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight }),
      ...(maxWidth && { maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth }),
      ...(maxHeight && { maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight }),
      ...(hidden && { display: 'none' }),
    };

    const isSideNavigation = navigation.type === 'side';
    const showButtons = navigation.buttons !== false;
    const showItems = navigation.items !== false;

    return (
      <div
        ref={containerRef}
        id={id}
        data-testid={testId}
        className={containerClassName}
        style={containerStyle}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Left Navigation Button (Side Type) */}
        {isSideNavigation && showButtons && (
          <button
            className="avakio-carousel-nav-button avakio-carousel-nav-prev"
            onClick={showPrev}
            disabled={!loop && currentIndex === 0}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Slides Container */}
        <div className="avakio-carousel-viewport">
          <div
            className="avakio-carousel-track"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: isTransitioning ? `transform ${scrollSpeed}ms ease-in-out` : 'none',
            }}
          >
            {slidesList.map((slide) => (
              <div key={slide.id} className="avakio-carousel-slide">
                {slide.content}
              </div>
            ))}
          </div>
        </div>

        {/* Right Navigation Button (Side Type) */}
        {isSideNavigation && showButtons && (
          <button
            className="avakio-carousel-nav-button avakio-carousel-nav-next"
            onClick={showNext}
            disabled={!loop && currentIndex === slidesList.length - 1}
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Bottom Navigation */}
        {!isSideNavigation && (showButtons || showItems) && (
          <div className={`avakio-carousel-nav-bottom avakio-carousel-nav-${navigation.position || 'center'}`}>
            {/* Navigation Buttons */}
            {showButtons && (
              <div className="avakio-carousel-nav-buttons">
                <button
                  className="avakio-carousel-nav-button"
                  onClick={showPrev}
                  disabled={!loop && currentIndex === 0}
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  className="avakio-carousel-nav-button"
                  onClick={showNext}
                  disabled={!loop && currentIndex === slidesList.length - 1}
                  aria-label="Next slide"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}

            {/* Navigation Indicators */}
            {showItems && (
              <div className="avakio-carousel-indicators">
                {slidesList.map((slide, index) => (
                  <button
                    key={slide.id}
                    className={`avakio-carousel-indicator ${
                      index === currentIndex ? 'avakio-carousel-indicator-active' : ''
                    }`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

AvakioCarousel.displayName = 'AvakioCarousel';











