// SupportButton.jsx
import React from 'react';
import { useModal } from '../contexts/ModalContext';
import SupportFeedbackForm from './SupportFeedbackForm';

const SupportButton = () => {
  const { showModal } = useModal();

  const openSupportModal = () => {
    showModal(<SupportFeedbackForm onClose={() => showModal(null)} />);
  };

  return (
    <button className="support-button" onClick={openSupportModal}>
      Support
    </button>
  );
};

export default SupportButton;
