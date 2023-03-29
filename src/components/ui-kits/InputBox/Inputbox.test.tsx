import { render, screen } from "@testing-library/react";
import Inputbox from "./inputbox";
import { ChangeEvent } from "react";
// import { expect } from "vitest";
describe("testcases for inputbox", () => {
  it("the inputbox component renders witout any issues", () => {
    render(
      <Inputbox
        value={""}
        onChange={function (event: ChangeEvent<HTMLInputElement>): void {
          console.log(event);
        }}
        onChangeValue={undefined}
      ></Inputbox>
    );
  });
  it("test for placeholder", () => {
    const { container } = render(
      <Inputbox
        value={"initial value"}
        onChange={function (event: ChangeEvent<HTMLInputElement>): void {}}
        onChangeValue={undefined}
        placeholder="test-placeholder"
      ></Inputbox>
    );
    const value = container.querySelector("input");
    console.log(value);
    expect(value?.value).toBe("initial value");
  });
});
