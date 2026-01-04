import React, { useEffect, useMemo, useRef } from "react";
import "./avakio-googlemap.css";

type LatLng = { lat: number; lng: number };

type MapMarker = {
  id?: string;
  label?: string;
  position: LatLng;
};

export const avakioThemes = ["material", "flat", "compact", "dark", "ocean", "sunset"] as const;
export type AvakioTheme = (typeof avakioThemes)[number];

declare global {
  interface Window {
    google?: any;
    __avakioGooglePromise?: Promise<any>;
  }
}

const GOOGLE_SCRIPT_ID = "avakio-googlemaps-script";

function loadGoogleMaps(apiKey: string) {
  if (typeof window === "undefined") return Promise.reject(new Error("window not available"));
  if (window.google?.maps) return Promise.resolve(window.google);
  if (window.__avakioGooglePromise) return window.__avakioGooglePromise;

  window.__avakioGooglePromise = new Promise((resolve, reject) => {
    const existing = document.getElementById(GOOGLE_SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => resolve(window.google));
      existing.addEventListener("error", reject);
      return;
    }

    const script = document.createElement("script");
    script.id = GOOGLE_SCRIPT_ID;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google);
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return window.__avakioGooglePromise;
}

export interface AvakioGoogleMapProps {
  center: LatLng;
  zoom?: number;
  markers?: MapMarker[];
  mapType?: "roadmap" | "satellite" | "hybrid" | "terrain";
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
  apiKey?: string | null;
  theme?: AvakioTheme;
  /** ID of the component */
  id?: string;
  /** Test ID for testing purposes */
  testId?: string;
}

export function AvakioGoogleMap({
  center,
  zoom = 12,
  markers = [],
  mapType = "roadmap",
  height = 360,
  className,
  style,
  apiKey,
  theme,
  id,
  testId,
}: AvakioGoogleMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markerRefs = useRef<any[]>([]);

  const resolvedApiKey = apiKey ?? (typeof import.meta !== "undefined" ? (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY : undefined) ?? null;

  const iframeSrc = useMemo(() => {
    const lat = center.lat.toFixed(6);
    const lng = center.lng.toFixed(6);
    const urlZoom = zoom ?? 12;
    return `https://www.google.com/maps?q=${lat},${lng}&z=${urlZoom}&output=embed`;
  }, [center.lat, center.lng, zoom]);

  // Initialize interactive map when an API key is available.
  useEffect(() => {
    if (!resolvedApiKey || typeof window === "undefined") return;
    let cancelled = false;

    loadGoogleMaps(resolvedApiKey)
      .then((google) => {
        if (cancelled || !containerRef.current) return;

        if (!mapRef.current) {
          mapRef.current = new google.maps.Map(containerRef.current, {
            center,
            zoom,
            mapTypeId: mapType,
            streetViewControl: false,
            fullscreenControl: false,
          });
        } else {
          mapRef.current.setOptions({ center, zoom, mapTypeId: mapType });
        }

        // Reset markers
        markerRefs.current.forEach((m) => m.setMap(null));
        markerRefs.current = markers.map((marker) => new google.maps.Marker({
          position: marker.position,
          title: marker.label,
          map: mapRef.current,
        }));
      })
      .catch(() => {
        // If script load fails we silently fall back to the embed iframe.
      });

    return () => {
      cancelled = true;
      markerRefs.current.forEach((m) => m.setMap(null));
      markerRefs.current = [];
    };
  }, [resolvedApiKey, center.lat, center.lng, zoom, mapType, markers]);

  const heightValue = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      id={id}
      data-testid={testId}
      className={["avakio-googlemap", className].filter(Boolean).join(" ")}
      style={{ ...style, ["--agm-height" as string]: heightValue }}
      data-admin-theme={theme}
    >
      {resolvedApiKey ? (
        <div ref={containerRef} data-testid="avakio-googlemap-interactive" className="avakio-googlemap-canvas" />
      ) : (
        <iframe
          data-testid="avakio-googlemap-embed"
          title="Google Map"
          src={iframeSrc}
          className="avakio-googlemap-embed"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      )}

      {markers.length > 0 && (
        <div className="avakio-googlemap-markerlist" aria-label="Markers">
          {markers.map((marker, idx) => (
            <div key={marker.id ?? idx} className="avakio-googlemap-markeritem">
              <span className="avakio-googlemap-markerbadge">{idx + 1}</span>
              <div className="avakio-googlemap-markertext">
                <strong>{marker.label ?? `Marker ${idx + 1}`}</strong>
                <span>{marker.position.lat}, {marker.position.lng}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}











