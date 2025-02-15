import { render, screen, fireEvent } from "@testing-library/react";
import Header from ".";
import useDarkMode from "../../../hooks/useDarkMode";

jest.mock("../../../hooks/useDarkMode", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("react-icons/fi", () => ({
  FiSun: () => <div data-testid="fi-sun" />,
  FiMoon: () => <div data-testid="fi-moon" />,
}));

describe("Header Component", () => {
  const mockSetDarkMode = jest.fn();

  beforeEach(() => {
    (useDarkMode as jest.Mock).mockReset();
    mockSetDarkMode.mockClear();
  });

  it("renders the company title correctly", () => {
    (useDarkMode as jest.Mock).mockReturnValue([false, mockSetDarkMode]);
    render(<Header />);
    expect(screen.getByText("Broccoli & Co.")).toBeInTheDocument();
  });

  it("click sun icon -> toggles to dark mode", () => {
    (useDarkMode as jest.Mock).mockReturnValue([false, mockSetDarkMode]);
    render(<Header />);

    const toggleButton = screen.getByRole("button", { name: /toggle dark mode/i });
    expect(screen.getByTestId("fi-sun")).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(mockSetDarkMode).toHaveBeenCalledWith(true);
  });

  it("click moon icon -> toggles to light mode", () => {
    (useDarkMode as jest.Mock).mockReturnValue([true, mockSetDarkMode]);
    render(<Header />);

    const toggleButton = screen.getByRole("button", { name: /toggle dark mode/i });
    expect(screen.getByTestId("fi-moon")).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(mockSetDarkMode).toHaveBeenCalledWith(false);
  });
});
