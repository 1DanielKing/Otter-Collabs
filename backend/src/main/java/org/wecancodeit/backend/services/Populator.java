package org.wecancodeit.backend.services;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.wecancodeit.backend.enums.ExperienceLevelEnum;
import org.wecancodeit.backend.models.User;
import org.wecancodeit.backend.repositories.UserRepository;

@Component
public class Populator implements CommandLineRunner {

        private final UserRepository userRepository;

        public Populator(UserRepository userRepository) {
                this.userRepository = userRepository;
        }

        @Override
        public void run(String... args) throws Exception {
                User user1 = new User("user1", "password1", "user1@example.com", "Guitar", "Rock",
                                ExperienceLevelEnum.INTERMEDIATE, "image1.jpg");
                user1.addMusicTag("Tag1");
                user1.addMusicTag("Tag2");

                User user2 = new User("user2", "password2", "user2@example.com", "Piano", "Classical",
                                ExperienceLevelEnum.ADVANCED, "image2.jpg");
                user2.addMusicTag("Tag3");
                user2.addMusicTag("Tag4");

                User user3 = new User("user3", "password3", "user3@example.com", "Drums", "Pop",
                                ExperienceLevelEnum.BEGINNER, "image3.jpg");
                user3.addMusicTag("Tag5");
                user3.addMusicTag("Tag6");

                userRepository.save(user1);
                userRepository.save(user2);
                userRepository.save(user3);
        }
}
