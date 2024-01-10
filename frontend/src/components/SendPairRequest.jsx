import React, { useState, useEffect } from "react";
import axios from "axios";

const SendPairRequest = () => {
  const [showModal, setShowModal] = useState(false);
  const [senderUserData, setSenderUserData] = useState(null);
  const [receiverUserData, setReceiverUserData] = useState(null);

  useEffect(() => {
    // Fetch sender user data from the API
    axios.get('http://localhost:8080/api/users/sender') // Replace with your actual endpoint
      .then(response => setSenderUserData(response.data))
      .catch(error => console.error('Error fetching sender user data:', error));

    // Fetch receiver user data from the API
    axios.get('http://localhost:8080/api/users/receiver') // Replace with your actual endpoint
      .then(response => setReceiverUserData(response.data))
      .catch(error => console.error('Error fetching receiver user data:', error));
  }, []); 

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Perform actions when Add Friend is clicked
  const handleSendPairRequest = async () => {
    try {
      // Ensure both sender and receiver data are available before sending the request
      if (!senderUserData || !receiverUserData) {
        console.error('Sender or receiver data not available');
        return;
      }
      const pairRequestData = {
        senderUsername: senderUserData.username,
        receiverUsername: receiverUserData.username,
        message: "Your message here",
      };
      // Make a POST request to the back-end API
      await axios.post(
        "http://localhost:8080/api/pair-requests/send",
        pairRequestData
      );
      console.log("Pair request sent");
      closeModal();
    } catch (error) {
      console.error("Failed to send pair request:", error);
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
};

export default SendPairRequest;
