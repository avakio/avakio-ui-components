import React from "react";
import "./avakio-timeline.css";

export type AvakioTimelineItem = {
  id: string | number;
  title: string;
  subtitle?: string;
  description?: string;
  meta?: string;
  date?: string;
  time?: string;
  status?: "success" | "warning" | "danger" | "info" | "neutral" | string;
  color?: string;
};

export type AvakioTimelineProps = {
  items: AvakioTimelineItem[];
  theme?: string;
  onItemClick?: (item: AvakioTimelineItem) => void;
  className?: string;
  style?: React.CSSProperties;
  dense?: boolean;
  orientation?: "vertical" | "horizontal";
  variant?: "default" | "split" | "colorband";
};

export function AvakioTimeline({
  items,
  theme,
  onItemClick,
  className,
  style,
  dense,
  orientation = "vertical",
  variant = "default",
}: AvakioTimelineProps) {
  const rootClasses = ["avakio-timeline", dense ? "is-dense" : "", className || ""].filter(Boolean);
  if (orientation === "horizontal") rootClasses.push("is-horizontal");
  if (orientation === "vertical" && variant === "split") rootClasses.push("is-vertical-split");
  if (orientation === "horizontal" && variant === "colorband") rootClasses.push("is-horizontal-colorband");

  const vertical = (
    <div
      className={rootClasses.join(" ").trim()}
      data-admin-theme={theme}
      style={style}
    >
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        const dotClass = item.status ? `av-tl-dot-${item.status}` : "";
        const showDateInCard = variant === "split";
        const leftLabel = showDateInCard ? undefined : item.date || item.meta || item.time;
        const showConnector = true;
        const clickable = Boolean(onItemClick);
        const handleClick = () => onItemClick?.(item);
        const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (!onItemClick) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onItemClick(item);
          }
        };
        return (
          <div
            key={item.id}
            className={["av-tl-row", clickable ? "is-clickable" : ""].join(" ").trim()}
            onClick={handleClick}
            role={clickable ? "button" : undefined}
            tabIndex={clickable ? 0 : undefined}
            onKeyDown={handleKey}
          >
            <div className="av-tl-date">{leftLabel}</div>
            <div className={["av-tl-marker", isLast ? "is-last" : ""].join(" ").trim()}>
              <span
                className={["av-tl-dot", dotClass].join(" ").trim()}
                style={item.color ? { background: item.color, boxShadow: `0 0 0 3px ${item.color}1a` } : undefined}
              >
                {variant === "split" ? item.id : undefined}
              </span>
              {!isLast && showConnector && <span className="av-tl-line" />}
            </div>
            <div className="av-tl-card">
              <div className="av-tl-card-head">
                {showDateInCard && item.date && <div className="av-tl-date-inline">{item.date}</div>}
                <div className="av-tl-title">{item.title}</div>
              </div>
              {item.subtitle && <div className="av-tl-subtitle">{item.subtitle}</div>}
              {item.description && <div className="av-tl-desc">{item.description}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );

  const horizontal = (
    <div
      className={rootClasses.join(" ").trim()}
      data-admin-theme={theme}
      style={style}
    >
      <div className="av-tl-h-track">
        {items.map((item, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === items.length - 1;
          const dotClass = item.status ? `av-tl-dot-${item.status}` : "";
          const isColorBand = variant === "colorband";
          const topLabel = isColorBand ? undefined : item.date || item.meta || item.time;
          const clickable = Boolean(onItemClick);
          const handleClick = () => onItemClick?.(item);
          const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (!onItemClick) return;
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onItemClick(item);
            }
          };
          const positionClass = isColorBand ? (idx % 2 === 0 ? "is-top" : "is-bottom") : "";
          return (
            <div
              key={item.id}
              className={["av-tl-h-item", isFirst ? "is-first" : "", isLast ? "is-last" : "", clickable ? "is-clickable" : "", positionClass].join(" ").trim()}
              onClick={handleClick}
              role={clickable ? "button" : undefined}
              tabIndex={clickable ? 0 : undefined}
              onKeyDown={handleKey}
            >
              {!isColorBand && <div className="av-tl-h-date">{topLabel}</div>}
              <div className={["av-tl-h-dotwrap", isFirst ? "is-first" : "", isLast ? "is-last" : ""].join(" ").trim()}>
                <span className={["av-tl-dot", dotClass].join(" ").trim()} style={item.color ? { background: item.color, boxShadow: `0 0 0 3px ${item.color}1a` } : undefined} />
              </div>
              <div className="av-tl-h-card">
                {isColorBand && item.date && <div className="av-tl-h-date-inline">{item.date}</div>}
                <div className="av-tl-h-title">{item.title}</div>
                {item.description && <div className="av-tl-h-desc">{item.description}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return orientation === "horizontal" ? horizontal : vertical;
}

export default AvakioTimeline;








