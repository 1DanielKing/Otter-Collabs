package org.wecancodeit.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.wecancodeit.backend.models.PairRequest;
import org.wecancodeit.backend.models.PairRequest.RequestStatus;
import org.wecancodeit.backend.models.User;
import org.wecancodeit.backend.repositories.PairRequestRepository;
import org.wecancodeit.backend.repositories.UserRepository;

@Service
public class PairRequestService {

    @Autowired
    private PairRequestRepository pairRequestRepository;

    @Autowired
    private UserRepository userRepository;

    public PairRequest sendPairRequest(String senderUsername, String receiverUsername, String message) {
        // Find The members of the attempted pairing in the Database
        User sender = userRepository.findByUsername(senderUsername)
                .orElseThrow(() -> new IllegalArgumentException("Sender not found"));
        User receiver = userRepository.findByUsername(receiverUsername)
                .orElseThrow(() -> new IllegalArgumentException("Receiver not found"));

        // New pair request instance
        PairRequest pairRequest = new PairRequest();
        pairRequest.setSender(sender);
        pairRequest.setReceiver(receiver);
        pairRequest.setMessage(message);

        // Defaults to pending
        pairRequest.setRequestStatus(RequestStatus.PENDING);

        // Save the new PairRequest instance to the database
        return pairRequestRepository.save(pairRequest);
    }

    // Service method to handle different states of a pair request
    public List<PairRequest> getPairRequestsByStatus(RequestStatus status) {
        // Implementation to retrieve pair requests by their status from the database
        return pairRequestRepository.findByRequestStatus(status);
    }

    public List<PairRequest> getPendingPairRequests(String username) {
        // Retrieve a user from the database using the provided username
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Pending pair requests for the user from the database
        return pairRequestRepository.findByReceiverAndRequestStatus(user, RequestStatus.PENDING);
    }

    public void respondToPairRequest(Long pairRequestId, RequestStatus response) {
        PairRequest pairRequest = pairRequestRepository.findById(pairRequestId)
                .orElseThrow(() -> new IllegalArgumentException("Pair Request not found"));

        pairRequest.setRequestStatus(response);

        // If the request is accepted, add each user to the other's friend list
        if (response == RequestStatus.ACCEPTED) {
            User sender = pairRequest.getSender();
            User receiver = pairRequest.getReceiver();

            sender.addFriend(receiver);
            receiver.addFriend(sender);

            userRepository.save(sender);
            userRepository.save(receiver);
        }

        pairRequestRepository.save(pairRequest);
    }

}
