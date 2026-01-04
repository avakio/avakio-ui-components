import React, { useEffect, useMemo, useState } from "react";
import { AvakioPortletBoard, AvakioPortletTheme, avakioPortletThemes, PortletColumn, PortletItem } from "./avakio-portlet";
import "./avakio-portlet.css";

const themeBackgrounds: Record<AvakioPortletTheme, string> = {
  material: "#f8fafc",
  flat: "#f7f9fb",
  compact: "#f4faf8",
  dark: "#0b1221",
  ocean: "#f1f7fd",
  sunset: "#fff8f1",
};

const defaultColumns: PortletColumn[] = [
  { id: "todo", title: "To Do" },
  { id: "progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

const initialItems: PortletItem[] = [
  { id: "p1", title: "Docs", content: "Review API docs", columnId: "todo" },
  { id: "p2", title: "UI polish", content: "Tighten spacing", columnId: "progress" },
  { id: "p3", title: "QA", content: "Run regression suite", columnId: "done" },
  { id: "p4", title: "Deploy", content: "Schedule rollout", columnId: "todo" },
];

export function AvakioPortletExample() {
  const [theme, setTheme] = useState<AvakioPortletTheme>("material");
  const [items, setItems] = useState<PortletItem[]>(initialItems);

  // Sync with global theme from components-showcase
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const globalTheme = document.documentElement.getAttribute('data-admin-theme') as AvakioPortletTheme;
      if (globalTheme && avakioPortletThemes.includes(globalTheme) && globalTheme !== theme) {
        setTheme(globalTheme);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-admin-theme'],
    });

    // Set initial theme if it exists
    const initialTheme = document.documentElement.getAttribute('data-admin-theme') as AvakioPortletTheme;
    if (initialTheme && avakioPortletThemes.includes(initialTheme) && initialTheme !== theme) {
      setTheme(initialTheme);
    }

    return () => observer.disconnect();
  }, [theme]);

  const handleMove = (itemId: string, toColumnId: string) => {
    setItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, columnId: toColumnId } : item)));
  };

  const counts = useMemo(() => {
    const tally: Record<string, number> = {};
    defaultColumns.forEach((c) => (tally[c.id] = 0));
    items.forEach((i) => {
      tally[i.columnId] = (tally[i.columnId] ?? 0) + 1;
    });
    return tally;
  }, [items]);

  return (
    <div
      data-admin-theme={theme}
      style={{
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        background: themeBackgrounds[theme],
        minHeight: "100vh",
      }}
    >
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", fontSize: 13, color: "var(--ap-muted, #475569)" }}>
        {defaultColumns.map((c) => (
          <span key={c.id} style={{ padding: "6px 10px", border: "1px solid var(--ap-border, #e2e8f0)", borderRadius: 8, background: "var(--ap-bg, #f8fafc)" }}>
            {c.title}: <strong>{counts[c.id] ?? 0}</strong>
          </span>
        ))}
      </div>

      <AvakioPortletBoard
        columns={defaultColumns}
        items={items}
        onMove={handleMove}
        theme={theme}
      />
    </div>
  );
}

export default AvakioPortletExample;









