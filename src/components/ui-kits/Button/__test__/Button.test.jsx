import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import Button from "../button";

describe("Button", () => {
  it("the component renders empty", () => {
    render(<Button />);
  });

  it("renders the button text correctly", () => {
    const buttonText = "Click me!";
    render(<Button text={buttonText} />);
    expect(screen.getByText(buttonText)).toBeInTheDocument();
  });

  it("calls the onClick function when the button is clicked", () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClickMock).toHaveBeenCalled();
  });

  it("does not call the onClick function when the button is disabled", () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock} disabled={true} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClickMock).not.toHaveBeenCalled();
  });

  it("adds extra classes if provided", () => {
    const extraClass = "custom-class";
    render(<Button extraClass={extraClass} />);
    const button = screen.getByRole("button");
    expect(button.classList).toContain(extraClass);
  });
});
