package org.wecancodeit.backend.services;

import org.wecancodeit.backend.enums.ExperienceLevelEnum;
import org.wecancodeit.backend.models.User;

public class Populator {
      public static void main(String[] args) {
        
        // Create a few test users
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

        // Print the populated users for testing
        System.out.println(user1);
        System.out.println(user2);
        System.out.println(user3);
    }
}
