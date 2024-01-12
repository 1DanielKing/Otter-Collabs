package org.wecancodeit.backend.services;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.wecancodeit.backend.enums.ExperienceLevelEnum;
import org.wecancodeit.backend.models.User;

@Component
public class Populator implements CommandLineRunner {

        private final UserService userService;

        public Populator(UserService userService) {
                this.userService = userService;
        }

        @Override
        public void run(String... args) throws Exception {
                User user1 = new User("user1", "password1", "user1@example.com", "Guitar", "Rock",
                                ExperienceLevelEnum.INTERMEDIATE, "/media/pictures/default-pfp/Otter1.png");
                user1.addMusicTag("Tag1");
                user1.addMusicTag("Tag2");

                User user2 = new User("user2", "password2", "user2@example.com", "Piano", "Classical",
                                ExperienceLevelEnum.ADVANCED, "/media/pictures/default-pfp/Otter2.png");
                user2.addMusicTag("Tag3");
                user2.addMusicTag("Tag4");

                User user3 = new User("user3", "password3", "user3@example.com", "Drums", "Pop",
                                ExperienceLevelEnum.BEGINNER, "/media/pictures/default-pfp/Otter3.png");
                user3.addMusicTag("Tag5");
                user3.addMusicTag("Tag6");

                userService.createUser(user1);
                userService.createUser(user2);
                userService.createUser(user3);
        }
}
