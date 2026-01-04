# Avakio Popup

A popup for contextual overlays and lightweight modals.

## Props

- `open: boolean` – Controls visibility.
- `anchorRef?: RefObject<HTMLElement>` – Anchor element to align the popup.
- `anchorRect?: DOMRect` – Alternative anchor rect if you position manually.
- `x?: number`, `y?: number` – Explicit viewport coordinates (fallback when no anchor).
- `offset?: { x?: number; y?: number }` – Offset from anchor or coordinates.
- `width?: number | string`, `height?: number | string` – Sizing (default width ~320px).
- `modal?: boolean` – Adds a backdrop and keeps popup on top.
- `closeOnOutside?: boolean` (default `true`) – Close on outside click.
- `closeOnEsc?: boolean` (default `true`) – Close on Escape.
- `onClose?: () => void` – Fired when the popup requests close.
- `className?: string`, `style?: React.CSSProperties` – Styling hooks.
- `children: React.ReactNode` – Popup content.

## Usage (anchored)

```tsx
import { useRef, useState } from "react";
import { AvakioPopup } from "./avakio-popup";
import "./avakio-popup.css";

function AnchoredExample() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button ref={btnRef} onClick={() => setOpen(true)}>Open</button>
      <AvakioPopup
        open={open}
        anchorRef={btnRef}
        offset={{ y: 6 }}
        closeOnOutside
        closeOnEsc
        onClose={() => setOpen(false)}
      >
        <h4>Quick Actions</h4>
        <p>Select an option.</p>
      </AvakioPopup>
    </>
  );
}
```

## Usage (modal/centered)

```tsx
<AvakioPopup
  open={modalOpen}
  modal
  width={360}
  closeOnOutside
  onClose={() => setModalOpen(false)}
>
  <h4>Modal Popup</h4>
  <p>Small confirmations or forms.</p>
</AvakioPopup>
```

## Theming

Respects `data-admin-theme` tokens (`material`, `flat`, `compact`, `dark`, `ocean`, `sunset`). Apply the attribute on an ancestor or on the component itself.

