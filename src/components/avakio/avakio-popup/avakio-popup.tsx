import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./avakio-popup.css";

export type AvakioPopupProps = {
  open: boolean;
  anchorRef?: React.RefObject<HTMLElement | null>;
  anchorRect?: DOMRect;
  x?: number;
  y?: number;
  offset?: { x?: number; y?: number };
  width?: number | string;
  height?: number | string;
  theme?: string;
  modal?: boolean;
  closeOnOutside?: boolean;
  closeOnEsc?: boolean;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  /** ID of the component */
  id?: string;
  /** Test ID for testing purposes */
  testId?: string;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function AvakioPopup({
  open,
  anchorRef,
  anchorRect,
  x,
  y,
  offset,
  width,
  height,
  theme,
  modal,
  closeOnOutside = true,
  closeOnEsc = true,
  onClose,
  className,
  style,
  children,
  id,
  testId,
}: AvakioPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const numericWidth = useMemo(() => {
    if (typeof width === "number") return width;
    if (typeof width === "string") {
      const parsed = parseInt(width, 10);
      return isNaN(parsed) ? 320 : parsed;
    }
    return 320;
  }, [width]);

  useEffect(() => {
    if (!open) return;

    const updatePosition = () => {
      let nextLeft = typeof x === "number" ? x : (window.innerWidth - numericWidth) / 2;
      let nextTop = typeof y === "number" ? y : 96;

      if (anchorRef?.current) {
        const rect = anchorRef.current.getBoundingClientRect();
        nextLeft = rect.left + (offset?.x ?? 0);
        nextTop = rect.bottom + (offset?.y ?? 8);
      } else if (anchorRect) {
        nextLeft = anchorRect.left + (offset?.x ?? 0);
        nextTop = anchorRect.bottom + (offset?.y ?? 8);
      }

      const maxLeft = Math.max(8, window.innerWidth - numericWidth - 8);
      nextLeft = clamp(nextLeft, 8, maxLeft);
      nextTop = Math.max(8, nextTop);

      setCoords({ top: nextTop, left: nextLeft });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, anchorRef, anchorRect, x, y, offset, numericWidth]);

  useEffect(() => {
    if (!open || !closeOnEsc) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeOnEsc, onClose]);

  useEffect(() => {
    if (!open || !closeOnOutside) return;
    const handleClick = (e: MouseEvent) => {
      if (!popupRef.current) return;
      if (popupRef.current.contains(e.target as Node)) return;
      onClose?.();
    };
    document.addEventListener("mousedown", handleClick, true);
    return () => document.removeEventListener("mousedown", handleClick, true);
  }, [open, closeOnOutside, onClose]);

  if (!open) return null;

  const popupNode = (
    <>
      {modal && (
        <div
          className="avakio-popup-overlay"
          data-admin-theme={theme}
          onClick={closeOnOutside ? onClose : undefined}
        />
      )}
      <div
        ref={popupRef}
        id={id}
        data-testid={testId}
        className={["avakio-popup", className || ""].join(" ").trim()}
        data-admin-theme={theme}
        style={{
          top: coords.top,
          left: coords.left,
          width: width ?? `${numericWidth}px`,
          height,
          ...style,
        }}
      >
        {children}
      </div>
    </>
  );

  return createPortal(popupNode, document.body);
}

export default AvakioPopup;








