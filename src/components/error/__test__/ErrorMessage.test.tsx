import ErrorMessage from "../ErrorMessage";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

describe("ErrorMessage", () => {
  it("shows ErrorMessage when errorMessage prop is passed", () => {
    render(<ErrorMessage errorMessage="There is an error message" />);
    const createElement = screen.getByText(/There is an error message/i);
    expect(createElement).toBeInTheDocument();
  });

  it("displays only the passed prop values", () => {
    const { container } = render(
      <ErrorMessage
        errorMessage="There is an error message"
        extraClass="ExtraClass"
      />
    );
    expect(container.getElementsByClassName("ExtraClass").length).toBe(1);
  });

  it("Doesnt display when prop is not passed", () => {
    const { container } = render(
      <ErrorMessage errorMessage="There is an error message" />
    );
    expect(container.getElementsByClassName("ExtraClass").length).not.toBe(1);
  });

  it("renders the error icon correctly", () => {
    render(<ErrorMessage />);
    expect(screen.getByAltText("Error Icon")).toBeInTheDocument();
  });

  it("Displays the passed class name", () => {
    render(
      <ErrorMessage
        errorMessage="There is an error message"
        //extraClass="ExtraClass"
      />
    );
    const createElements = screen
      .getByTestId("extra-class")
      .getAttribute("class");
    expect(createElements).not.toMatch(/ExtraClass/gi);
  });
});
