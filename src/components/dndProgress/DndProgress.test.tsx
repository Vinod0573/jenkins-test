import { render } from "@testing-library/react";
import DndProgress from "./DndProgress";
describe("test for DndProgress", () => {
  it("rendering test", () => {
    const { getByText } = render(
      <DndProgress
        detail={"detail"}
        filename={"myfile"}
        clearData={() => {}}
        progress={50}
      />
    );
  });
  it("the detail appears", () => {
    const { getByText } = render(
      <DndProgress
        detail={"detail"}
        filename={"myfile"}
        clearData={() => {}}
        progress={50}
      />
    );
    // eslint-disable-next-line jest/valid-expect
    expect(getByText("detail"));
  });
  it("the filename appears", () => {
    const { getByText } = render(
      <>
        <h1>hello</h1>
        <DndProgress
          detail={"detail"}
          filename={"myfile"}
          clearData={() => {}}
          progress={50}
        />
      </>
    );
    const text = getByText("myfile");
    // eslint-disable-next-line jest/valid-expect
    expect(text);
  });
});
