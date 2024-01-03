package org.wecancodeit.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
        User sender = userRepository.findByUsername(senderUsername).orElseThrow(() -> new IllegalArgumentException("Receiver not found")); 
  

    }
    
}
