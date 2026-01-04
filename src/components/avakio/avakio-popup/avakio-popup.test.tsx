import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AvakioPopup } from "./avakio-popup";

function renderPopup(props: Partial<React.ComponentProps<typeof AvakioPopup>> = {}) {
  const onClose = vi.fn();
  const utils = render(
    <AvakioPopup open={props.open ?? true} onClose={onClose} {...props}>
      <div>Popup content</div>
    </AvakioPopup>,
  );
  return { ...utils, onClose };
}

describe("AvakioPopup", () => {
  it("renders when open and removes when closed", () => {
    const { rerender } = render(
      <AvakioPopup open={false}>
        <div>Hidden content</div>
      </AvakioPopup>,
    );
    expect(screen.queryByText("Hidden content")).toBeNull();

    rerender(
      <AvakioPopup open={true}>
        <div>Hidden content</div>
      </AvakioPopup>,
    );
    expect(screen.getByText("Hidden content")).toBeInTheDocument();
  });

  it("calls onClose when clicking outside", () => {
    const { onClose } = renderPopup();
    expect(screen.getByText("Popup content")).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose on Escape press when enabled", () => {
    const { onClose } = renderPopup({ closeOnEsc: true });
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders modal overlay and uses theme token", () => {
    renderPopup({ modal: true, theme: "dark" });
    const overlay = document.querySelector(".avakio-popup-overlay");
    expect(overlay).toBeInTheDocument();
    expect(overlay?.getAttribute("data-admin-theme")).toBe("dark");
  });
});








