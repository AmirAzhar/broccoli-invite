import { render, screen } from "@testing-library/react";
import Layout from "./";

describe("Layout Component", () => {
  test("renders children correctly", () => {
    render(
      <Layout>
        <div data-testid="child-content">Test Content</div>
      </Layout>
    );

    const childElement = screen.getByTestId("child-content");
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent("Test Content");
  });

  test("renders the header and footer", () => {
    render(
      <Layout>
        <div>Dummy Content</div>
      </Layout>
    );

    const headerElement = screen.getByRole("banner");
    expect(headerElement).toBeInTheDocument();

    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toBeInTheDocument();
  });
});
