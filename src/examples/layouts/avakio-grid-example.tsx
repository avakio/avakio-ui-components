import React, { useState, useEffect, useRef, useMemo } from 'react';
import { AvakioGrid, AvakioGridRef, AvakioGridCell } from '../../components/avakio/layouts/avakio-grid/avakio-grid';
import { AvakioTemplate } from '../../components/avakio/views/avakio-template/avakio-template';
// Button component not available
import { Plus, Trash2, Move, RotateCcw, Save, Upload, Grid3X3, List } from 'lucide-react';
import '../../components/avakio/layouts/avakio-grid.css';
import { Button } from '@/components/ui/button';

export function AvakioGridExample() {
  const [theme, setTheme] = useState<string>('material');
  const gridRef = useRef<AvakioGridRef>(null);
  const interactiveGridRef = useRef<AvakioGridRef>(null);
  const dragDropGridRef = useRef<AvakioGridRef>(null);
  const dragDropGrid3ColRef = useRef<AvakioGridRef>(null);
  const [savedState, setSavedState] = useState<AvakioGridCell[] | null>(null);
  const [cellCounter, setCellCounter] = useState(5);
  
  // Drag & Drop example state (1 column)
  const [dragDropCells, setDragDropCells] = useState<AvakioGridCell[]>([
    { id: 'dd-1', x: 0, y: 0, dx: 1, dy: 1, height: 100, content: <div style={{ padding: '8px' }}><strong>Item 1</strong></div> },
    { id: 'dd-2', x: 0, y: 1, dx: 1, dy: 1, height: 100, content: <div style={{ padding: '8px' }}><strong>Item 2</strong></div> },
    { id: 'dd-3', x: 0, y: 2, dx: 1, dy: 1, height: 100, content: <div style={{ padding: '8px' }}><strong>Item 3</strong></div> },
  ]);
  const [dragDropCounter, setDragDropCounter] = useState(4);
  const [cellOrder, setCellOrder] = useState<string | null>(null);

  // Drag & Drop example state (3 columns)
  const [dragDrop3ColCells, setDragDrop3ColCells] = useState<AvakioGridCell[]>([
    { id: 'dd3-1', x: 0, y: 0, dx: 1, dy: 1, height: 100, content: <div style={{ padding: '8px' }}><strong>Item 1</strong></div> },
    { id: 'dd3-2', x: 1, y: 0, dx: 1, dy: 1, height: 100, content: <div style={{ padding: '8px' }}><strong>Item 2</strong></div> },
    { id: 'dd3-3', x: 2, y: 0, dx: 1, dy: 1, height: 100, content: <div style={{ padding: '8px' }}><strong>Item 3</strong></div> },
    { id: 'dd3-4', x: 0, y: 1, dx: 1, dy: 1, height: 100, content: <div style={{ padding: '8px' }}><strong>Item 4</strong></div> },
    { id: 'dd3-5', x: 1, y: 1, dx: 1, dy: 1, height: 100, content: <div style={{ padding: '8px' }}><strong>Item 5</strong></div> },
    { id: 'dd3-6', x: 2, y: 1, dx: 1, dy: 1, height: 100, content: <div style={{ padding: '8px' }}><strong>Item 6</strong></div> },
  ]);
  const [dragDrop3ColCounter, setDragDrop3ColCounter] = useState(7);
  const [cellOrder3Col, setCellOrder3Col] = useState<string | null>(null);

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

  // Basic grid cells
  const basicCells: AvakioGridCell[] = useMemo(() => [
    { id: 'a', x: 0, y: 0, dx: 1, dy: 1, content: <div style={{ textAlign: 'center' }}><h4>Single Cell</h4><p>1x1</p></div> },
    { id: 'b', x: 0, y: 1, dx: 1, dy: 1, content: <div style={{ textAlign: 'center' }}><h4>Wide Cell</h4><p>2x1</p></div> },
    { id: 'c', x: 0, y: 2, dx: 1, dy: 1, content: <div style={{ textAlign: 'center' }}><h4>Wide Cell 2</h4><p>2x1</p></div> },

  ], []);

  // Interactive grid cells
  const [interactiveCells, setInteractiveCells] = useState<AvakioGridCell[]>([
    { id: 'cell-1', x: 0, y: 0, dx: 1, dy: 1, height: 100, content: <div style={{ padding: '8px' }}><strong>Cell 1</strong><p>Position: (0,0)</p></div> },
    { id: 'cell-2', x: 1, y: 0, dx: 2, dy: 1, height: 100,content: <div style={{ padding: '8px' }}><strong>Cell 2</strong><p>Wide: 2x1</p></div> },
    { id: 'cell-3', x: 0, y: 1, dx: 1, dy: 2, height: 100,content: <div style={{ padding: '8px' }}><strong>Cell 3</strong><p>Tall: 1x2</p></div> },
    { id: 'cell-4', x: 1, y: 1, dx: 2, dy: 2, height: 100,content: <div style={{ padding: '8px' }}><strong>Cell 4</strong><p>Large: 2x2</p></div> },
  ]);

  // Dashboard-style cells
  const dashboardCells: AvakioGridCell[] = useMemo(() => [
    { 
      id: 'stats', 
      x: 0, y: 0, dx: 2, dy: 1, 
      content: (
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1CA1C1' }}>1,234</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Total Users</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#00796B' }}>567</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Active Today</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f57c00' }}>89%</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Success Rate</div>
          </div>
        </div>
      )
    },
    { 
      id: 'chart', 
      x: 2, y: 0, dx: 2, dy: 2, 
      content: (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <h4 style={{ margin: '0 0 12px 0' }}>Performance Chart</h4>
          <div style={{ flex: 1, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '8px', display: 'flex', alignItems: 'flex-end', padding: '12px', gap: '8px' }}>
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
              <div key={i} style={{ flex: 1, background: 'rgba(255,255,255,0.8)', borderRadius: '4px 4px 0 0', height: `${h}%` }} />
            ))}
          </div>
        </div>
      )
    },
    { 
      id: 'recent', 
      x: 0, y: 1, dx: 2, dy: 2, 
      content: (
        <div>
          <h4 style={{ margin: '0 0 12px 0' }}>Recent Activity</h4>
          {['User signed up', 'Order completed', 'Payment received', 'Report generated'].map((item, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: ['#1CA1C1', '#00796B', '#f57c00', '#764ba2'][i] }} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      )
    },
    { 
      id: 'quick-actions', 
      x: 2, y: 2, dx: 1, dy: 1, 
      content: (
        <div style={{ textAlign: 'center' }}>
          <h4 style={{ margin: '0 0 8px 0' }}>Quick Actions</h4>
          <Button size="sm" style={{ width: '100%' }}>+ New Item</Button>
        </div>
      )
    },
    { 
      id: 'status', 
      x: 3, y: 2, dx: 1, dy: 1, 
      content: (
        <div style={{ textAlign: 'center' }}>
          <h4 style={{ margin: '0 0 8px 0' }}>Status</h4>
          <div style={{ display: 'inline-block', padding: '4px 12px', background: '#d4edda', color: '#155724', borderRadius: '20px', fontSize: '14px' }}>
            ● Online
          </div>
        </div>
      )
    },
  ], []);

  // Handler functions
  const handleAddCell = () => {
    // Use React state as source of truth
    const currentCells = interactiveCells;
    
    // Find position: fill each row left-to-right, then move to next row
    const findNextPosition = (cells: AvakioGridCell[]) => {
      const gridCols = 4; // Based on the grid configuration
      
      if (cells.length === 0) {
        return { x: 0, y: 0 };
      }
      
      // Create a grid map to track occupied cells
      const occupiedCells = new Set<string>();
      let maxY = 0;
      
      cells.forEach(cell => {
        const cellDy = cell.dy || 1;
        const cellDx = cell.dx || 1;
        for (let y = cell.y; y < cell.y + cellDy; y++) {
          for (let x = cell.x; x < cell.x + cellDx; x++) {
            occupiedCells.add(`${x},${y}`);
          }
          if (y + 1 > maxY) maxY = y + 1;
        }
      });
      
      // Start from the last row that has content
      // First, try to fill empty spots in rows from bottom to top, left to right
      for (let y = maxY - 1; y >= 0; y--) {
        // Check if this row has any content (cells starting OR spanning into it)
        const hasContent = cells.some(cell => cell.y <= y && cell.y + (cell.dy || 1) > y);
        if (!hasContent) continue; // Skip completely empty rows
        
        // Look for empty spots in this row
        for (let x = 0; x < gridCols; x++) {
          if (!occupiedCells.has(`${x},${y}`)) {
            return { x, y };
          }
        }
      }
      
      // If no empty spots in existing rows, find position in new row
      // Check the row at maxY (the first completely empty row)
      for (let x = 0; x < gridCols; x++) {
        if (!occupiedCells.has(`${x},${maxY}`)) {
          return { x, y: maxY };
        }
      }
      
      // If somehow that row is full, go to next
      return { x: 0, y: maxY + 1 };
    };
    
    const position = findNextPosition(currentCells);
    const newCellId = `cell-${cellCounter}`;
    const newCell: AvakioGridCell = {
      id: newCellId,
      x: position.x,
      y: position.y,
      dx: 1,
      dy: 1,
      height: 100,
      content: <div style={{ padding: '8px' }}><strong>Cell {cellCounter}</strong><p>New cell</p></div>
    };
    
    // Update state first (source of truth)
    setInteractiveCells(prev => [...prev, newCell]);
    // Then update the grid ref
    interactiveGridRef.current?.addView(newCell);
    // Finally increment counter
    setCellCounter(c => c + 1);
  };

  const handleRemoveLastCell = () => {
    const cells = interactiveGridRef.current?.getCells() || [];
    if (cells.length > 0) {
      const lastCell = cells[cells.length - 1];
      interactiveGridRef.current?.removeView(lastCell.id);
      setInteractiveCells(prev => prev.slice(0, -1));
    }
  };

  const handleMoveCell = () => {
    const cells = interactiveGridRef.current?.getCells() || [];
    if (cells.length > 0) {
      const firstCell = cells[0];
      const newX = (firstCell.x + 1) % 4;
      interactiveGridRef.current?.moveView(firstCell.id, { x: newX });
    }
  };

  const handleClearAll = () => {
    interactiveGridRef.current?.clearAll();
    setInteractiveCells([]);
  };

  const handleSerialize = () => {
    const state = interactiveGridRef.current?.serialize();
    if (state) {
      setSavedState(state);
      alert('State saved! Check the Restore button.');
    }
  };

  const handleRestore = () => {
    if (savedState) {
      // Restore with content and ensure height is preserved
      const restoredCells = savedState.map(cell => ({
        ...cell,
        height: cell.height || 100,
        content: <div style={{ padding: '8px' }}><strong>{cell.id}</strong><p>Restored</p></div>
      }));
      interactiveGridRef.current?.restore(restoredCells);
      setInteractiveCells(restoredCells);
      
      // Update cell counter to continue from the highest cell number
      const maxCellNumber = restoredCells.reduce((max, cell) => {
        const match = cell.id.match(/cell-(\d+)/);
        if (match) {
          const num = parseInt(match[1], 10);
          return Math.max(max, num);
        }
        return max;
      }, 0);
      setCellCounter(maxCellNumber + 1);
    }
  };

  // Drag & Drop example handlers
  const handleDragDropAddCell = () => {
    const gridCols = 1;
    const cells = dragDropCells;
    
    // Find next available position
    const occupiedCells = new Set<string>();
    let maxY = 0;
    
    cells.forEach(cell => {
      occupiedCells.add(`${cell.x},${cell.y}`);
      if (cell.y + 1 > maxY) maxY = cell.y + 1;
    });
    
    // Find first empty spot
    let position = { x: 0, y: 0 };
    let found = false;
    for (let y = 0; y <= maxY && !found; y++) {
      for (let x = 0; x < gridCols && !found; x++) {
        if (!occupiedCells.has(`${x},${y}`)) {
          position = { x, y };
          found = true;
        }
      }
    }
    if (!found) {
      position = { x: 0, y: maxY };
    }
    
    const newCell: AvakioGridCell = {
      id: `dd-${dragDropCounter}`,
      x: position.x,
      y: position.y,
      dx: 1,
      dy: 1,
      height: 100,
      content: <div style={{ padding: '8px' }}><strong>Item {dragDropCounter}</strong></div>
    };
    
    setDragDropCells(prev => [...prev, newCell]);
    setDragDropCounter(c => c + 1);
    setCellOrder(null);
  };

  const handleDragDropRemoveCell = () => {
    if (dragDropCells.length > 0) {
      setDragDropCells(prev => prev.slice(0, -1));
      setCellOrder(null);
    }
  };

  const handleShowCellOrder = () => {
    // Sort cells by position (top-to-bottom, left-to-right)
    const sortedCells = [...dragDropCells].sort((a, b) => {
      if (a.y !== b.y) return a.y - b.y;
      return a.x - b.x;
    });
    
    const orderString = sortedCells
      .map((cell, index) => `${index + 1}. ${cell.id} at (${cell.x}, ${cell.y})`)
      .join('\n');
    
    setCellOrder(orderString);
  };

  // Drag & Drop 3-column example handlers
  const handleDragDrop3ColAddCell = () => {
    const gridCols = 3;
    const cells = dragDrop3ColCells;
    
    // Find next available position
    const occupiedCells = new Set<string>();
    let maxY = 0;
    
    cells.forEach(cell => {
      occupiedCells.add(`${cell.x},${cell.y}`);
      if (cell.y + 1 > maxY) maxY = cell.y + 1;
    });
    
    // Find first empty spot
    let position = { x: 0, y: 0 };
    let found = false;
    for (let y = 0; y <= maxY && !found; y++) {
      for (let x = 0; x < gridCols && !found; x++) {
        if (!occupiedCells.has(`${x},${y}`)) {
          position = { x, y };
          found = true;
        }
      }
    }
    if (!found) {
      position = { x: 0, y: maxY };
    }
    
    const newCell: AvakioGridCell = {
      id: `dd3-${dragDrop3ColCounter}`,
      x: position.x,
      y: position.y,
      dx: 1,
      dy: 1,
      height: 100,
      content: <div style={{ padding: '8px' }}><strong>Item {dragDrop3ColCounter}</strong></div>
    };
    
    setDragDrop3ColCells(prev => [...prev, newCell]);
    setDragDrop3ColCounter(c => c + 1);
    setCellOrder3Col(null);
  };

  const handleDragDrop3ColRemoveCell = () => {
    if (dragDrop3ColCells.length > 0) {
      setDragDrop3ColCells(prev => prev.slice(0, -1));
      setCellOrder3Col(null);
    }
  };

  const handleShowCellOrder3Col = () => {
    // Sort cells by position (top-to-bottom, left-to-right)
    const sortedCells = [...dragDrop3ColCells].sort((a, b) => {
      if (a.y !== b.y) return a.y - b.y;
      return a.x - b.x;
    });
    
    const orderString = sortedCells
      .map((cell, index) => `${index + 1}. ${cell.id} at (${cell.x}, ${cell.y})`)
      .join('\n');
    
    setCellOrder3Col(orderString);
  };

  return (
    <div className="avakio-template-demo-container" data-admin-theme={theme}>
      <AvakioTemplate
        id="grid-example-header"
        theme={theme as any}
        type="header"
        borderType="clean"
        content={
          <div>
            <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase', opacity: 0.9 }}>Avakio Components</p>
            <h1 style={{ margin: '0 0 12px 0', fontSize: '32px', fontWeight: 600 }}>AvakioGrid Component</h1>
            <p style={{ margin: 0, fontSize: '16px', opacity: 0.95 }}>
              A grid-based layout that enables placing elements into columns and rows using grid cells. 
            </p>
          </div>
        }
      />

      {/* Basic Grid Example */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          theme={theme as any}
          type="section"
          borderType="clean"
          content={
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>
                <Grid3X3 size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Basic Grid Layout
              </h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>A 4x3 grid with cells of varying sizes (dx/dy for span).</p>
            </div>
          }
        />
        <AvakioGrid
          ref={gridRef}
          id="basic-grid"
          testId="basic-grid"
          theme={theme as any}
          gridColumns={1}
          gridRows={3}
          cells={basicCells}
          margin={12}
          padding={16}
          width="100%"
          height={400}
          borderless={false}
          cellBorderless={false}    
            
        />
      </section>


      {/* Interactive Grid */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          theme={theme as any}
          type="section"
          borderType="clean"
          content={
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>Interactive Grid with API Methods</h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Add, remove, move cells, drag & drop reordering, and save/restore state.</p>
            </div>
          }
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
          <Button onClick={handleAddCell} size="sm">
            <Plus size={16} style={{ marginRight: '4px' }} />
            Add Cell
          </Button>
          <Button onClick={handleRemoveLastCell} size="sm" variant="outline">
            <Trash2 size={16} style={{ marginRight: '4px' }} />
            Remove Last
          </Button>
          <Button onClick={handleMoveCell} size="sm" variant="outline">
            <Move size={16} style={{ marginRight: '4px' }} />
            Move First
          </Button>
          <Button onClick={handleClearAll} size="sm" variant="outline">
            <RotateCcw size={16} style={{ marginRight: '4px' }} />
            Clear All
          </Button>
          <Button onClick={handleSerialize} size="sm" variant="outline">
            <Save size={16} style={{ marginRight: '4px' }} />
            Save State
          </Button>
          <Button onClick={handleRestore} size="sm" variant="outline" disabled={!savedState}>
            <Upload size={16} style={{ marginRight: '4px' }} />
            Restore
          </Button>
        </div>
        <AvakioGrid
          ref={interactiveGridRef}
          id="interactive-grid"
          testId="interactive-grid"
          theme={theme as any}
          gridColumns={4}
          gridRows={10}
          cells={interactiveCells}
          margin={10}
          padding={12}
          width="100%"
          height={350}
          isDraggable={true}
          onChange={(cells) => setInteractiveCells(cells)}
          onCellClick={(cell) => console.log('Cell clicked:', cell.id)}
          onDragEnd={(cell, pos) => console.log('Cell dragged:', cell.id, 'to', pos)}
        />
      </section>

      {/* Drag & Drop Example */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          theme={theme as any}
          type="section"
          borderType="clean"
          content={
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>Drag & Drop Grid</h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Add, remove and drag cells. All cells have fixed 100px height.</p>
            </div>
          }
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
          <Button onClick={handleDragDropAddCell} size="sm">
            <Plus size={16} style={{ marginRight: '4px' }} />
            Add Cell
          </Button>
          <Button onClick={handleDragDropRemoveCell} size="sm" variant="outline" disabled={dragDropCells.length === 0}>
            <Trash2 size={16} style={{ marginRight: '4px' }} />
            Remove Last
          </Button>
          <Button onClick={handleShowCellOrder} size="sm" variant="outline">
            <List size={16} style={{ marginRight: '4px' }} />
            Show Order
          </Button>
        </div>
        {cellOrder && (
          <pre style={{ 
            background: '#f5f5f5', 
            padding: '12px', 
            borderRadius: '8px', 
            marginBottom: '16px',
            fontSize: '13px',
            lineHeight: '1.6',
            whiteSpace: 'pre-wrap'
          }}>
            {cellOrder}
          </pre>
        )}
        <AvakioGrid
          ref={dragDropGridRef}
          id="drag-drop-grid"
          testId="drag-drop-grid"
          theme={theme as any}
          gridColumns={1}
          gridRows={10}
          cells={dragDropCells}
          margin={10}
          padding={12}
          width="100%"
          height={350}
          isDraggable={true}
          onChange={(cells) => {
            setDragDropCells(cells);
            setCellOrder(null);
          }}
        />
      </section>

      {/* Drag & Drop Example (3 columns) */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          theme={theme as any}
          type="section"
          borderType="clean"
          content={
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>Drag & Drop Grid (3 Columns)</h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Add, remove and drag cells in a 3-column layout. All cells have fixed 100px height.</p>
            </div>
          }
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
          <Button onClick={handleDragDrop3ColAddCell} size="sm">
            <Plus size={16} style={{ marginRight: '4px' }} />
            Add Cell
          </Button>
          <Button onClick={handleDragDrop3ColRemoveCell} size="sm" variant="outline" disabled={dragDrop3ColCells.length === 0}>
            <Trash2 size={16} style={{ marginRight: '4px' }} />
            Remove Last
          </Button>
          <Button onClick={handleShowCellOrder3Col} size="sm" variant="outline">
            <List size={16} style={{ marginRight: '4px' }} />
            Show Order
          </Button>
        </div>
        {cellOrder3Col && (
          <pre style={{ 
            background: '#f5f5f5', 
            padding: '12px', 
            borderRadius: '8px', 
            marginBottom: '16px',
            fontSize: '13px',
            lineHeight: '1.6',
            whiteSpace: 'pre-wrap'
          }}>
            {cellOrder3Col}
          </pre>
        )}
        <AvakioGrid
          ref={dragDropGrid3ColRef}
          id="drag-drop-grid-3col"
          testId="drag-drop-grid-3col"
          theme={theme as any}
          gridColumns={3}
          gridRows={10}
          cells={dragDrop3ColCells}
          margin={10}
          padding={12}
          width="100%"
          height={350}
          isDraggable={true}
          onChange={(cells) => {
            setDragDrop3ColCells(cells);
            setCellOrder3Col(null);
          }}
        />
      </section>

      {/* Dashboard Example */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          theme={theme as any}
          type="section"
          borderType="clean"
          content={
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>Dashboard Layout</h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Real-world dashboard example with stats, charts, and widgets.</p>
            </div>
          }
        />
        <AvakioGrid
          id="dashboard-grid"
          testId="dashboard-grid"
          theme={theme as any}
          gridColumns={4}
          gridRows={3}
          cells={dashboardCells}
          margin={16}
          padding={16}
          width="100%"
          height={450}
        />
      </section>

      {/* Fixed Cell Size */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          theme={theme as any}
          type="section"
          borderType="clean"
          content={
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>Fixed Cell Dimensions</h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Cells with fixed width (150px) and height (100px).</p>
            </div>
          }
        />
        <AvakioGrid
          id="fixed-grid"
          testId="fixed-grid"
          theme={theme as any}
          gridColumns={4}
          gridRows={2}
          cellWidth={150}
          cellHeight={100}
          cells={[
            { id: 'f1', x: 0, y: 0, dx: 1, dy: 1, content: <div style={{ textAlign: 'center' }}>A</div> },
            { id: 'f2', x: 1, y: 0, dx: 2, dy: 1, content: <div style={{ textAlign: 'center' }}>B (Wide)</div> },
            { id: 'f3', x: 3, y: 0, dx: 1, dy: 2, content: <div style={{ textAlign: 'center' }}>C (Tall)</div> },
            { id: 'f4', x: 0, y: 1, dx: 1, dy: 1, content: <div style={{ textAlign: 'center' }}>D</div> },
            { id: 'f5', x: 1, y: 1, dx: 2, dy: 1, content: <div style={{ textAlign: 'center' }}>E</div> },
          ]}
          margin={8}
          padding={12}
          height={250}
        />
      </section>

      {/* All Themes */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          theme={theme as any}
          type="section"
          borderType="clean"
          content="AvakioGrid supports all 6 Avakio themes."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {(['material', 'flat', 'compact', 'dark', 'ocean', 'sunset'] as const).map((themeItem) => (
            <div key={themeItem}>
              <p style={{ margin: '0 0 8px 0', fontWeight: 600, textTransform: 'capitalize' }}>{themeItem}</p>
              <AvakioGrid
                id={`theme-grid-${themeItem}`}
                testId={`theme-grid-${themeItem}`}
                theme={themeItem}
                gridColumns={3}
                gridRows={2}
                cells={[
                  { id: `${themeItem}-1`, x: 0, y: 0, dx: 1, dy: 1, content: <div style={{ textAlign: 'center' }}>1</div> },
                  { id: `${themeItem}-2`, x: 1, y: 0, dx: 2, dy: 1, content: <div style={{ textAlign: 'center' }}>2</div> },
                  { id: `${themeItem}-3`, x: 0, y: 1, dx: 2, dy: 1, content: <div style={{ textAlign: 'center' }}>3</div> },
                  { id: `${themeItem}-4`, x: 2, y: 1, dx: 1, dy: 1, content: <div style={{ textAlign: 'center' }}>4</div> },
                ]}
                margin={8}
                padding={12}
                height={180}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Borderless Example */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          theme={theme as any}
          type="section"
          borderType="clean"
          content={
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>Borderless Grid</h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Clean look without borders using the cellBorderless prop (cells only) or borderless prop (container only).</p>
            </div>
          }
        />
        <AvakioGrid
          id="borderless-grid"
          testId="borderless-grid"
          theme={theme as any}
          cellBorderless
          gridColumns={4}
          gridRows={2}
          cells={[
            { id: 'bl1', x: 0, y: 0, dx: 1, dy: 1, content: <div style={{ padding: '12px', background: '#e3f2fd', borderRadius: '8px', textAlign: 'center' }}>Card 1</div> },
            { id: 'bl2', x: 1, y: 0, dx: 1, dy: 1, content: <div style={{ padding: '12px', background: '#f3e5f5', borderRadius: '8px', textAlign: 'center' }}>Card 2</div> },
            { id: 'bl3', x: 2, y: 0, dx: 1, dy: 1, content: <div style={{ padding: '12px', background: '#e8f5e9', borderRadius: '8px', textAlign: 'center' }}>Card 3</div> },
            { id: 'bl4', x: 3, y: 0, dx: 1, dy: 1, content: <div style={{ padding: '12px', background: '#fff3e0', borderRadius: '8px', textAlign: 'center' }}>Card 4</div> },
            { id: 'bl5', x: 0, y: 1, dx: 2, dy: 1, content: <div style={{ padding: '12px', background: '#fce4ec', borderRadius: '8px', textAlign: 'center' }}>Wide Card</div> },
            { id: 'bl6', x: 2, y: 1, dx: 2, dy: 1, content: <div style={{ padding: '12px', background: '#e0f2f1', borderRadius: '8px', textAlign: 'center' }}>Wide Card 2</div> },
          ]}
          margin={12}
          padding={0}
          height={200}
        />
      </section>

      {/* Fixed Height Cells Example */}
      <section className="avakio-template-demo-section">
        <AvakioTemplate
          theme={theme as any}
          type="section"
          borderType="clean"
          content={
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>Fixed Height Cells</h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Individual cells can have fixed heights. Remaining cells share the available space.</p>
            </div>
          }
        />
        <AvakioGrid
          id="fixed-height-grid"
          testId="fixed-height-grid"
          theme={theme as any}
          gridColumns={1}
          gridRows={4}
          margin={12}
          width="100%"
          height={500}
          cells={[
            { 
              id: 'fh-description', 
              x: 0, 
              y: 0, 
              height: 50,
              css: { background: 'transparent', border: 'none', boxShadow: 'none' },
              content: (
                <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                  <p style={{ margin: 0, color: '#666' }}>This description row has a fixed height of 50px with transparent styling.</p>
                </div>
              )
            },
            { 
              id: 'fh-header', 
              x: 0, 
              y: 1,
              height: 80,
              content: (
                <div style={{ background: 'linear-gradient(135deg, #1CA1C1 0%, #00796B 100%)', color: 'white', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}>
                  <h3 style={{ margin: 0 }}>Header Section (Fixed 80px)</h3>
                </div>
              )
            },
            { 
              id: 'fh-content', 
              x: 0, 
              y: 2,
              // No height = flexible, fills remaining space
              content: (
                <div style={{ padding: '16px' }}>
                  <h4 style={{ margin: '0 0 12px 0' }}>Content Section (Flexible Height)</h4>
                  <p>This cell has no fixed height, so it automatically expands to fill the remaining space.</p>
                  <p>The grid calculates: Total Height (500px) - Fixed Heights (50 + 80 + 60) - Margins - Padding = Flexible Height</p>
                </div>
              )
            },
            { 
              id: 'fh-footer', 
              x: 0, 
              y: 3,
              height: 60,
              content: (
                <div style={{ background: '#f5f5f5', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}>
                  <span style={{ color: '#666' }}>Footer (Fixed 60px)</span>
                </div>
              )
            },
          ]}
        />
      </section>
    </div>
  );
}















