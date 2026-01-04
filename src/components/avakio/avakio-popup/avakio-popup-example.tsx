import React, { useMemo, useRef, useState } from "react";
import { AvakioPopup } from "./avakio-popup";
import "./avakio-popup.css";
import "./avakio-popup-example.css";

export function AvakioPopupExample() {
  const [theme, setTheme] = useState("material");
  const [openAnchor, setOpenAnchor] = useState(false);
  const [openCenter, setOpenCenter] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const now = useMemo(() => new Date().toISOString(), []);

  return (
    <div
      className="min-h-screen p-8"
      data-admin-theme={theme}
      style={{
        background: theme === "dark" ? "hsl(222, 47%, 11%)" : "#f8fafc",
        color: theme === "dark" ? "hsl(210, 40%, 96%)" : "#0f172a",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 24 }}>Avakio Popup</h2>
          <p className="sch-demo-meta">popup for contextual overlays and modals.</p>
        </div>
        <select className="sch-theme-select" value={theme} onChange={(e) => setTheme(e.target.value)}>
          {["material", "flat", "compact", "dark", "ocean", "sunset"].map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="popup-demo-grid">
        <div className="popup-demo-card">
          <h4>Anchored popup</h4>
          <p className="sch-demo-meta">Aligns to a trigger; closes on outside click or Esc.</p>
          <div className="popup-demo-actions">
            <button ref={anchorRef} className="popup-btn" onClick={() => setOpenAnchor(true)}>
              Open anchored popup
            </button>
            <button className="popup-btn" onClick={() => setOpenCenter(true)}>
              Open modal popup
            </button>
          </div>
          <div className="popup-chip">Last opened: {new Date(now).toLocaleString()}</div>
        </div>
      </div>

      <AvakioPopup
        open={openAnchor}
        anchorRef={anchorRef}
        offset={{ y: 6 }}
        theme={theme}
        closeOnOutside
        closeOnEsc
        onClose={() => setOpenAnchor(false)}
      >
        <h4>Quick Actions</h4>
        <p>Use this popup to show contextual actions near a trigger.</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button className="popup-btn" onClick={() => setOpenAnchor(false)}>Approve</button>
          <button className="popup-btn" onClick={() => setOpenAnchor(false)}>Reject</button>
          <button className="popup-btn" onClick={() => setOpenAnchor(false)}>Remind</button>
        </div>
      </AvakioPopup>

      <AvakioPopup
        open={openCenter}
        modal
        theme={theme}
        closeOnOutside
        closeOnEsc
        onClose={() => setOpenCenter(false)}
        width={360}
      >
        <h4>Modal Popup</h4>
        <p>This variant uses an overlay and centers itself in the viewport.</p>
        <p style={{ marginTop: 8 }}>Great for confirmations or compact forms.</p>
        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <button className="popup-btn" onClick={() => setOpenCenter(false)}>Close</button>
          <button className="popup-btn" onClick={() => setOpenCenter(false)}>Submit</button>
        </div>
      </AvakioPopup>
    </div>
  );
}

export default AvakioPopupExample;









