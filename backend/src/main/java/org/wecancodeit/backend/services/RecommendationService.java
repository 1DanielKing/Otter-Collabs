package org.wecancodeit.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.wecancodeit.backend.models.User;
import org.wecancodeit.backend.repositories.UserRepository;

@Service
public class RecommendationService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getRecommendations(String username) {
        Optional<User> currentUser = userRepository.findByUsername(username);
        if (currentUser.isPresent()) {
            User user = currentUser.get();
            List<String> userTags = user.getMusicTags();
            // This is just returning people with similar tags so beef it up
            return userRepository.findBySimilarTags(username, userTags);
        } else {
            throw new IllegalArgumentException("User not found");
        }
    }
}