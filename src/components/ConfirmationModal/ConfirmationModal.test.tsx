import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmationModal from "./";

describe("ConfirmationModal", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  test("renders  title, message, and OK ", () => {
    render(<ConfirmationModal onClose={mockOnClose} />);

    expect(screen.getByText("All Done!")).toBeInTheDocument();

    expect(
      screen.getByText("Your invitation request has been received, and we'll be in touch soon!")
    ).toBeInTheDocument();

    const okButton = screen.getByRole("button", {
      name: /close confirmation modal/i,
    });
    expect(okButton).toBeInTheDocument();
  });

  test("calls onClose when OK is clicked", () => {
    render(<ConfirmationModal onClose={mockOnClose} />);

    const okButton = screen.getByRole("button", {
      name: /close confirmation modal/i,
    });
    fireEvent.click(okButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
