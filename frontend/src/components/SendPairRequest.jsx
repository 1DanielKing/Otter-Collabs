import axios from "axios";
import { useModal } from "../contexts/ModalContext";

const SendPairRequest = ({ senderUser, receiverUser }) => {
  const { hideModal } = useModal();

  const handleSendPairRequest = async () => {
    try {
      const pairRequestData = {
        sender: senderUser,
        receiver: receiverUser,
        message: "Let's collaborate!"
      };

      let response = await axios.post("http://localhost:8080/api/pair-requests/send", pairRequestData);

      if (response.status === 200) {
        console.log("Pair request sent successfully");
      } else {
        console.error("Failed to send pair request: ", response.status);
      }
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
