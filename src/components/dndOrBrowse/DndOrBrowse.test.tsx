import { render } from "@testing-library/react";

import DndOrBrowse from "./DndOrBrowse";
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));
describe("DndOrBrowse", () => {
  it("renders the components", () => {
    const { getByText } = render(
      <DndOrBrowse
        fileName={(n: any) => {
          console.log(n);
        }}
        file={() => {}}
        percentValue={() => {}}
      />
    );
  });
  it("renders the without", () => {
    const { getByText } = render(
      <DndOrBrowse
        fileName={(n: any) => {
          console.log(n);
        }}
        file={() => {}}
        percentValue={() => {}}
      />
    );
    const text = getByText("Supported formats: Zip & Compress File");
    expect(text).toBeInTheDocument();
  });
  it("renders the j", () => {
    const { getByText } = render(
      <DndOrBrowse
        fileName={(n: any) => {
          console.log(n);
        }}
        file={() => {}}
        percentValue={() => {}}
      />
    );
    const text = getByText("Drag & drop files or");
    expect(text).toBeInTheDocument();
  });
});
