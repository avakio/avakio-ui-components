# Avakio Google Map

A lightweight Google Maps wrapper for Avakio demos with theme-aware styling. 

## Usage

```tsx
import { AvakioGoogleMap } from "@/components/avakio/avakio-googlemap/avakio-googlemap";

<AvakioGoogleMap
  center={{ lat: 37.7749, lng: -122.4194 }}
  zoom={11}
  markers={[
    { id: "sf", label: "San Francisco", position: { lat: 37.7749, lng: -122.4194 } },
    { id: "nyc", label: "New York", position: { lat: 40.7128, lng: -74.006 } },
  ]}
  theme="material"
  height={420}
  // apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
/>
```

## API

- `center`: `{ lat, lng }` (required) map center.
- `zoom`: `number` (default `12`).
- `markers`: array of `{ id?, label?, position: { lat, lng } }`.
- `mapType`: `"roadmap" | "satellite" | "hybrid" | "terrain"` (default `"roadmap"`).
- `height`: number or string, sets the canvas height (default `360`).
- `className`, `style`: pass-through to the root container.
- `apiKey`: Google Maps API key. If omitted or `null`, the component falls back to an embed-only map (no JS API).
- `theme`: one of `material | flat | compact | dark | ocean | sunset`; applies `data-admin-theme` styling.

## Themes

`avakio-googlemap.css` defines theme tokens for: material, flat, compact, dark, ocean, sunset. The component responds to `data-admin-theme` on itself or an ancestor, so you can style via a page-level theme switcher.

## Google Maps API key

- Add `VITE_GOOGLE_MAPS_API_KEY` to your environment for interactive maps.
- Passing `apiKey={null}` (default when the env var is absent) keeps the embed-only fallback, which does not require a key.

## Example

See `avakio-googlemap-example.tsx` for a theme selector, zoom slider, and marker chooser. The example defaults to the embed fallback; supply an API key to make it interactive.

## Testing

`avakio-googlemap.test.tsx` covers the embed fallback and marker rendering. The tests do not require a Google Maps API key.

