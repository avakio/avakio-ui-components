import React, { useMemo, useState } from "react";
import "./avakio-portlet.css";

export const avakioPortletThemes = ["material", "flat", "compact", "dark", "ocean", "sunset"] as const;
export type AvakioPortletTheme = (typeof avakioPortletThemes)[number];

export type PortletColumn = {
  id: string;
  title: string;
};

export type PortletItem = {
  id: string;
  title: string;
  content: React.ReactNode;
  columnId: string;
};

export interface AvakioPortletBoardProps {
  columns: PortletColumn[];
  items: PortletItem[];
  onMove?: (itemId: string, toColumnId: string) => void;
  className?: string;
  style?: React.CSSProperties;
  theme?: AvakioPortletTheme;
  /** ID of the component */
  id?: string;
  /** Test ID for testing purposes */
  testId?: string;
}

export function AvakioPortletBoard({ columns, items, onMove, className, style, theme, id, testId }: AvakioPortletBoardProps) {
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const grouped = useMemo(() => {
    const map: Record<string, PortletItem[]> = {};
    columns.forEach((c) => {
      map[c.id] = [];
    });
    items.forEach((item) => {
      if (!map[item.columnId]) map[item.columnId] = [];
      map[item.columnId].push(item);
    });
    return map;
  }, [columns, items]);

  const handleDragStart = (id: string) => (ev: React.DragEvent<HTMLDivElement>) => {
    setDraggingId(id);
    ev.dataTransfer.effectAllowed = "move";
    ev.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (columnId: string) => (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    const itemId = ev.dataTransfer.getData("text/plain") || draggingId;
    if (itemId && onMove) {
      onMove(itemId, columnId);
    }
    setDraggingId(null);
  };

  return (
    <div
      id={id}
      data-testid={testId}
      className={["avakio-portlet", className].filter(Boolean).join(" ")}
      style={style}
      data-admin-theme={theme}
    >
      <div className="avakio-portlet-grid">
        {columns.map((col) => (
          <div
            key={col.id}
            className="avakio-portlet-column"
            onDragOver={handleDragOver}
            onDrop={handleDrop(col.id)}
            data-column-id={col.id}
            data-testid={`portlet-column-${col.id}`}
          >
            <div className="avakio-portlet-column-header">{col.title}</div>
            <div className="avakio-portlet-column-body">
              {grouped[col.id]?.map((item) => {
                const dragging = draggingId === item.id;
                return (
                  <div
                    key={item.id}
                    className={"avakio-portlet-item" + (dragging ? " avakio-portlet-item-dragging" : "")}
                    draggable
                    onDragStart={handleDragStart(item.id)}
                    onDragEnd={() => setDraggingId(null)}
                    data-testid={`portlet-item-${item.id}`}
                  >
                    <div className="avakio-portlet-item-title">{item.title}</div>
                    <div className="avakio-portlet-item-content">{item.content}</div>
                  </div>
                );
              })}
              {(!grouped[col.id] || grouped[col.id].length === 0) && (
                <div className="avakio-portlet-empty">Drop items here</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}








