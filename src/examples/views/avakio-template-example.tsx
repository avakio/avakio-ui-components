import React, { useState, useEffect, useRef } from 'react';
import { AvakioTemplate, AvakioTemplateRef, AvakioTemplateTheme, AvakioTemplateBorderType, AvakioTemplateType } from '../../components/avakio/views/avakio-template/avakio-template';
import { AvakioButton } from '../../components/avakio/ui-controls/avakio-button/avakio-button';
import { AvakioRichSelect } from '../../components/avakio/ui-controls/avakio-richselect/avakio-richselect';
import { AvakioText } from '../../components/avakio/ui-controls/avakio-text/avakio-text';
import { AvakioCounter } from '../../components/avakio/ui-controls/avakio-counter/avakio-counter';
import { AvakioCheckbox } from '../../components/avakio/ui-controls/avakio-checkbox/avakio-checkbox';
import { AvakioDataTable } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import type { AvakioColumn } from '../../components/avakio/data-presentation/avakio-datatable/AvakioDataTable';
import { AvakioTabBar } from '../../components/avakio/ui-controls/avakio-tabbar/avakio-tabbar';
import { FileText, Code, Database, RefreshCw, Eye, EyeOff, Layout, Link, FunctionSquare, FileCode, Box, Move, Wand2, Maximize2, Play, Book } from 'lucide-react';
import './avakio-template-example.css';
import { AvakioLayout } from '../../components/avakio/layouts/avakio-layout/avakio-layout';
import { AvakioGrid } from '../../components/avakio/layouts/avakio-grid/avakio-grid';
import { AvakioViewHeader } from '../../components/avakio/ui-widgets/avakio-view-header/avakio-view-header';
import { AvakioLabel } from '../../components/avakio/ui-controls/avakio-label';

// Tab options for navigation
const TAB_OPTIONS = [
  { id: 'types', label: 'Template Types', icon: <Layout size={14} /> },
  { id: 'binding', label: 'Data Binding', icon: <Link size={14} /> },
  { id: 'function', label: 'Function Template', icon: <FunctionSquare size={14} /> },
  { id: 'content', label: 'Direct Content', icon: <FileCode size={14} /> },
  { id: 'border', label: 'Border Types', icon: <Box size={14} /> },
  { id: 'scroll', label: 'Scroll Modes', icon: <Move size={14} /> },
  { id: 'methods', label: 'Imperative Methods', icon: <Wand2 size={14} /> },
  { id: 'autoheight', label: 'Auto-height', icon: <Maximize2 size={14} /> },
  { id: 'playground', label: 'Interactive Playground', icon: <Play size={14} /> },
  { id: 'docs', label: 'Documentation', icon: <Book size={14} /> },
];

