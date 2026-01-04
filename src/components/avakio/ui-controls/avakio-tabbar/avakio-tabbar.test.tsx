import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AvakioTabBar, AvakioTabBarOption } from "./avakio-tabbar";

const options: AvakioTabBarOption[] = [
  { id: "home", label: "Home" },
  { id: "settings", label: "Settings", badge: 3 },
  { id: "logs", label: "Logs", close: true },
];

describe("AvakioTabBar", () => {
  it("renders tabs and selects via click", () => {
    const onChange = vi.fn();
    render(<AvakioTabBar options={options} onChange={onChange} />);

    expect(screen.getByRole("tab", { name: /Home/ })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("tab", { name: /Settings/ }));
    expect(onChange).toHaveBeenCalledWith("settings", expect.objectContaining({ id: "settings" }));
  });

  it("closes a tab and moves selection", () => {
    render(<AvakioTabBar options={options} closable />);

    const logsTab = screen.getByRole("tab", { name: /Logs/ });
    expect(logsTab).toBeInTheDocument();
    const closeBtn = screen.getByLabelText("Close Logs");
    fireEvent.click(closeBtn);

    // state updates async; wait for removal
    expect(screen.queryByRole("tab", { name: /Logs/ })).toBeNull();
    expect(screen.getByRole("tab", { name: /Home/ })).toBeInTheDocument();
  });
});











