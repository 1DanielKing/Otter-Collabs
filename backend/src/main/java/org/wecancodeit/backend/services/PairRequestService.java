package org.wecancodeit.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.wecancodeit.backend.models.PairRequest;
import org.wecancodeit.backend.models.PairRequest.RequestStatus;
import org.wecancodeit.backend.models.User;
import org.wecancodeit.backend.repositories.UserRepository;

@Service
public class PairRequestService {

    @Autowired
    private PairRequestRepository pairRequestRepository;

    @Autowired
    private UserRepository userRepository;

    public void sendPairRequest(String senderUsername, String receiverUsername, String message){
        //Find The members of the attempted pairing in the Database
        User sender = userRepository.findByUsername(senderUsername).orElseThrow(() -> new IllegalArgumentException("Sender not found")); 
        User receiver = userRepository.findByUsername(receiverUsername).orElseThrow(() -> new IllegalArgumentException("Receiver not found")); 
        
        //New pair request instance
        PairRequest pairRequest = new PairRequest();
        pairRequest.setSender(sender);
        pairRequest.setReceiver(receiver);
        pairRequest.setMessage(message);

         // Defaults to pending
        pairRequest.setRequestStatus(RequestStatus.PENDING);

        // Save the new PairRequest instance to the database
        pairRequestRepository.save(pairRequest);
    }

    }
    

