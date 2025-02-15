import React from "react";

// Lib
import { IoClose } from "react-icons/io5";

// Types
import { ModalProps } from "./Modal.d";

const Modal: React.FC<ModalProps> = ({ title, children, showClose, onClose }) => {
  // Ensure that modal only closes when backdrop is clicked, and not the modal itelf
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      data-testid="modal-backdrop"
      className="fixed inset-0 flex items-center justify-center bg-[rgb(0,0,0)]/50 dark:bg-[rgb(255,255,255)]/50 z-30"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-md p-6 mx-3 transition-all bg-gray-100 rounded shadow-lg dark:bg-gray-800 sm:p-12">
        {showClose && (
          <button
            className="absolute cursor-pointer top-4 right-4"
            onClick={onClose}
            aria-label="Close modal"
          >
            <IoClose className="text-gray-400 transition-all dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100" />
          </button>
        )}
        <div className="flex flex-col items-center gap-1 mb-6 sm:mb-10">
          <h3 className="text-xl font-bold text-center sm:text-2xl">{title}</h3>
          <div className="h-1 bg-gray-300 dark:bg-gray-500 w-1/15" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
