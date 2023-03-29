import React from "react";
import { render } from "@testing-library/react";
import Loader from "../Loader";

describe("Loader", () => {
  it("the component renders empty", () => {
    render(<Loader />);
  });

  it("renders the component with Spinner", () => {
    const { getByAltText } = render(<Loader />);
    expect(getByAltText("spinner")).toHaveAttribute(
      "src",
      "Saarthiloadinggif.gif"
    );
  });

  it("renders the component with Threedots", () => {
    const { getByAltText } = render(<Loader isDot={true} />);
    expect(getByAltText("spinner")).toHaveAttribute("src", "3dots.gif");
  });

  it("renders the component with default props", () => {
    const { getByAltText } = render(<Loader />);
    expect(getByAltText("spinner")).toHaveAttribute(
      "src",
      "Saarthiloadinggif.gif"
    );
    expect(getByAltText("spinner")).toHaveClass("loaderSaarthiGif");
  });
});
