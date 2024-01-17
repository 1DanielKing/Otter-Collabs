import axios from "axios";
import { useNotifications } from "../contexts/NotificationsContext.js";
import { useModal } from "../contexts/ModalContext";

const SendPairRequest = ({ senderUser, receiverUser }) => {
  const { hideModal } = useModal();
  const { addNotification } = useNotifications();

  const handleSendPairRequest = async () => {
    try {
      const pairRequestData = {
        sender: senderUser,
        receiver: receiverUser,
        message: "Let's collaborate!"
      };
      // Make a POST request to the back-end API
      await axios.post(
        "http://localhost:8080/api/pair-requests/send",
        pairRequestData
      );
      console.log("Pair request sent");
      addNotification({ message: "New pair request sent!" });
      hideModal();
    } catch (error) {
      console.error("Error in sending pair request: ", error);
    }
  }

  return (
    <div>
      <div className="modal-backdrop">
        <div className="modal-content">
          <h2>Request to Pair?</h2>
          <p>Do you want to send this artist a request to pair?</p>
          <div className="modal-content">
            <button onClick={handleSendPairRequest}>Send Request</button>
            <button onClick={hideModal}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default SendPairRequest;
