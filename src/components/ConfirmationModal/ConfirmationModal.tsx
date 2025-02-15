import React from "react";

// Components
import Modal from "../Modal";

// Types
import { ConfirmationModalProps } from "./ConfirmationModal.d";

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ onClose }) => {
  return (
    <Modal onClose={onClose} title="All Done!">
      <div className="flex flex-col items-center text-center sm:gap-6 gap-3">
        <p className="mb-4">
          Your invitation request has been received, and we'll be in touch soon!
        </p>
        <button onClick={onClose} className="button w-full" aria-label="Close confirmation modal">
          OK
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
