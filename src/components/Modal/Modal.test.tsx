import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./";

describe("Modal Component", () => {
  const title = "Test Modal Title";
  const onClose = jest.fn();

  // test child comp
  const ChildContent = () => <div data-testid="child-content">Modal Child Content</div>;

  beforeEach(() => {
    onClose.mockClear();
  });

  test("renders the modal with title, children and close button", () => {
    render(
      <Modal title={title} showClose onClose={onClose}>
        <ChildContent />
      </Modal>
    );

    expect(screen.getByText(title)).toBeInTheDocument();

    expect(screen.getByTestId("child-content")).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: /close modal/i });
    expect(closeButton).toBeInTheDocument();
  });

  test("shouldnt render close button when showClose is false", () => {
    render(
      <Modal title={title} showClose={false} onClose={onClose}>
        <ChildContent />
      </Modal>
    );

    expect(screen.queryByRole("button", { name: /close modal/i })).not.toBeInTheDocument();
  });

  test("calls onClose when close button clicked", () => {
    render(
      <Modal title={title} showClose onClose={onClose}>
        <ChildContent />
      </Modal>
    );
    const closeButton = screen.getByRole("button", { name: /close modal/i });
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("calls onClose when clicking on  backdrop", () => {
    render(
      <Modal title={title} showClose onClose={onClose}>
        <ChildContent />
      </Modal>
    );

    const backdrop = screen.getByTestId("modal-backdrop");
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("shouldnt call onClose when clicking inside modal content", () => {
    render(
      <Modal title={title} showClose onClose={onClose}>
        <ChildContent />
      </Modal>
    );

    const modalContent = screen.getByText(title).closest("div");

    if (modalContent) fireEvent.click(modalContent);

    expect(onClose).not.toHaveBeenCalled();
  });
});