export function AvakioTemplateExample() {
  
  const [activeSection, setActiveSection] = useState<string | number | null>('types');
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Administrator',
    joined: '2024-01-15',
  });

  const templateRef = useRef<AvakioTemplateRef>(null);
  const dynamicTemplateRef = useRef<AvakioTemplateRef>(null);

  // Section refs for scroll navigation
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Scroll to section when tab is clicked
  const handleTabChange = (value: string | number | null) => {
    setActiveSection(value);
    if (value && sectionRefs.current[value as string]) {
      const element = sectionRefs.current[value as string];
      if (element) {
        // Use scrollIntoView with offset handling via scroll-margin
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Sync with global theme
  

  const handleSetValues = () => {
    templateRef.current?.setValues({
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Developer',
      joined: '2025-01-01',
    });
  };

  const handleGetValues = () => {
    const values = templateRef.current?.getValues();
    alert(JSON.stringify(values, null, 2));
  };

  const handleRefresh = () => {
    templateRef.current?.refresh();
  };

  const handleSetHTML = () => {
    templateRef.current?.setHTML('<h3 style="color: #f57c00;">Content replaced!</h3><p>This was set using setHTML().</p>');
  };

  const handleGetHTML = () => {
    const html = templateRef.current?.getHTML();
    alert(html);
  };

  const handleHide = () => {
    templateRef.current?.hide();
    setTimeout(() => templateRef.current?.show(), 2000);
  };

  const handleDisable = () => {
    templateRef.current?.disable();
    setTimeout(() => templateRef.current?.enable(), 2000);
  };

  return (    
    <div className="avakio-template-demo-container">
      {/* Sticky Header + Tab Navigation */}
      <div className="avakio-template-sticky-header">
        {/* Header */}
        <AvakioViewHeader
          label="Views"
          title="Template Component"                                
          subTitle="A versatile template component for displaying HTML content with data binding."
          isSticky={false}
        />

        {/* Tab Navigation */}
        <div className="avakio-template-tabbar-container">
          <AvakioTabBar
            id="template-demo-tabs"
            value={activeSection}
            options={TAB_OPTIONS}
            onChange={handleTabChange}
            align="left"
            size="sm"
            scrollable
          />
        </div>
      </div>
            
      {/* Template Types Section */}        
      <section 
        ref={(el) => { sectionRefs.current['types'] = el; }}
        className="avakio-template-demo-section"
      >            
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Template Types"
        />    
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 16]}
          content="Header type provides a colored background, section adds subtitle background, clean has no special styling."
        />        
        <AvakioLayout          
          id="layout-type-header"
          testId='testid-layout-type-header'
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              id="template-type-header"
              testId='testid-template-type-header'
              type="clean"            
              borderType="clean"           
              content="1. type=header"                                
            />,
            <AvakioTemplate
              type="header"
              borderType="clean"
              content={<h4 style={{ margin: 0 }}>Header Template</h4>}                                
            />,
          ]}                                    
        />
        <AvakioLayout
          id="layout-type-section"
          testId='testid-layout-type-section'
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"            
              borderType="clean"           
              content="2. type=section"                                
            />,
            <AvakioTemplate
              type="section"
              borderType="clean"
              content="Section Template"
            />,
          ]}                                    
        />
        <AvakioLayout
          id="layout-type-clean"
          testId='testid-layout-type-clean'
          type="clean"
          borderless={false}
          margin={12}
          padding={16}
          rows={[
            <AvakioTemplate
              type="clean"            
              borderType="clean"           
              content="3. Clean Template (default)"                                
            />,
            <AvakioTemplate
              type="clean"
              borderType="clean"
              content={<h4 style={{ margin: 0 }}>Clean Template</h4>}                                
            />,
          ]}                                    
        />       
        {/* End of Template Types Section */}        
      </section>

      {/* Basic Template with Data Binding Section */}  
      <section 
        ref={(el) => { sectionRefs.current['binding'] = el; }}
        className="avakio-template-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Basic Template with Data Binding"
        />   
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 14]}
          content="Use #property# syntax to bind data to the template."
        />
        <AvakioTemplate
          id="template-basic"
          testId="template-basic"
          ref={templateRef}
          borderType="material"
          template={'<h3>#name#</h3><p><strong>Email:</strong> #email#</p><p><strong>Role:</strong> #role#</p><p><strong>Joined:</strong> #joined#</p>'}
          data={userData}
          margin={12}
          padding={16}
        />                    
        {/* End of Basic Template with Data Binding Section */}                    
      </section>

      {/* Function Template */}  
      <section 
        ref={(el) => { sectionRefs.current['function'] = el; }}
        className="avakio-template-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Function Template"
        />   
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 14]}
          content="Use a function to generate dynamic content with full React/JSX support."
        /> 

        <AvakioTemplate
          id="function-template"
          testId="function-template"
          borderType="material"
          data={userData}
          margin={12}
          padding={16}
          template={(data) => (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
              <AvakioTemplate
                borderType="clean"
                padding={16}
                css={{ background: '#1CA1C1', color: 'white', borderRadius: '8px' }}
                content={
                  <>
                    <h4>Name</h4>
                    <p>{data.name}</p>
                  </>
                }
              />
              <AvakioTemplate
                borderType="clean"
                padding={16}
                css={{ background: '#5E81AC', color: 'white', borderRadius: '8px' }}
                content={
                  <>
                    <h4>Email</h4>
                    <p>{data.email}</p>
                  </>
                }
              />
              <AvakioTemplate
                borderType="clean"
                padding={16}
                css={{ background: '#00796B', color: 'white', borderRadius: '8px' }}
                content={
                  <>
                    <h4>Role</h4>
                    <p>{data.role}</p>
                  </>
                }
              />
              <AvakioTemplate
                borderType="clean"
                padding={16}
                css={{ background: '#f57c00', color: 'white', borderRadius: '8px' }}
                content={
                  <>
                    <h4>Joined</h4>
                    <p>{data.joined}</p>
                  </>
                }
              />
            </div>
          )}              
        />
        
        {/* End of Function Template */}              
      </section>

      {/* Direct Content*/}   
      <section 
        ref={(el) => { sectionRefs.current['content'] = el; }}
        className="avakio-template-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Direct Content"
        />   
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 14]}
          content="Pass React components directly as content."
        />  
        <AvakioTemplate
          id="direct-content-template"
          testId="direct-content-template"
          borderType="material"
          margin={12}
          padding={16}
          content={
            <div>
              <h3>Welcome to Avakio Template</h3>
              <p>This component supports:</p>
              <ul>
                <li>String templates with data binding</li>
                <li>Function templates returning JSX</li>
                <li>Direct React content</li>
                <li>All 6 Avakio themes</li>
              </ul>
            </div>
          }            
        />        
        {/* End of Direct Content */}   
      </section>

       {/*Border Types*/}   
      <section 
        ref={(el) => { sectionRefs.current['border'] = el; }}
        className="avakio-template-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Border Types"
        />  
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 14]}
          content="Different border styles: space, wide, clean, line, material."
        />  
        <AvakioLayout      
          id="Layout-border-types"
          testId="layout-border-types"
          type="clean"
          width="100%"
          responsive={true}
          cols={[
            <AvakioTemplate
              id="template-border-space"
              testId="template-border-space"
              css={{ flex: 1 }}
              borderType="space"
              content={<p>Border: <strong>space</strong></p>}
            />,
            <AvakioTemplate
              id="template-border-wide"
              testId="template-border-wide"
              css={{ flex: 1 }}
              borderType="wide"
              content={<p>Border: <strong>wide</strong></p>}
            />,
            <AvakioTemplate
              id="template-border-clean"
              testId="template-border-clean"
              css={{ flex: 1 }}
              borderType="clean"
              content={<p>Border: <strong>clean</strong></p>}
            />,
            <AvakioTemplate
              id="template-border-line"
              testId="template-border-line"
              css={{ flex: 1 }}
              borderType="line"
              content={<p>Border: <strong>line</strong></p>}
            />,
            <AvakioTemplate
              id="template-border-material"
              testId="template-border-material"
              css={{ flex: 1 }}
              borderType="material"
              content={<p>Border: <strong>material</strong></p>}
            />
          ]}                    
          />
       {/*End ofBorder Types*/}                  
      </section>

      {/* Scroll Modes */}                
      <section 
        ref={(el) => { sectionRefs.current['scroll'] = el; }}
        className="avakio-template-demo-section"
      >
         <AvakioTemplate
          type="section"
          borderType="clean"
          content="Scroll Modes"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 14]}
          content="Control scrolling: none, x, y, or xyControl scrolling: none, x, y, or xy."
        />  

        <AvakioLayout      
          id="layout-scroll-modes"
          testId="layout-scroll-modes"
          type="material"
          width="100%"
          cols={[
            <AvakioTemplate
              id="template-scroll-y"
              testId="template-scroll-y"
              borderType="material"
              scroll="y"
              maxHeight={100}
              css={{ flex: 1 }}
              content={
              <div>
                <p>Paragraph 1: Lorem ipsum dolor sit amet.</p>
                <p>Paragraph 2: Sed do eiusmod tempor.</p>
                <p>Paragraph 3: Ut enim ad minim veniam.</p>
                <p>Paragraph 4: Duis aute irure dolor.</p>
                <p>Paragraph 5: Excepteur sint occaecat.</p>
                <p>Paragraph 6: Cupidatat non proident.</p>
                <p>Paragraph 7: Sunt in culpa qui officia.</p>
                <p>Paragraph 8: Deserunt mollit anim id est.</p>

              </div>
              }
            />
            ,            
            <AvakioTemplate
              id="template-scroll-x"
              testId="template-scroll-x"
              borderType="material"
              scroll="x"
              maxHeight={100}
              css={{ flex: 1 }}
              content={
                <div style={{ width: '400px', whiteSpace: 'nowrap' }}>
                  <p>This content scrolls horizontally. Keep scrolling...</p>
                </div>
              }
            />,            
          ]}                    
          />
        {/*End of Scroll Modes */}                
        </section>

      {/* Imperative Methods */}    
      <section 
        ref={(el) => { sectionRefs.current['methods'] = el; }}
        className="avakio-template-demo-section"
      >
         <AvakioTemplate
          type="section"
          borderType="clean"
          content="Imperative Methods"
        /> 
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 14]}
          content="Control with ref methods: setValues, getValues, setHTML, refresh, hide, show."
        />  
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[14, 0, 0, 14]}
          content= {
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <AvakioButton onClick={handleSetValues} label="setValues()" icon={<RefreshCw size={14} />} size="sm"  />
              <AvakioButton onClick={handleGetValues} label="getValues()" icon={<Database size={14} />} size="sm"  />
              <AvakioButton onClick={handleRefresh} label="refresh()" icon={<RefreshCw size={14} />} size="sm" />
              <AvakioButton onClick={handleSetHTML} label="setHTML()" icon={<Code size={14} />} size="sm"  />
              <AvakioButton onClick={handleGetHTML} label="getHTML()" icon={<FileText size={14} />} size="sm"  />
              <AvakioButton onClick={handleHide} label="hide() 2s" icon={<EyeOff size={14} />} size="sm" />
              <AvakioButton onClick={handleDisable} label="disable() 2s" icon={<Eye size={14} />} size="sm"  />
            </div>}
        />  
        <AvakioTemplate
            ref={templateRef}
            id="template-methods"
            testId="template-methods"
            borderType="material"
            template={'<div style="padding: 8px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px;"><h4 style="margin: 0 0 8px 0;">#name#</h4><p style="margin: 4px 0;"><strong>Email:</strong> #email#</p><p style="margin: 4px 0;"><strong>Role:</strong> #role#</p><p style="margin: 4px 0;"><strong>Joined:</strong> #joined#</p></div>'}
            data={userData}
            padding={16}
          />    
        {/*End of  Imperative Methods */}                  
      </section>

      {/* Template automatically adjusts height to fit content */}    
      <section 
        ref={(el) => { sectionRefs.current['autoheight'] = el; }}
        className="avakio-template-demo-section"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Template automatically adjusts height to fit content"
        />  

        <AvakioTemplate
          ref={dynamicTemplateRef}
          id="template-autoheight"
          testId="template-autoheight"
          borderType="material"
          autoheight
          padding={16}
          content={
            <div>
              <h4>Auto-sizing Content</h4>
              <p>This template automatically adjusts its height based on the content.</p>
            </div>
          }         
        />

      {/* End of Template automatically adjusts height to fit content */}   
      </section>

      {/* Interactive Props Playground */}
      <section 
        ref={(el) => { sectionRefs.current['playground'] = el; }}
        className="avakio-template-demo-section avakio-hide-on-mobile"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Interactive Props Playground"
        />
        <AvakioTemplate
          type="clean"
          borderType="clean"
          padding={[0, 0, 0, 14]}
          content="Experiment with all available props and see changes in real-time."
        />
        <PlaygroundSection />        
      </section>

      {/* Props Documentation Section */}
      <section 
        ref={(el) => { sectionRefs.current['docs'] = el; }}
        className="avakio-template-demo-section avakio-hide-on-mobile"
        data-section="docs"
      >
        <AvakioTemplate
          type="section"
          borderType="clean"
          content="Documentation"
        />
        <PropsDocumentation />
      </section>

    </div>
  );
}

