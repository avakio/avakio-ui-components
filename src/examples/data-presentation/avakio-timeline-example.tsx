import React, { useMemo, useState } from "react";
import { AvakioTimeline, AvakioTimelineItem } from "../../components/avakio/data-presentation/avakio-timeline/avakio-timeline";
import { AvakioPopup } from "../../components/avakio/avakio-popup/avakio-popup";
import "../../components/avakio/data-presentation/avakio-timeline/avakio-timeline.css";
import "./avakio-timeline-example.css";
import "../../components/avakio/avakio-popup/avakio-popup.css";

export function AvakioTimelineExample() {
  const [theme, setTheme] = useState("material");
  const [activeItem, setActiveItem] = useState<AvakioTimelineItem | null>(null);

  const items: AvakioTimelineItem[] = useMemo(
    () => [
      {
        id: "1",
        title: "Foundation",
        description: "Foundation of the Borcelle company by a group of enthusiasts.",
        date: "01 Aug, 2017",
        status: "info",
      },
      {
        id: "2",
        title: "First Prototype",
        date: "10 Sep, 2017",
        description: "Lounch of the first prototype of the Borcelle car.",
        status: "success",
      },
      {
        id: "3",
        title: "Expanded Testing",
        description: "Expanded testing phase with additional test drivers.",
        date: "11 Dec, 2017",
        status: "danger",
      },
      {
        id: "4",
        title: "Fixed",
        date: "10 Feb, 2018",
        status: "info",
      },
      {
        id: "5",
        title: "Available",
        date: "15 Mar, 2018",
        status: "info",
      },
      {
        id: "6",
        title: "Taken",
        date: "21 Mar, 2018",
        description: "by Rosa White",
        status: "success",
      },
      {
        id: "7",
        title: "Broken",
        date: "16 May, 2019",
        status: "danger",
      },
    ],
    []
  );

  return (
    <div
      className="tl-demo-shell"
      style={{ background: theme === "dark" ? "hsl(222, 47%, 11%)" : "#f8fafc" }}
    >
      <div className="tl-demo-header">
        <div>
          <h2>Avakio Timeline</h2>
          <p className="tl-demo-meta">timeline for milestones and activity feeds.</p>
        </div>
        <select className="tl-demo-select" value={theme} onChange={(e) => setTheme(e.target.value)}>
          {["material", "flat", "compact", "dark", "ocean", "sunset"].map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="tl-demo-card">
        <h4 className="tl-demo-label">Vertical</h4>
        <AvakioTimeline items={items} onItemClick={setActiveItem} />
      </div>

      <div className="tl-demo-card">
        <h4 className="tl-demo-label">Horizontal</h4>
        <AvakioTimeline items={items} orientation="horizontal" onItemClick={setActiveItem} />
      </div>

      <div className="tl-demo-card">
        <h4 className="tl-demo-label">Vertical — Style 2</h4>
        <AvakioTimeline
          items={items}
          variant="split"
          onItemClick={setActiveItem}
        />
      </div>

      <div className="tl-demo-card">
        <h4 className="tl-demo-label">Horizontal — Style 2</h4>
        <AvakioTimeline
          items={items}
          orientation="horizontal"
          variant="colorband"
          onItemClick={setActiveItem}
        />
      </div>

      <AvakioPopup
        open={Boolean(activeItem)}
        onClose={() => setActiveItem(null)}
        modal
      >
        <h4>Clicked item</h4>
        <p>ID: {activeItem?.id}</p>
      </AvakioPopup>
    </div>
  );
}

export default AvakioTimelineExample;











