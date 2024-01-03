package org.wecancodeit.backend.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.wecancodeit.backend.models.PairRequest;
import org.wecancodeit.backend.models.PairRequest.RequestStatus;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/pair-requests")
public class PairRequestController {

    @Autowired
    private PairRequestService pairRequestService;

    // Sending a pair request 
    @PostMapping("/send")
    public ResponseEntity<Void> sendPairRequest(@RequestParam String senderUsername,
            @RequestParam String receiverUsername, @RequestParam String message) {
        pairRequestService.sendPairRequest(senderUsername, receiverUsername, message);
        return ResponseEntity.ok().build();
    }

    // Fetch Pending requests for the user
    @GetMapping("/pending/{username}")
    public ResponseEntity<List<PairRequest>> getPendingPairRequests(@PathVariable String username) {
        List<PairRequest> pendingPairRequests = pairRequestService.getPendingPairRequests(username);
        return ResponseEntity.ok(pendingPairRequests);
    }
    
    //Handle Response to a request
    @PostMapping("/respond")
    public ResponseEntity<Void> respondToPairRequest(RequestParam Long pairRequestId, @RequestParam RequestStatus response){
        pairRequestService.respondToPairRequest(pairRequestId, response);
        return ResponseEntity.ok().build();
    }
}