function PlaygroundSection({ theme }: { theme: string }) {
  // State for all props
  const [templateTheme, setTemplateTheme] = useState<AvakioTemplateTheme>('material');
  const [borderType, setBorderType] = useState<AvakioTemplateBorderType>('material');
  const [templateType, setTemplateType] = useState<AvakioTemplateType>('header');
  const [borderless, setBorderless] = useState(false);
  const [autoheight, setAutoheight] = useState(false);
  const [scroll, setScroll] = useState<boolean | 'x' | 'y' | 'xy'>(false);
  const [width, setWidth] = useState<string>('100%');
  const [height, setHeight] = useState<string>('auto');
  const [padding, setPadding] = useState<number>(16);
  const [margin, setMargin] = useState<number>(0);
  const [hidden, setHidden] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [content, setContent] = useState('This is a sample template. Try changing the props!');

  return (
    <>
    <AvakioLayout 
      id='playground-layout' 
      type="clean" 
      borderless={false} 
      margin={12} 
      rows={[
        // Headers for Controls and Live Preview
        <AvakioLayout 
          id='playground-layout-headers' 
          type="clean" 
          borderless={true}       
          cols={[
            <AvakioTemplate
                type="header"
                width={300}
                borderType="clean"
                content={<h4 style={{ margin: 0 }}>Controls</h4>}                                
              />,
              <AvakioTemplate
                id='live-preview-template-header'
                css={{ flex: 1 }}
                type="header"
                borderType="clean"
                content={<h4 style={{ margin: 0 }}>Live Preview</h4>}                                
              />,
          ]} 
        />,
        //2nd Row with Controls and Live Preview
        <AvakioLayout 
          id='playground-layout-headers' 
          type="clean" 
          borderless={true}       
          cols={[
            <AvakioTemplate
              type="clean"
              borderType="clean"
              width={300}
              padding={12}
              content= {
                <>                                      
                  {/* Border Type */}
                  <AvakioRichSelect
                    label="Border Type"
                    labelAlign="left"
                    value={borderType}
                    width="100%"
                    padding={[0,0,10,0]}  
                    options={[
                      { id: 'space', value: 'Space' },
                      { id: 'wide', value: 'Wide' },
                      { id: 'clean', value: 'Clean' },
                      { id: 'line', value: 'Line' },
                      { id: 'material', value: 'Material' }
                    ]}
                    onChange={(value) => setBorderType(value as AvakioTemplateBorderType)}              
                  />
                  {/* Template Type */}
                  <AvakioRichSelect
                    label="Type"
                    labelAlign="left"
                    value={templateType}
                    width="100%"
                    padding={[0,0,10,0]} 
                    options={[
                      { id: 'header', value: 'Header' },
                      { id: 'section', value: 'Section' },
                      { id: 'clean', value: 'Clean' }
                    ]}
                    onChange={(value) => setTemplateType(value as AvakioTemplateType)}              
                  />
                  {/*Scroll*/}
                  <AvakioRichSelect
                    label="Scroll"
                    labelAlign="left"
                    width="100%"
                    padding={[0,0,10,0]} 
                    value={scroll === false ? 'false' : scroll === true ? 'true' : scroll}
                    options={[
                      { id: 'false', value: 'None' },
                      { id: 'true', value: 'Both' },
                      { id: 'x', value: 'Horizontal' },
                      { id: 'y', value: 'Vertical' },
                      { id: 'xy', value: 'XY' }
                    ]}
                    onChange={(value) => {
                      const val = value as string;
                      setScroll(val === 'false' ? false : val === 'true' ? true : val as 'x' | 'y' | 'xy');
                    }}              
                  />
                  {/* Width */}
                  <AvakioText
                    label="Width"
                    labelPosition="left"
                    labelWidth={100}
                    value={width}
                    width="100%"
                    padding={[0,0,10,0]} 
                    onChange={(value) => setWidth(value)}
                    placeholder="e.g., 100%, 300px"                
                  />
                  {/* Height */}
                  <AvakioText
                    label="Height"
                    labelPosition="left"
                    value={height}
                    padding={[0,0,10,0]} 
                    width="100%"
                    onChange={(value) => setHeight(value)}
                    placeholder="e.g., auto, 200px"              
                  />  
                  {/* Padding */}
                  <AvakioCounter
                    labelPosition="left"
                    label="Padding"
                    value={padding}
                    padding={[0,0,10,0]} 
                    min={0}
                    max={50}
                    step={1}
                    onChange={(value) => setPadding(value)}
                    allowInput={true}
                  />
                  {/* Margin */}
                  <AvakioCounter                
                    labelPosition="left"
                    label="Margin"
                    padding={[0,0,10,0]} 
                    value={margin}
                    min={0}
                    max={50}
                    step={1}
                    onChange={(value) => setMargin(value)}
                    allowInput={true}
                  />
                  {/* Boolean Props */}
                  <AvakioCheckbox
                    label="Borderless"
                    checked={borderless}
                    onChange={(checked) => setBorderless(checked)}
                  />
                  <AvakioCheckbox
                    label="Auto Height"
                    checked={autoheight}
                    onChange={(checked) => setAutoheight(checked)}
                  />
                  <AvakioCheckbox
                    label="Hidden"
                    checked={hidden}
                    onChange={(checked) => setHidden(checked)}
                  />
                  <AvakioCheckbox
                    label="Disabled"
                    checked={disabled}
                    onChange={(checked) => setDisabled(checked)}
                  />
                  <AvakioText
                    label="Content"
                    labelPosition="top"
                    value={content}
                    onChange={(val) => setContent(val)}
                    placeholder="Enter template content here"
                    multiline={true}
                    rows={4}
                    textWidth="100%"
                  />
                </>
              } 
            />,
            //2nd Column - Live Preview
            <>
              <AvakioLayout 
                id="layout-playground-preview"     
                testId="layout-playground-preview"            
                margin={0}
                padding={0}
                type="clean"                
                borderless={false}
                //space'\|'wide'\|'clean'\|'line'\|'head'\|'material         
                rows={[        
                  <AvakioTemplate
                    type="clean"
                    borderType="material"
                    borderless={true}                    
                    margin={0}
                    padding={200}
                    content={
                      <AvakioTemplate
                        id='test-123'
                        borderType={borderType}
                        type={templateType}
                        borderless={borderless}
                        autoheight={autoheight}
                        scroll={scroll}
                        width={width}
                        height={height}
                        padding={padding}
                        margin={margin}
                        hidden={hidden}
                        disabled={disabled}
                        content={content}
                      />
                    }                                
                  />,          
                  
                  /* Props Display */
                  <AvakioTemplate
                    type="header"
                    borderType="clean"
                    margin={0}
                    content={<h4 style={{ margin: 0 }}>Current Props:</h4>}                                
                  />,
                  <AvakioTemplate
                    type="clean"
                    borderType="clean"
                    content={
                      <div>                    
                        <pre style={{ 
                          background: 'var(--avakio-code-bg)', 
                          color: 'var(--avakio-code-text)',
                          borderRadius: '4px',
                          overflow: 'auto',
                          lineHeight: '1.5'
                          }}>
                          {`<AvakioTemplate
  theme="${templateTheme}"
  borderType="${borderType}"
  type="${templateType}"
  ${borderless ? 'borderless={true}' : ''}
  ${autoheight ? 'autoheight={true}' : ''}
  ${scroll !== false ? `scroll="${scroll === true ? 'true' : scroll}"` : ''}
  width="${width}"
  height="${height}"
  padding={${padding}}
  margin={${margin}}
  ${hidden ? 'hidden={true}' : ''}
  ${disabled ? 'disabled={true}' : ''}
  content="${content}"
/>`}
                        </pre>
                      </div>
                    }
                  />            
                ]}            
              />
            </>
          ]}          
        />
      ]} 
    />
    </>
  );
}

