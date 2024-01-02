package org.wecancodeit.backend.repositories;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    @Query("SELECT u FROM User u WHERE u.username <> :username AND u.musicTags IN :userTags")
    List<User> findBySimilarTags(@Param("username") String username, @Param("userTags")List<String> userTags);
}
