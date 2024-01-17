package org.wecancodeit.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
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

    @Autowired
    private UserService userService;

    @Autowired
    private NotificationService notificationService; // Added this line

    public PairRequest savePairRequest(PairRequest request) {
        // Find The members of the attempted pairing in the Database
        User sender = userRepository.findByUsername(request.getSender().getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Sender not found"));
        User receiver = userRepository.findByUsername(request.getReceiver().getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Receiver not found"));

        request.setSender(sender);
        request.setReceiver(receiver);
        request.setRequestStatus(RequestStatus.PENDING);

        // Save the pair request
        PairRequest savedRequest = pairRequestRepository.save(request);

        // Send notification to the receiver
        notificationService.sendPairRequestNotification(savedRequest.getReceiver(), savedRequest);

        return savedRequest;
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

    public void respondToPairRequest(@NonNull Long pairRequestId, RequestStatus response) {
        PairRequest pairRequest = pairRequestRepository.findById(pairRequestId)
                .orElseThrow(() -> new IllegalArgumentException("Pair Request not found"));

        pairRequest.setRequestStatus(response);

        // If the request is accepted, add each user to the other's friend list
        if (response == RequestStatus.ACCEPTED) {
            User sender = pairRequest.getSender();
            User receiver = pairRequest.getReceiver();

            if (sender != null && receiver != null) {
                userService.setUserFriends(sender, receiver);
            }
        }

        pairRequestRepository.save(pairRequest);
    }
}
