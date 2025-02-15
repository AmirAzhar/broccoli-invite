import { render, screen } from "@testing-library/react";
import Footer from ".";

describe("Footer Component", () => {
  const currentYear = new Date().getFullYear();

  beforeEach(() => {
    render(<Footer />);
  });

  it("render footer ele", () => {
    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toBeInTheDocument();
  });

  it("display the copyright text with correct year", () => {
    const copyrightText = screen.getByText((content) => {
      return content.includes(`© ${currentYear} Broccoli & Co.`);
    });
    expect(copyrightText).toBeInTheDocument();
  });

  it("display all rights reserved text", () => {
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
  });
});
