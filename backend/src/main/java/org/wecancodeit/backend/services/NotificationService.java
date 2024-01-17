package org.wecancodeit.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.wecancodeit.backend.models.Notification;
import org.wecancodeit.backend.repositories.NotificationRepository;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    // service method to get all Notification
    public List<Notification> getAllNotification() {
        return notificationRepository.findByOrderByTimestampDesc();
    }

    public Notification getNotificationById(@NonNull Long id) {
        return notificationRepository.findById(id).orElse(null);
    }

    public List<Notification> getNotificationsByUserId(Long userId) {
        return notificationRepository.findByUserId(userId);
    }

    public Notification saveNotification(@NonNull Notification notification) {
        return notificationRepository.save(notification);
    }

    public void deleteNotification(@NonNull Long id) {
        notificationRepository.deleteById(id);
    }

}