// Props documentation data
interface PropDoc {
  id: number;
  name: string;
  type: string;
  defaultValue: string;
  description: string;
  rules: string;
}

const propsData: PropDoc[] = [
  { id: 1, name: 'template', type: 'string | ((data: any) => ReactNode)', defaultValue: 'undefined', description: 'Template string or function that returns HTML/JSX', rules: 'Use either template or content, not both' },
  { id: 2, name: 'data', type: 'Record<string, any>', defaultValue: '{}', description: 'Data object to populate the template', rules: 'Used with template prop for data binding' },
  { id: 3, name: 'content', type: 'ReactNode', defaultValue: 'undefined', description: 'Direct HTML/JSX content', rules: 'Alternative to template prop. Use one or the other' },
  { id: 4, name: 'url', type: 'string', defaultValue: 'undefined', description: 'URL to load content from', rules: 'Fetches content asynchronously. Triggers onLoad when complete' },
  { id: 5, name: 'theme', type: "'material' | 'flat' | 'compact' | 'dark' | 'ocean' | 'sunset'", defaultValue: "'material'", description: 'Visual theme to apply', rules: 'Affects colors, borders, and overall styling' },
  { id: 6, name: 'borderType', type: "'space' | 'wide' | 'clean' | 'line' | 'material'", defaultValue: "'material'", description: 'Border style variant', rules: 'Controls border radius and shadow styles' },
  { id: 7, name: 'type', type: "'header' | 'section' | 'clean'", defaultValue: "'clean'", description: 'Template layout type', rules: 'header: colored background with accent. section: divider style with lines. clean: no special styling' },
  { id: 8, name: 'borderless', type: 'boolean', defaultValue: 'false', description: 'Remove all borders', rules: 'When true, removes border and box-shadow' },
  { id: 9, name: 'autoheight', type: 'boolean', defaultValue: 'false', description: 'Auto-adjust height to content', rules: 'Ignores fixed height when enabled' },
  { id: 10, name: 'scroll', type: "boolean | 'x' | 'y' | 'xy'", defaultValue: 'false', description: 'Enable scrolling', rules: "true: both axes. 'x': horizontal only. 'y': vertical only. 'xy': both axes" },
  { id: 11, name: 'width', type: 'number | string', defaultValue: "'100%'", description: 'Width of the template', rules: 'Accepts px, %, em, rem, or number (treated as px)' },
  { id: 12, name: 'height', type: 'number | string', defaultValue: "'auto'", description: 'Height of the template', rules: 'Accepts px, %, em, rem, or number (treated as px)' },
  { id: 13, name: 'minWidth', type: 'number | string', defaultValue: 'undefined', description: 'Minimum width constraint', rules: 'Same format as width' },
  { id: 14, name: 'minHeight', type: 'number | string', defaultValue: 'undefined', description: 'Minimum height constraint', rules: 'Same format as height' },
  { id: 15, name: 'maxWidth', type: 'number | string', defaultValue: 'undefined', description: 'Maximum width constraint', rules: 'Same format as width' },
  { id: 16, name: 'maxHeight', type: 'number | string', defaultValue: 'undefined', description: 'Maximum height constraint', rules: 'Same format as height' },
  { id: 17, name: 'padding', type: 'number | string | [t, r, b, l]', defaultValue: '16', description: 'Inner spacing around content', rules: 'Number: all sides. Array: [top, right, bottom, left]' },
  { id: 18, name: 'margin', type: 'number | string | [t, r, b, l]', defaultValue: '0', description: 'Outer spacing around template', rules: 'Number: all sides. Array: [top, right, bottom, left]' },
  { id: 19, name: 'className', type: 'string', defaultValue: 'undefined', description: 'Additional CSS class names', rules: 'Appended to default classes' },
  { id: 20, name: 'css', type: 'React.CSSProperties', defaultValue: 'undefined', description: 'Inline CSS styles', rules: 'Merged with computed styles. Has highest priority' },
  { id: 21, name: 'hidden', type: 'boolean', defaultValue: 'false', description: 'Hide the template', rules: 'Sets display: none. Can be toggled via ref.show()/hide()' },
  { id: 22, name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disable interactions', rules: 'Adds opacity and pointer-events: none. Toggle via ref.enable()/disable()' },
  { id: 23, name: 'id', type: 'string', defaultValue: 'undefined', description: 'HTML id attribute', rules: 'For DOM selection and accessibility' },
  { id: 24, name: 'testId', type: 'string', defaultValue: 'undefined', description: 'Test identifier', rules: 'Sets data-testid attribute for testing' },
  { id: 25, name: 'onLoad', type: '() => void', defaultValue: 'undefined', description: 'Callback when content loads', rules: 'Fires after URL content is fetched or on initial render' },
  { id: 26, name: 'onChange', type: '(data: any) => void', defaultValue: 'undefined', description: 'Callback when data changes', rules: 'Fires when setValues() is called on ref' },
  { id: 27, name: 'onClick', type: '(e: MouseEvent) => void', defaultValue: 'undefined', description: 'Click event handler', rules: 'Disabled when disabled=true' },
];

interface RefMethodDoc {
  id: number;
  name: string;
  description: string;
  rules: string;
}

const refMethodsData: RefMethodDoc[] = [
  { id: 1, name: 'setValues(data)', description: 'Set values/data for the template', rules: 'Merges with existing data and triggers re-render' },
  { id: 2, name: 'getValues()', description: 'Get current values/data', rules: 'Returns the current data object' },
  { id: 3, name: 'setHTML(html)', description: 'Set HTML content directly', rules: 'Replaces current content with HTML string' },
  { id: 4, name: 'getHTML()', description: 'Get current HTML content', rules: 'Returns innerHTML of content container' },
  { id: 5, name: 'refresh()', description: 'Force re-render', rules: 'Useful after external data changes' },
  { id: 6, name: 'parse(data)', description: 'Parse and apply new data', rules: 'Replaces all data and re-renders' },
  { id: 7, name: 'show()', description: 'Show the template', rules: 'Sets hidden to false' },
  { id: 8, name: 'hide()', description: 'Hide the template', rules: 'Sets hidden to true' },
  { id: 9, name: 'enable()', description: 'Enable the template', rules: 'Sets disabled to false' },
  { id: 10, name: 'disable()', description: 'Disable the template', rules: 'Sets disabled to true' },
  { id: 11, name: 'getNode()', description: 'Get DOM element reference', rules: 'Returns the root HTMLDivElement or null' },
];

// Props columns for the DataTable
const propsColumns: AvakioColumn<PropDoc>[] = [
  { id: 'name', header: 'Prop Name', width: 120, sort: true },
  { id: 'type', header: 'Type', width: 220 },
  { id: 'defaultValue', header: 'Default', width: 100 },
  { id: 'description', header: 'Description', width: 250 },
  { id: 'rules', header: 'Rules / Conditions', width: 300 },
];

const refColumns: AvakioColumn<RefMethodDoc>[] = [
  { id: 'name', header: 'Method', width: 150, sort: true },
  { id: 'description', header: 'Description', width: 280 },
  { id: 'rules', header: 'Notes', width: 350 },
];

function PropsDocumentation({ theme }: { theme: string }) {
  return (
    <AvakioTemplate
      borderType="material"
      type="clean"
      borderless={true} 
      
      content={
        <AvakioLayout
          rows={[
            <AvakioTemplate
              key="props-header"
              borderType="material"
              type="header"
              content="Props Reference"
              borderless={true}
              padding={[12, 16, 12, 16]}
              margin={0}
            />,
            <AvakioTemplate
              key="props-table"
              borderType="clean"
              type="clean"
              borderless={true}
              content={
                <AvakioDataTable
                  columns={propsColumns}
                  data={propsData}
                  sortable={true}
                  filterable={true}
                  resizable={true}
                  paging={true}
                  pageSize={10}
                />
              }
            />,
            <AvakioTemplate
              key="ref-header"
              borderType="material"
              type="header"
              content="Ref Methods (useRef)"
              padding={[12, 16, 12, 16]}
              margin={0}
              borderless={true} 
            />,
            <AvakioTemplate
              key="ref-table"
              borderType="clean"
              type="clean"
              borderless={true}
              content={
                <AvakioDataTable
                  columns={refColumns}
                  data={refMethodsData}
                  sortable={true}
                  resizable={true}
                  paging={false}
                />
              }
            />
          ]}
          gap={10}
        />
      }
    />
  );
}
















