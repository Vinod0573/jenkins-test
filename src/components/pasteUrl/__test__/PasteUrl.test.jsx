import React from "react";
import PasteUrl from "../PasteUrl";
import {
  fireEvent,
  screen,
  render,
} from "@testing-library/react";
import "@testing-library/jest-dom";

describe("PasteUrl", () => {
  
  it("renders PasteUrl component", () => {
    render(<PasteUrl />);
  });

  it('component displays the correct text', () => {
    render(<PasteUrl />);
    expect(screen.getByText('Paste URI')).toBeInTheDocument();
  });

  it("handleChange function is called when input value changes", () => {
    const handleChange = jest.fn();
    render(<PasteUrl uploadedURL={handleChange} />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "http://example.com" },
    });
    expect(handleChange).toHaveBeenCalled();
  });

  it("input value is updated when agentDetails.url changes", () => {
    const agentDetails = { url: "http://example.com" };
    render(<PasteUrl agentDetails={agentDetails} />);
    expect(screen.getByRole("textbox")).toHaveValue(agentDetails.url);
  });

  it("uploadedURL function is called with the correct arguments when input value changes", () => {
    const uploadedURL = jest.fn();
    render(<PasteUrl uploadedURL={uploadedURL} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'http://example.com' } });
    expect(uploadedURL).toHaveBeenCalledWith('http://example.com', 'url');
  });
  
  
});
