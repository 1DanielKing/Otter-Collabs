import React, { useState } from 'react';
// import backend content?


const SendPairRequest = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSendPairRequest = async () => {
    // Perform actions when Add Friend is clicked
    try {
      await console.log('Pair request sent'); // add proper logic for backend processes here
      closeModal();
    }catch (error) {
    console.error('Failed to send pair request:', error);
    }
  };

  return (
    <div>
      <button onClick={openModal}>Request to Pair</button>
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>Request to Pair?</h2>
            <p>Do you want to send this artist a request to pair?</p>
            <div className="modal-content">
              <button onClick={handleSendPairRequest}>Send Request</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SendPairRequest;