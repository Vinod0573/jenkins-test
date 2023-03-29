import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Checkbox from "../checkbox";

describe("Checkbox", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  })

  it("renders the component empty", () => {
    render(<Checkbox />)
  })

  it("renders the component with default props", () => {
    const { getByLabelText, getByText } = render(
      <Checkbox text="Checkbox" onChange={mockOnChange} />
    );
    expect(getByText("Checkbox")).toBeInTheDocument();
    const checkbox = getByLabelText("Checkbox");
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(mockOnChange).toHaveBeenCalledWith(true, undefined, undefined);
  });

  it("renders the component with checked prop", () => {
    const { getByLabelText } = render(
      <Checkbox text="Checkbox" checked={true} onChange={mockOnChange} />
    );
    const checkbox = getByLabelText("Checkbox");
    expect(checkbox).toBeChecked();
    fireEvent.click(checkbox);
    expect(mockOnChange).toHaveBeenCalledWith(false, undefined, undefined);
  });

  it("renders the component with extraClass prop", () => {
    const { getByLabelText } = render(
      <Checkbox
        text="Checkbox"
        extraClass="my-checkbox"
        onChange={mockOnChange}
      />
    );
    const checkbox = getByLabelText("Checkbox");
    expect(checkbox.parentElement).toHaveClass("my-checkbox");
  });

  it("renders the component with extraSpan prop", () => {
    const { getByLabelText } = render(
      <Checkbox text="Checkbox" extraSpan="my-span" onChange={mockOnChange} />
    );
    const checkbox = getByLabelText("Checkbox");
    expect(checkbox.nextElementSibling).toHaveClass("custom-checkbox my-span");
  });

  it("calls onChange prop on change event", () => {
    const { getByLabelText } = render(
      <Checkbox text="Checkbox" onChange={mockOnChange} />
    );
    const checkbox = getByLabelText("Checkbox");
    fireEvent.click(checkbox);
    expect(mockOnChange).toHaveBeenCalled();
  });

});
