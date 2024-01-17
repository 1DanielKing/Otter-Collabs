package org.wecancodeit.backend.models;

import java.time.LocalDateTime;
import org.wecancodeit.backend.models.User;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String message;
    private LocalDateTime timestamp;
    private long pairRequestId; // Add this field

    public Notification() {
        this.timestamp = LocalDateTime.now();
    }

    public Notification(String message) {
        this.message = message;
        this.timestamp = LocalDateTime.now();
    }

    public long getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public long getPairRequestId() {
        return pairRequestId;
    }

    public void setPairRequestId(long pairRequestId) {
        this.pairRequestId = pairRequestId;
    }

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Notification{" +
                "id=" + id +
                ", message='" + message + '\'' +
                ", timestamp=" + timestamp +
                ", pairRequestId=" + pairRequestId + // Include pairRequestId in the toString method
                ", user=" + user +
                '}';
    }
}
