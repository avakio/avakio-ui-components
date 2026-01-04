import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AvakioDataTable, AvakioColumn } from "./AvakioDataTable";

type Row = { id: number; name: string; age: number };

const columns: AvakioColumn<Row>[] = [
  { id: "name", header: "Name" },
  { id: "age", header: "Age" },
];

const data: Row[] = [
  { id: 1, name: "Bob", age: 30 },
  { id: 2, name: "Alice", age: 25 },
];

describe("AvakioDataTable", () => {
  it("renders rows and sorts when header clicked", () => {
    const { container } = render(<AvakioDataTable<Row> data={data} columns={columns} />);

    const rows = Array.from(container.querySelectorAll(".avakio-datatable-row"));
    expect(rows).toHaveLength(2);
    expect(rows[0].textContent).toContain("Bob");

    fireEvent.click(screen.getByText("Age"));
    const sortedAsc = Array.from(container.querySelectorAll(".avakio-datatable-row"));
    expect(sortedAsc[0].textContent).toContain("Alice");

    fireEvent.click(screen.getByText("Age"));
    const sortedDesc = Array.from(container.querySelectorAll(".avakio-datatable-row"));
    expect(sortedDesc[0].textContent).toContain("Bob");
  });

  it("filters rows via filter inputs", () => {
    const { container } = render(<AvakioDataTable<Row> data={data} columns={columns} />);

    const filterInputs = container.querySelectorAll<HTMLInputElement>(".avakio-datatable-filter-input");
    expect(filterInputs.length).toBeGreaterThan(0);

    fireEvent.change(filterInputs[0], { target: { value: "Ali" } });

    const filteredRows = Array.from(container.querySelectorAll(".avakio-datatable-row"));
    expect(filteredRows).toHaveLength(1);
    expect(filteredRows[0].textContent).toContain("Alice");
  });
});









