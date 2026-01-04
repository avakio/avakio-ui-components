import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AvakioPortletBoard, PortletColumn, PortletItem } from "./avakio-portlet";

const columns: PortletColumn[] = [
  { id: "todo", title: "To Do" },
  { id: "done", title: "Done" },
];

const items: PortletItem[] = [
  { id: "a", title: "Task A", content: "Alpha", columnId: "todo" },
  { id: "b", title: "Task B", content: "Beta", columnId: "done" },
];

function mockDataTransfer() {
  const store: Record<string, string> = {};
  return {
    data: store,
    setData: vi.fn((key: string, val: string) => {
      store[key] = val;
    }),
    getData: vi.fn((key: string) => store[key]),
    effectAllowed: "move" as const,
    dropEffect: "move" as const,
  } as unknown as DataTransfer;
}

describe("AvakioPortletBoard", () => {
  it("renders columns and items", () => {
    render(<AvakioPortletBoard columns={columns} items={items} />);

    expect(screen.getByText("To Do")).toBeInTheDocument();
    expect(screen.getByText("Task A")).toBeInTheDocument();
    expect(screen.getByText("Task B")).toBeInTheDocument();
  });

  it("calls onMove when dropped into another column", () => {
    const onMove = vi.fn();
    render(<AvakioPortletBoard columns={columns} items={items} onMove={onMove} />);

    const task = screen.getByTestId("portlet-item-a");
    const dropZone = screen.getByTestId("portlet-column-done");
    const dataTransfer = mockDataTransfer();

    fireEvent.dragStart(task, { dataTransfer });
    fireEvent.dragOver(dropZone, { dataTransfer });
    fireEvent.drop(dropZone, { dataTransfer });

    expect(onMove).toHaveBeenCalledWith("a", "done");
  });
});








