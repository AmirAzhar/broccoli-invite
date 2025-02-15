import React, { useState } from "react";

// Components
import Layout from "../../components/Layout";
import InviteFormModal from "../../components/InviteFormModal";
import ConfirmationModal from "../../components/ConfirmationModal/";

// Types
import { InviteFormData } from "../../components/InviteFormModal/InviteFormModal.d";

// Services
import { submitInvite } from "../../services/invite";

const Home: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const resetModalState = () => {
    setServerError(null);
    setIsSuccess(false);
  };

  const handleRequestInvite = () => {
    resetModalState();
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    resetModalState();
    setModalOpen(false);
  };

  const handleInviteSubmit = async (data: InviteFormData) => {
    const result = await submitInvite(data);
    if (result.success) {
      setIsSuccess(true);
    } else {
      setServerError(result.errorMessage);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-full gap-6 px-4">
        <h2 className="text-3xl font-bold text-center md:text-5xl ">
          A better way <br /> to enjoy every day.
        </h2>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 ">
          Be the first to know when we launch.
        </p>
        <button onClick={handleRequestInvite} className="button" aria-label="Open invite form">
          Request an invite
        </button>
      </div>

      {isModalOpen &&
        (isSuccess ? (
          <ConfirmationModal onClose={handleCloseModal} />
        ) : (
          <InviteFormModal
            onClose={handleCloseModal}
            onSubmit={handleInviteSubmit}
            serverError={serverError}
            setServerError={setServerError}
          />
        ))}
    </Layout>
  );
};

export default Home;
