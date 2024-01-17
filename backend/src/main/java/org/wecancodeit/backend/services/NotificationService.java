package org.wecancodeit.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.wecancodeit.backend.models.Notification;
import org.wecancodeit.backend.models.PairRequest;
import org.wecancodeit.backend.repositories.NotificationRepository;
import org.wecancodeit.backend.models.User;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    // service method to get all Notification
    public List<Notification> getAllNotification() {
        return notificationRepository.findByOrderByTimestampDesc();
    }

    public Notification getNotificationById(Long id) {
        Optional<Notification> optionalNotification = notificationRepository.findById(id);
        return optionalNotification.orElse(null);
    }

    // service method to save a notification
    public Notification saveNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    public List<Notification> getNotificationsOrderByTimestampDesc() {
        return notificationRepository.findByOrderByTimestampDesc();
    }

    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }

    public void sendPairRequestNotification(User receiver, PairRequest pairRequest) {
        // Create a notification for the pair request
        Notification notification = new Notification();
        notification.setUser(receiver);
        notification.setMessage("You have a new pair request from " + pairRequest.getSender().getUsername());
        notification.setPairRequestId(pairRequest.getId());

        // Save the notification
        notificationRepository.save(notification);
    }

}
