import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AvakioScheduler, AvakioEvent } from "./avakio-scheduler";

const events: AvakioEvent[] = [
  {
    id: "1",
    title: "Kickoff",
    start: "2020-10-05T10:00:00.000Z",
    end: "2020-10-05T11:00:00.000Z",
    color: "#1ca1c1",
  },
  {
    id: "2",
    title: "Review",
    start: "2020-10-06T10:00:00.000Z",
    end: "2020-10-06T11:00:00.000Z",
  },
];

describe("AvakioScheduler", () => {
  it("renders month grid and displays events", () => {
    render(<AvakioScheduler events={events} defaultDate="2020-10-05" defaultView="month" />);
    expect(screen.getByText(/October 2020/i)).toBeInTheDocument();
    const titles = screen.getAllByText("Kickoff");
    expect(titles.length).toBeGreaterThan(0);
  });

  it("switches view and calls onEventClick", async () => {
    const onEventClick = vi.fn();
    render(
      <AvakioScheduler
        events={events}
        defaultDate="2020-10-05"
        defaultView="week"
        onEventClick={onEventClick}
      />,
    );

    const dayButton = screen.getByRole("button", { name: /^Day$/i });
    fireEvent.click(dayButton);

    expect(screen.getByText(/October 5, 2020/i)).toBeInTheDocument();

    const evt = screen.getAllByText("Kickoff")[0];
    fireEvent.click(evt);
    await waitFor(() => expect(onEventClick).toHaveBeenCalledTimes(1));
    expect(onEventClick.mock.calls[0][0].id).toBe("1");
  });
});








