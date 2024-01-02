package org.wecancodeit.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.wecancodeit.backend.models.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Finds a user by username.
     *
     * @param username
     * @return an Optional possibly containing the found user
     */
    Optional<User> findByUsername(String username);

    /**
     * Finds a user by email.
     *
     * @param email
     * @return an Optional possibly containing the found user
     */
    Optional<User> findByEmail(String email);

    /**
     * finds users by similar User tags
     */ 
    default List<User> findBySimilarTags(String username, List<String> userTags) {
        return findByMusicTagsInAndUsernameNot(userTags, username);
    }

    /*
     * Finds users with similar music tags.
     */
    List<User> findByMusicTagsInAndUsernameNot(List<String> musicTags, String username);
}