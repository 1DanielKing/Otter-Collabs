package org.wecancodeit.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.wecancodeit.backend.models.ChatMessage;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    
}

