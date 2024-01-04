package org.wecancodeit.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.wecancodeit.backend.models.PairRequest;
import org.wecancodeit.backend.models.PairRequest.RequestStatus;
import org.wecancodeit.backend.models.User;

@Repository
// Queries
public interface PairRequestRepository extends JpaRepository<PairRequest, Long> {

    // Find based on receiver and request status
    List<PairRequest> findByReceiverAndRequestStatus(User receiver, PairRequest.RequestStatus requestStatus);

    // Find By Request status
    List<PairRequest> findByRequestStatus(RequestStatus requestStatus);

    // Find by sender
    List<PairRequest> findBySender_Username(String senderUsername);

    // Find by receiver
    List<PairRequest> findByReceiver_Username(String receiverUsername);

}
