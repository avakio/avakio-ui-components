import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AvakioProperty, AvakioPropertyItem } from "./avakio-property";

describe("AvakioProperty", () => {
  it("renders grouped rows and theme token", () => {
    const items: AvakioPropertyItem[] = [
      { id: "title", label: "Title", type: "text", value: "Hello", group: "General" },
      { id: "flag", label: "Flag", type: "checkbox", value: true, group: "Advanced" },
    ];

    const { container } = render(<AvakioProperty items={items} theme="material" />);

    expect(screen.getByText("General")).toBeInTheDocument();
    expect(screen.getByText("Advanced")).toBeInTheDocument();
    const root = container.querySelector(".avakio-property");
    expect(root?.getAttribute("data-admin-theme")).toBe("material");
  });

  it("calls onChange when text value updates", async () => {
    const onChange = vi.fn();
    const items: AvakioPropertyItem[] = [
      { id: "title", label: "Title", type: "text", value: "Old" },
    ];

    render(<AvakioProperty items={items} onChange={onChange} />);

    fireEvent.change(screen.getByLabelText("Title"), { target: { value: "New" } });

    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1));
    const [nextItems, changed] = onChange.mock.calls[0];
    expect(changed.id).toBe("title");
    expect(changed.value).toBe("New");
    expect(nextItems.find((i: AvakioPropertyItem) => i.id === "title")?.value).toBe("New");
  });

  it("toggles checkbox and propagates boolean", async () => {
    const onChange = vi.fn();
    const items: AvakioPropertyItem[] = [
      { id: "flag", label: "Enable feature", type: "checkbox", value: false },
    ];

    render(<AvakioProperty items={items} onChange={onChange} />);

    fireEvent.click(screen.getByLabelText("Enable feature"));

    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1));
    const [, changed] = onChange.mock.calls[0];
    expect(changed.id).toBe("flag");
    expect(changed.value).toBe(true);
  });

  it("updates slider value and emits numeric change", async () => {
    const onChange = vi.fn();
    const items: AvakioPropertyItem[] = [
      { id: "slider", label: "Volume", type: "slider", value: 10, sliderMin: 0, sliderMax: 100 },
    ];

    const { container } = render(<AvakioProperty items={items} onChange={onChange} />);

    const range = container.querySelector('input[type="range"]');
    expect(range).toBeInTheDocument();
    fireEvent.change(range as HTMLInputElement, { target: { value: "30" } });

    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1));
    const [, changed] = onChange.mock.calls[0];
    expect(changed.id).toBe("slider");
    expect(changed.value).toBe(30);
  });
});








