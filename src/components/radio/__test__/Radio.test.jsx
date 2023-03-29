import React from "react";
import Radio from "../Radio";
import {
  fireEvent,
  render
} from "@testing-library/react";
import "@testing-library/jest-dom";

describe("radiobutton  test", () => {
    const defaultProps = {
        text: 'Test',
        defaultValue: false,
        valueSetOut: undefined,
        sendOut: jest.fn(),
        icon: 'haha',
        disabled: false,
      };

  it("the component renders empty", () => {
    render(<Radio />);
  });
  
  it('renders the component with text and icon', () => {
    const { getByText, getByAltText } = render(<Radio {...defaultProps} />);
    expect(getByText('Test')).toBeInTheDocument();
    expect(getByAltText('')).toBeInTheDocument();
  });

  it('renders the component with default value', () => {
    const { getByTestId } = render(<Radio {...defaultProps} />);
    expect(getByTestId('radio-test-id')).toHaveClass('iradio');
  });

  it('handles click event and sends data outside', () => {
    const { getByTestId } = render(<Radio {...defaultProps} />);
    fireEvent.click(getByTestId('radio-test-id'));
    expect(getByTestId('radio-test-id')).toHaveClass('aradio');
    expect(defaultProps.sendOut).toHaveBeenCalledTimes(1);
    expect(defaultProps.sendOut).toHaveBeenCalledWith({ text: 'Test', state: true });
  });

  it('does not handle click event when disabled', () => {
    const { getByTestId } = render(<Radio {...defaultProps} disabled={true} />);
    fireEvent.click(getByTestId('radio-test-id'));
    expect(getByTestId('radio-test-id')).toHaveClass('iradio');
    expect(defaultProps.sendOut).not.toHaveBeenCalled();
  });

});
