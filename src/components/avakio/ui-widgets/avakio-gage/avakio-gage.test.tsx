import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AvakioGage } from "./avakio-gage";

const radius = 88;
const circumference = 2 * Math.PI * radius;

describe("AvakioGage", () => {
  it("renders value, labels, min/max and target marker", () => {
    const { container } = render(
      <AvakioGage label="CPU Load" value={50} min={0} max={100} suffix="%" target={75} />,
    );

    expect(screen.getByLabelText("CPU Load 50%"))?.toBeInTheDocument();
    expect(screen.getByText("CPU Load")).toBeInTheDocument();
    expect(screen.getByText("50%"))?.toBeInTheDocument();

    const minMax = container.querySelector(".avakio-gage-minmax");
    expect(minMax).toBeInTheDocument();
    if (minMax) {
      const scoped = within(minMax);
      expect(scoped.getByText("0")).toBeInTheDocument();
      expect(scoped.getByText("100")).toBeInTheDocument();
    }

    expect(container.querySelector(".avakio-gage-target")).toBeInTheDocument();
  });

  it("computes stroke offset based on percent filled", () => {
    const { container } = render(<AvakioGage value={25} min={0} max={100} />);
    const circle = container.querySelector(".avakio-gage-value");
    expect(circle).toBeInTheDocument();
    const offset = circle?.getAttribute("stroke-dashoffset");
    expect(offset).toBeTruthy();
    const numericOffset = offset ? Number.parseFloat(offset) : NaN;
    const expected = circumference * (1 - 0.25);
    expect(numericOffset).toBeCloseTo(expected, 5);
  });
});












