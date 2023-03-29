import { render, screen } from "@testing-library/react";
import Pagination from "./Pagination";

// import { expect } from "vitest";

describe("test for pagination", () => {
  it("the component renders ", () => {
    render(
      <Pagination
        handlePageChange={(n: number) => {}}
        // getPage={page.current}
        totalNoOfPage={10}
      ></Pagination>
    );
  });
  it("the last page number appears", async () => {
    render(
      <Pagination
        handlePageChange={(n: number) => {}}
        // getPage={page.current}
        totalNoOfPage={10}
      ></Pagination>
    );
  });
  screen.debug();
});
