import React from "react";
import { render, screen, act } from "@testing-library/react";
import useDarkMode from "./";

const TestComponentNoInitial: React.FC = () => {
  const [darkMode, setDarkMode] = useDarkMode();
  return (
    <div>
      <span data-testid="dark-mode">{darkMode ? "true" : "false"}</span>
      <button onClick={() => setDarkMode(true)}>Set True</button>
    </div>
  );
};

describe("useDarkMode Custom Hook", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("init with not dark when no arg", () => {
    render(<TestComponentNoInitial />);
    expect(screen.getByTestId("dark-mode").textContent).toBe("false");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("can still toggle even with init value", () => {
    render(<TestComponentNoInitial />);
    const button = screen.getByText("Set True");

    act(() => {
      button.click();
    });

    expect(screen.getByTestId("dark-mode").textContent).toBe("true");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
