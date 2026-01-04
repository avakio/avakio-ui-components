import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AvakioGoogleMap } from "./avakio-googlemap";

describe("AvakioGoogleMap", () => {
  it("renders an embed fallback when no API key is provided", () => {
    render(
      <AvakioGoogleMap
        center={{ lat: 10, lng: 20 }}
        zoom={8}
        markers={[{ label: "Point A", position: { lat: 10, lng: 20 } }]}
        apiKey={null}
      />,
    );

    const iframe = screen.getByTestId("avakio-googlemap-embed") as HTMLIFrameElement;
    expect(iframe).toBeInTheDocument();
    expect(iframe.src).toContain("10.000000,20.000000");
    expect(iframe.src).toContain("z=8");
  });

  it("renders marker list entries", () => {
    render(
      <AvakioGoogleMap
        center={{ lat: 0, lng: 0 }}
        markers={[
          { label: "Alpha", position: { lat: 1, lng: 2 } },
          { label: "Beta", position: { lat: 3, lng: 4 } },
        ]}
        apiKey={null}
      />,
    );

    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });
});











