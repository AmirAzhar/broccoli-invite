import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./config/config", () => ({
  config: {
    INVITE_API_URL: "http://localhost:mock",
  },
}));

describe("App Component", () => {
  test("renders Home component", () => {
    render(<App />);
    const headingElement = screen.getByText(/A better way/i);
    expect(headingElement).toBeInTheDocument();
  });
});
