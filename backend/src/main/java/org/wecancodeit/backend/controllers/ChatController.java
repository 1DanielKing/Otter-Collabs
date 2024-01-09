package org.wecancodeit.backend.controllers;

import java.util.Date;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.wecancodeit.backend.models.ChatMessage;
import org.wecancodeit.backend.repositories.ChatMessageRepository;

@Controller
public class ChatController {

    private final ChatMessageRepository chatMessageRepository;

    public ChatController(ChatMessageRepository chatMessageRepository) {
        this.chatMessageRepository = chatMessageRepository;
    }

    @MessageMapping("/api/message")
    @SendTo("/topic/messages")
    public ChatMessage sendMessage(ChatMessage chatMessage) {
        chatMessage.setTimestamp(new Date()); // Set the current timestamp
        // Save the message to the database
        return chatMessageRepository.save(chatMessage);
    }
}
