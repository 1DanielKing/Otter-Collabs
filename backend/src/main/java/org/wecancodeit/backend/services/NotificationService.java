package org.wecancodeit.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.wecancodeit.backend.models.Notification;
import org.wecancodeit.backend.repositories.NotificationRepository;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository NotificationRepository;

    // service method to get all Notification
    public List<Notification> getAllNotification() {
        return NotificationRepository.findByOrderByTimestampDesc();
    }
    
        public Notification getNotificationById(Long id) {
        Optional<Notification> optionalNotification = NotificationRepository.findById(id);
        return optionalNotification.orElse(null);
    }

    // service method to save a notification
    public Notification saveNotification(Notification notification) {
        return NotificationRepository.save(notification);
    }

    public List<Notification> getNotificationsOrderByTimestampDesc() {
        return NotificationRepository.findByOrderByTimestampDesc();
    }

    public void deleteNotification(Long id) {
        NotificationRepository.deleteById(id);
    }

}
