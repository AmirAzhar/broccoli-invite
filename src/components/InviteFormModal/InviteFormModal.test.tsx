import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import InviteFormModal from "./";

describe("InviteFormModal", () => {
  const mockSetServerError = jest.fn();
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  const defaultProps = {
    onClose: mockOnClose,
    onSubmit: mockOnSubmit,
    serverError: null,
    setServerError: mockSetServerError,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders modal with all input fields and send btn", () => {
    render(<InviteFormModal {...defaultProps} />);

    expect(screen.getByText(/Request an invite/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Full Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm Email")).toBeInTheDocument();

    //
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  test("shows errors when form empty", async () => {
    render(<InviteFormModal {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: /send/i }));

    await waitFor(() => {
      expect(screen.getByText(/Full name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Please confirm your email/i)).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test("shows specific errors for invalid data", async () => {
    render(<InviteFormModal {...defaultProps} />);

    // at least 3 chars
    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "Am" },
    });

    // wrong email format
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "invalid-email" },
    });

    // diff email
    fireEvent.change(screen.getByPlaceholderText("Confirm Email"), {
      target: { value: "amir.azhar@airwallex.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /send/i }));

    await waitFor(() => {
      expect(screen.getByText(/Full name must be at least 3 characters long/i)).toBeInTheDocument();
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Emails must match/i)).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test("show sending state when submit", async () => {
    mockOnSubmit.mockResolvedValueOnce(undefined);
    render(<InviteFormModal {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "Amir Azhar" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "amir.azhar@airwallex.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Email"), {
      target: { value: "amir.azhar@airwallex.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /send/i }));

    expect(screen.getByRole("button", { name: /sending... please wait/i })).toBeInTheDocument();

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        fullName: "Amir Azhar",
        email: "amir.azhar@airwallex.com",
        confirmEmail: "amir.azhar@airwallex.com",
      });
    });
  });

  test("show server error message when provided", () => {
    render(
      <InviteFormModal
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        serverError="Server error occurred"
        setServerError={mockSetServerError}
      />
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Server error occurred");
  });
});
