import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "./Home";
import { LayoutProps } from "../../components/Layout/Layout.d";
import { InviteFormModalProps } from "../../components/InviteFormModal/InviteFormModal.d";
import { ConfirmationModalProps } from "../../components/ConfirmationModal/ConfirmationModal.d";

jest.mock("../../config/config", () => ({
  config: {
    INVITE_API_URL: "http://localhost:mock",
  },
}));
jest.mock("../../components/Layout", () => ({ children }: LayoutProps) => <div>{children}</div>);
jest.mock(
  "../../components/InviteFormModal",
  () =>
    ({ onClose, onSubmit, serverError }: InviteFormModalProps) =>
      (
        <div>
          <button onClick={onClose}>Close Modal</button>
          <button
            onClick={() =>
              onSubmit({
                fullName: "Amir Azhar",
                email: "amir.azhar@airwallex.com",
                confirmEmail: "amir.azhar@airwallex.com",
              })
            }
          >
            Submit
          </button>
          {serverError && <div>{serverError}</div>}
        </div>
      )
);
jest.mock("../../components/ConfirmationModal", () => ({ onClose }: ConfirmationModalProps) => (
  <div>
    <button onClick={onClose}>Close Confirmation</button>
  </div>
));

describe("Home Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the home page correctly", () => {
    render(<Home />);
    expect(screen.getByText(/A better way/)).toBeInTheDocument();
    expect(screen.getByText(/Be the first to know when we launch\./)).toBeInTheDocument();
    expect(screen.getByText(/Request an invite/)).toBeInTheDocument();
  });

  test("opens the invite form modal when the button is clicked", () => {
    render(<Home />);
    fireEvent.click(screen.getByText("Request an invite"));
    expect(screen.getByText("Close Modal")).toBeInTheDocument();
  });

  test("closes the modal when the close button is clicked", () => {
    render(<Home />);
    fireEvent.click(screen.getByText("Request an invite"));
    fireEvent.click(screen.getByText("Close Modal"));
    expect(screen.queryByText("Close Modal")).not.toBeInTheDocument();
  });

  test("handles successful invite submission", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;

    render(<Home />);
    fireEvent.click(screen.getByText("Request an invite"));
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(screen.getByText("Close Confirmation")).toBeInTheDocument();
    });
  });

  test("handles server error on invite submission", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ errorMessage: "Server error" }),
      })
    ) as jest.Mock;

    render(<Home />);
    fireEvent.click(screen.getByText("Request an invite"));
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(screen.getByText("Server error")).toBeInTheDocument();
    });
  });

  test("handles network error on invite submission", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Network error")));

    render(<Home />);
    fireEvent.click(screen.getByText("Request an invite"));
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(screen.getByText("Network error. Please try again.")).toBeInTheDocument();
    });
  });

  test("handles server error with no errorMessage on invite submission", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;

    render(<Home />);
    fireEvent.click(screen.getByText("Request an invite"));
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(screen.getByText("An error occurred. Please try again.")).toBeInTheDocument();
    });
  });
});
