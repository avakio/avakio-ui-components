import React, { useRef, useState, useEffect } from 'react';
import { AvakioCarousel, AvakioCarouselRef, AvakioCarouselSlide, AvakioCarouselTheme } from '../../components/avakio/ui-widgets/avakio-carousel';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
import { Button } from '@/components/ui/button';
import { AvakioGrid, AvakioGridCell } from '../../components/avakio/layouts/avakio-grid/avakio-grid';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Plus, 
  Trash2, 
  Palette,
  ChevronRight,
  Image as ImageIcon,
  BarChart,
  PieChart,
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
} from 'lucide-react';
import '../../components/avakio/ui-widgets/avakio-carousel.css';

export function AvakioCarouselExample() {
  const [theme, setTheme] = useState<string>('material');
  const basicCarouselRef = useRef<AvakioCarouselRef>(null);
  const autoplayCarouselRef = useRef<AvakioCarouselRef>(null);
  const sideNavCarouselRef = useRef<AvakioCarouselRef>(null);
  const dynamicCarouselRef = useRef<AvakioCarouselRef>(null);
  
  const [selectedTheme, setSelectedTheme] = useState<AvakioCarouselTheme>('material');
  const [autoplayEnabled, setAutoplayEnabled] = useState(false);
  const [currentSlideInfo, setCurrentSlideInfo] = useState({ id: '', index: 0 });
  const [dynamicSlides, setDynamicSlides] = useState<AvakioCarouselSlide[]>([
    {
      id: 'dynamic-1',
      content: (
        <div style={{ padding: '40px', textAlign: 'center', background: '#f0f9ff', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <ImageIcon size={48} style={{ margin: '0 auto 16px', color: '#0ea5e9' }} />
          <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px' }}>Dynamic Slide 1</h3>
          <p style={{ color: '#64748b' }}>This carousel supports dynamic slide management</p>
        </div>
      ),
    },
  ]);

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-admin-theme');
    if (currentTheme) {
      setTheme(currentTheme);
    }

    const observer = new MutationObserver(() => {
      const globalTheme = document.documentElement.getAttribute('data-admin-theme');
      if (globalTheme && globalTheme !== theme) {
        setTheme(globalTheme);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-admin-theme'],
    });

    return () => observer.disconnect();
  }, [theme]);

  // Basic slides with Avakio components
  const basicSlides: AvakioCarouselSlide[] = [
    {
      id: 'slide-1',
      content: (
        <div style={{ padding: '40px', textAlign: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <ImageIcon size={64} style={{ margin: '0 auto 24px' }} />
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>Welcome to AvakioCarousel</h2>
          <p style={{ fontSize: '18px', opacity: 0.9 }}>Smooth, interactive slideshow component</p>
        </div>
      ),
    },
    {
      id: 'slide-2',
      content: (
        <div style={{ width: '100%', height: '100%', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AvakioGrid
            gridColumns={2}
            gridRows={2}
            theme={theme as any}
            cellHeight={120}
            cellMargin={16}
            width="100%"
            height={280}
            cells={[
            {
              id: 'metric-1',
              x: 0,
              y: 0,
              dx: 1,
              dy: 1,
              content: (
                <div style={{ padding: '12px', background: '#dbeafe', borderRadius: '8px', height: '100%' }}>
                  <Users size={32} style={{ color: '#3b82f6', marginBottom: '12px' }} />
                  <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e40af' }}>1,234</div>
                  <div style={{ fontSize: '14px', color: '#64748b' }}>Total Users</div>
                </div>
              ),
            },
            {
              id: 'metric-2',
              x: 1,
              y: 0,
              dx: 1,
              dy: 1,
              content: (
                <div style={{ padding: '24px', background: '#dcfce7', borderRadius: '8px', height: '100%' }}>
                  <ShoppingCart size={32} style={{ color: '#22c55e', marginBottom: '12px' }} />
                  <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#15803d' }}>567</div>
                  <div style={{ fontSize: '14px', color: '#64748b' }}>Orders</div>
                </div>
              ),
            },
            {
              id: 'metric-3',
              x: 0,
              y: 1,
              dx: 1,
              dy: 1,
              content: (
                <div style={{ padding: '24px', background: '#fef3c7', borderRadius: '8px', height: '100%' }}>
                  <DollarSign size={32} style={{ color: '#f59e0b', marginBottom: '12px' }} />
                  <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#92400e' }}>$45.2K</div>
                  <div style={{ fontSize: '14px', color: '#64748b' }}>Revenue</div>
                </div>
              ),
            },
            {
              id: 'metric-4',
              x: 1,
              y: 1,
              dx: 1,
              dy: 1,
              content: (
                <div style={{ padding: '24px', background: '#fce7f3', borderRadius: '8px', height: '100%' }}>
                  <TrendingUp size={32} style={{ color: '#ec4899', marginBottom: '12px' }} />
                  <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#9f1239' }}>+23%</div>
                  <div style={{ fontSize: '14px', color: '#64748b' }}>Growth</div>
                </div>
              ),
            },
          ]}
        />
        </div>
      ),
    },
    {
      id: 'slide-3',
      content: (
        <div style={{ padding: '40px', textAlign: 'center', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <BarChart size={64} style={{ margin: '0 auto 24px' }} />
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>Analytics Dashboard</h2>
          <p style={{ fontSize: '18px', opacity: '0.9' }}>Track your performance metrics</p>
        </div>
      ),
    },
    {
      id: 'slide-4',
      content: (
        <div style={{ padding: '40px', textAlign: 'center', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <PieChart size={64} style={{ margin: '0 auto 24px' }} />
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>Reports</h2>
          <p style={{ fontSize: '18px', opacity: '0.9' }}>Generate detailed insights</p>
        </div>
      ),
    },
  ];

  const handleAddSlide = () => {
    const newSlideIndex = dynamicSlides.length + 1;
    const colors = ['#f0f9ff', '#fef3c7', '#dcfce7', '#fce7f3', '#ede9fe'];
    const icons = [ImageIcon, BarChart, PieChart, TrendingUp, Users];
    const iconColors = ['#0ea5e9', '#f59e0b', '#22c55e', '#ec4899', '#8b5cf6'];
    
    const colorIndex = (newSlideIndex - 1) % colors.length;
    const IconComponent = icons[colorIndex];
    
    const newSlide: AvakioCarouselSlide = {
      id: `dynamic-${Date.now()}`,
      content: (
        <div style={{ 
          padding: '40px', 
          textAlign: 'center', 
          background: colors[colorIndex], 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center' 
        }}>
          <IconComponent size={48} style={{ margin: '0 auto 16px', color: iconColors[colorIndex] }} />
          <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px' }}>Dynamic Slide {newSlideIndex}</h3>
          <p style={{ color: '#64748b' }}>Added at {new Date().toLocaleTimeString()}</p>
        </div>
      ),
    };
    
    setDynamicSlides([...dynamicSlides, newSlide]);
    dynamicCarouselRef.current?.addView(newSlide);
  };

  const handleRemoveSlide = () => {
    if (dynamicSlides.length > 1) {
      const lastSlide = dynamicSlides[dynamicSlides.length - 1];
      dynamicCarouselRef.current?.removeView(lastSlide.id);
      setDynamicSlides(dynamicSlides.slice(0, -1));
    }
  };

  return (
    <div className="avakio-template-demo-container" data-admin-theme={theme}>
      <AvakioTemplate
        id="carousel-example-header"
        theme={theme as any}
        type="header"
        borderType="clean"
        content={
          <div>
            <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase', opacity: 0.9 }}>
              Avakio Components
            </p>
            <h1 style={{ margin: '0 0 12px 0', fontSize: '32px', fontWeight: 600 }}>
              AvakioCarousel Component
            </h1>
            <p style={{ margin: 0, fontSize: '16px', opacity: 0.95 }}>
              Continuous circular navigation through content blocks with touch support and autoplay. 
            </p>
          </div>
        }
      />

      {/* Basic Usage Section */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          theme={theme as any}
          type="section"
          borderType="clean"
          content={
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>
                <Play size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Basic Carousel
              </h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>
                Default carousel with bottom navigation (buttons + indicators)
              </p>
            </div>
          }
        />
        <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button
            onClick={() => basicCarouselRef.current?.showPrev()}
            size="sm"
          >
            <SkipBack size={16} style={{ marginRight: '4px' }} />
            Previous
          </Button>
          <Button
            onClick={() => basicCarouselRef.current?.showNext()}
            size="sm"
          >
            <SkipForward size={16} style={{ marginRight: '4px' }} />
            Next
          </Button>
          <Button
            onClick={() => basicCarouselRef.current?.setActiveIndex(0)}
            size="sm"
            variant="outline"
          >
            First Slide
          </Button>
          <Button
            onClick={() => {
              const index = basicCarouselRef.current?.getActiveIndex();
              const id = basicCarouselRef.current?.getActiveId();
              alert(`Current: Slide ${(index || 0) + 1} (ID: ${id})`);
            }}
            size="sm"
            variant="outline"
          >
            Get Current
          </Button>
        </div>

        <AvakioCarousel
          ref={basicCarouselRef}
          slides={basicSlides}
          theme={selectedTheme}
          height={350}
          scrollSpeed={300}
          loop
          onSlideChange={(id, index) => {
            setCurrentSlideInfo({ id, index });
          }}
        />

        <div style={{ marginTop: '12px', fontSize: '14px', color: '#64748b', textAlign: 'center' }}>
          Current: {currentSlideInfo.id || basicSlides[0].id} (Index: {currentSlideInfo.index})
        </div>
      </section>

      {/* Autoplay Section */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          theme={theme as any}
          type="section"
          borderType="clean"
          content={
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>
                {autoplayEnabled ? <Pause size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> : <Play size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />}
                Autoplay Mode
              </h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>
                Automatic slide progression with configurable delay
              </p>
            </div>
          }
        />
        <div style={{ marginBottom: '16px' }}>
          <Button
            onClick={() => setAutoplayEnabled(!autoplayEnabled)}
            size="sm"
          >
            {autoplayEnabled ? <Pause size={16} style={{ marginRight: '4px' }} /> : <Play size={16} style={{ marginRight: '4px' }} />}
            {autoplayEnabled ? 'Stop Autoplay' : 'Start Autoplay'}
          </Button>
        </div>

        <AvakioCarousel
          key={autoplayEnabled ? 'autoplay-on' : 'autoplay-off'}
          ref={autoplayCarouselRef}
          slides={basicSlides}
          theme={selectedTheme}
          height={350}
          autoplay={autoplayEnabled}
          autoplayDelay={3000}
          loop
        />
      </section>

      {/* Side Navigation Section */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          theme={theme as any}
          type="section"
          borderType="clean"
          content={
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>
                <ChevronRight size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Side Navigation
              </h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>
                Navigation buttons on sides with no indicators
              </p>
            </div>
          }
        />
        <AvakioCarousel
          ref={sideNavCarouselRef}
          slides={basicSlides}
          theme={selectedTheme}
          height={350}
          navigation={{
            type: 'side',
            buttons: true,
            items: false,
          }}
          loop
        />
      </section>

      {/* Dynamic Slides Section */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          theme={theme as any}
          type="section"
          borderType="clean"
          content={
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>
                <Plus size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Dynamic Slides
              </h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>
                Add or remove slides dynamically at runtime
              </p>
            </div>
          }
        />
        <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button
            onClick={handleAddSlide}
            size="sm"
          >
            <Plus size={16} style={{ marginRight: '4px' }} />
            Add Slide
          </Button>
          <Button
            onClick={handleRemoveSlide}
            size="sm"
            variant="outline"
            disabled={dynamicSlides.length <= 1}
          >
            <Trash2 size={16} style={{ marginRight: '4px' }} />
            Remove Last Slide
          </Button>
          <span style={{ padding: '8px 12px', fontSize: '14px', color: '#64748b', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
            {dynamicSlides.length} {dynamicSlides.length === 1 ? 'slide' : 'slides'}
          </span>
        </div>

        <AvakioCarousel
          ref={dynamicCarouselRef}
          slides={dynamicSlides}
          theme={selectedTheme}
          height={300}
          loop
        />
      </section>

      {/* Themes Section */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          theme={theme as any}
          type="section"
          borderType="clean"
          content={
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>
                <Palette size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Themes
              </h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>
                Choose from multiple built-in themes to match your design
              </p>
            </div>
          }
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
          {(['material', 'flat', 'compact', 'dark', 'ocean', 'sunset'] as AvakioCarouselTheme[]).map(
            (themeOption) => (
              <Button
                key={themeOption}
                variant={selectedTheme === themeOption ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTheme(themeOption)}
                style={{ textTransform: 'capitalize' }}
              >
                {themeOption}
              </Button>
            )
          )}
        </div>
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
          Selected theme: <strong style={{ textTransform: 'capitalize' }}>{selectedTheme}</strong>
        </p>
      </section>

      {/* API Reference Section */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          theme={theme as any}
          type="section"
          borderType="clean"
          content={
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>API Reference</h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>
                Complete API documentation for the AvakioCarousel component
              </p>
            </div>
          }
        />
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontWeight: 600, marginBottom: '12px' }}>Key Features</h4>
          <ul style={{ fontSize: '14px', lineHeight: '1.8', color: '#64748b' }}>
            <li>✓ Touch/swipe gestures for mobile devices</li>
            <li>✓ Keyboard navigation (Arrow Left/Right)</li>
            <li>✓ Multiple navigation styles (bottom/side)</li>
            <li>✓ Autoplay with configurable delay</li>
            <li>✓ Loop mode for continuous navigation</li>
            <li>✓ Dynamic slide management (add/remove)</li>
            <li>✓ Customizable themes and styling</li>
            <li>✓ Programmatic control via ref methods</li>
          </ul>
        </div>

        <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <p style={{ fontSize: '14px', margin: 0 }}>
            📖 For detailed documentation, see{' '}
            <a 
              href="https://github.com/your-repo/avakio-carousel" 
              style={{ color: '#1CA1C1', textDecoration: 'underline' }}
            >
              README.md
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}




















